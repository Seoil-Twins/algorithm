package com.college.algorithm.util;

import com.college.algorithm.dto.RequestCodeDto;
import com.college.algorithm.dto.ResponseCodeDto;
import com.college.algorithm.dto.ResponsePostCodeDto;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.college.algorithm.entity.AlgorithmTestcase;
import com.college.algorithm.repository.AlgorithmTestcaseRepository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CodeRunner {

    public final AlgorithmTestcaseRepository testcaseRepository;

    public CodeRunner(AlgorithmTestcaseRepository testcaseRepository) {
        this.testcaseRepository = testcaseRepository;
    }

    public void runC(RequestCodeDto requestCodeDto, Long algorithmId){
        try {
            // 코드를 컴파일하여 실행파일을 생성
            Process compileProcess = Runtime.getRuntime().exec("gcc -o program -x c -");
            compileProcess.getOutputStream().write(requestCodeDto.getCode().getBytes());
            compileProcess.getOutputStream().close();

            // 컴파일 결과 확인
            int compileResult = compileProcess.waitFor();
            if (compileResult != 0) {
                System.out.println("컴파일 에러가 발생했습니다.");
                return;
            }

            // 생성된 실행파일 실행하여 결과값 확인
            Process executeProcess = Runtime.getRuntime().exec("./program");
            BufferedReader reader = new BufferedReader(new InputStreamReader(executeProcess.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }

            // 결과 출력
            System.out.println("결과값:");
            System.out.println(result.toString());

            // 에러 출력
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(executeProcess.getErrorStream()));
            System.out.println("에러:");
            while ((line = errorReader.readLine()) != null) {
                System.out.println(line);
            }

            // 메모리 사용량 추정 (Windows에서만 동작)
            Process memoryProcess = Runtime.getRuntime().exec("tasklist /FI \"IMAGENAME eq program.exe\" /FO CSV /NH");
            InputStream memoryStream = memoryProcess.getInputStream();
            BufferedReader memoryReader = new BufferedReader(new InputStreamReader(memoryStream));
            while ((line = memoryReader.readLine()) != null) {
                String[] tokens = line.split(",");
                if (tokens.length > 4) {
                    System.out.println("메모리 사용량: " + tokens[4] + " KB");
                }
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public ResponseCodeDto runCpp(RequestCodeDto requestCodeDto, Long algorithmId) throws IOException, InterruptedException {

        List<AlgorithmTestcase> testcaseEntities = testcaseRepository.findAlgorithmTestcasesByAlgorithm_AlgorithmId(algorithmId);

// Java에서 C++ 코드 실행
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode testCaseResults = objectMapper.createObjectNode();
            int i = 0;
            Boolean flag = false;
            double excuteTime = 0.0;
            for(AlgorithmTestcase testcase : testcaseEntities) {
                i++;
                String[] inputs = testcase.getInput().split(",");
                String[] expectedOutput = testcase.getOutput().split(",");

                // 외부 프로세스로 코드를 컴파일하고 실행

                Process compileProcess = Runtime.getRuntime().exec("g++ -o program -x c++ -");
                if(!compileProcess.isAlive()){
                    throw new CustomException(ErrorCode.SQL_EXCEPTION); // 따로 코드 실행 에러를 만들어야합니다. 임시 SQL 에러입니다.
                }
                compileProcess.getOutputStream().write(requestCodeDto.getCode().getBytes());
                compileProcess.getOutputStream().close();

                // 컴파일 결과 확인
                int compileResult = compileProcess.waitFor();
                if (compileResult != 0) {
                    throw new CustomException(ErrorCode.SQL_EXCEPTION); // 따로 코드 실행 에러를 만들어야합니다. 임시 SQL 에러입니다.
                }

                // 생성된 실행 파일 실행하여 결과값 확인
                double startTime = System.currentTimeMillis();
                Process executeProcess = Runtime.getRuntime().exec("./program");

                // 입력값 제공
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(executeProcess.getOutputStream()));
                for (String input : inputs) {
                    writer.write(input.trim() + "\n");
                }
                writer.close();
                double endTime = System.currentTimeMillis();

                excuteTime = ( endTime - startTime )/ 1000.0;

                // 결과값 수집
                BufferedReader reader = new BufferedReader(new InputStreamReader(executeProcess.getInputStream()));
                String line;
                List<String> results = new ArrayList<>();
                while ((line = reader.readLine()) != null) {
                    results.add(line);
                }

                // 결과 출력
                System.out.println("결과값:");
                System.out.println(results);

                // 에러 출력
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(executeProcess.getErrorStream()));
                System.out.println("에러:");
                while ((line = errorReader.readLine()) != null) {
                    System.out.println(line);
                }

                // 결과값 비교
                if (results.equals(Arrays.asList(expectedOutput))) {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("CPP 결과값이 일치합니다.");
                    testCaseResults.put(i+"회차","성공");
                } else {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("CPP 결과값이 일치하지 않습니다.");
                    flag = true;
                    testCaseResults.put(i+"회차","실패");
                }
            }
            if(flag)
                return new ResponseCodeDto(false, excuteTime, testCaseResults);
            else
                return new ResponseCodeDto(true, excuteTime, testCaseResults);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public ResponseCodeDto runPython(RequestCodeDto requestCodeDto, Long algorithmId){
        List<AlgorithmTestcase> testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmAlgorithmId(algorithmId);
        // Java에서 python 코드 실행
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode testCaseResults = objectMapper.createObjectNode();
            int i = 0;
            Boolean flag = false;
            double excuteTime = 0.0;
            for(AlgorithmTestcase testcase : testcaseEntities) {
                System.out.println("flag 1 ");
                i++;
                String[] inputs = testcase.getInput().split(",");
                String[] expectedOutput = testcase.getOutput().split(",");

                List<String> command = new ArrayList<>();
                command.add("python3");
                command.add("-c");
                command.add(requestCodeDto.getCode());
                command.addAll(List.of(inputs));  // 모든 추가 인자들을 명령 목록에 추가

                System.out.println("flag 2 ");
                ProcessBuilder pb = new ProcessBuilder(command);

                double startTime = System.currentTimeMillis();
                System.out.println("flag 2.1 ");
                Process process = pb.start();
                System.out.println("flag 2.2 ");
                double endTime = System.currentTimeMillis();

                excuteTime = ( endTime - startTime ) / 1000.0;
                // 파이썬 프로세스의 출력을 읽음
                System.out.println("flag 2.5 ");
                InputStream is = process.getInputStream();
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader br = new BufferedReader(isr);
                System.out.println("flag 3 ");
                String line;
                List<String> results = new ArrayList<>();
                System.out.println("결과값:");
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                    results.add(line);
                }

                if(results.size() <= 0){
                    throw new CustomException(ErrorCode.SQL_EXCEPTION); // 따로 코드 실행 에러를 만들어야합니다. 임시 SQL 에러입니다.
                }

                // 결과값 비교
                if (results.equals(Arrays.asList(expectedOutput))) {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치합니다.");
                    testCaseResults.put(i+"회차","성공");
                } else {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치하지 않습니다.");
                    flag = true;
                    testCaseResults.put(i+"회차","실패");
                }
                // 프로세스가 종료될 때까지 대기
                int exitCode = process.waitFor();
                System.out.println("Python 프로세스 종료 코드: " + exitCode);
            }
            if(flag)
                return new ResponseCodeDto(false, excuteTime, testCaseResults);
            else
                return new ResponseCodeDto(true, excuteTime, testCaseResults);
        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(ErrorCode.SQL_EXCEPTION); // 따로 코드 실행 에러를 만들어야합니다. 임시 SQL 에러입니다.
        }
    }

    public ResponseCodeDto runJava(RequestCodeDto requestCodeDto, Long algorithmId){
        List<AlgorithmTestcase> testcaseEntities = testcaseRepository.findAlgorithmTestcasesByAlgorithm_AlgorithmId(algorithmId);
        ExecutorService executorService = Executors.newCachedThreadPool();
        // Java에서 python 코드 실행
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode testCaseResults = objectMapper.createObjectNode();
            int i = 0;
            Boolean flag = false;
            double excuteTime = 0.0;
            for(AlgorithmTestcase testcase : testcaseEntities) {
                i++;
                String[] inputs = testcase.getInput().split(",");
                String[] expectedOutput = testcase.getOutput().split(",");

                // 소스 파일 작성
                File sourceFile = new File("Main.java");
                FileWriter writer = new FileWriter(sourceFile);
                writer.write(requestCodeDto.getCode());
                writer.close();

                // javac로 컴파일
                ProcessBuilder pbCompile = new ProcessBuilder("javac", "Main.java");
                Process processCompile = pbCompile.start();
                processCompile.waitFor();
                if (processCompile.waitFor() != 0) {
                    throw new CustomException(ErrorCode.SQL_EXCEPTION); // 따로 코드 실행 에러를 만들어야합니다. 임시 SQL 에러입니다.
                }

                // java로 실행
                ProcessBuilder pbRun = new ProcessBuilder("java", "Main");
                pbRun.redirectErrorStream(true); // 표준 에러를 표준 출력으로 리디렉션

                double startTime = System.currentTimeMillis();
                Process processRun = pbRun.start();


                // 입력값 제공
                BufferedWriter inputWriter = new BufferedWriter(new OutputStreamWriter(processRun.getOutputStream()));
                for (String input : inputs) {
                    inputWriter.write(input.trim() + "\n");
                }
                inputWriter.close(); // [ 3  5 ]   ->   [ 8 ]
                double endTime = System.currentTimeMillis();

                excuteTime = ( endTime - startTime )/ 1000.0;

                // 실행 결과 출력
                BufferedReader reader = new BufferedReader(new InputStreamReader(processRun.getInputStream()));
                String line;
                List<String> results = new ArrayList<>();
                while ((line = reader.readLine()) != null) {
                    results.add(line);
                }

                // 임시 파일 삭제
                sourceFile.delete();
                new File("Main.class").delete();


                // 결과값 비교
                if (results.equals(Arrays.asList(expectedOutput))) {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치합니다.");
                    testCaseResults.put(i+"회차","성공");

                    SseEmitter emitter = new SseEmitter();

                    executorService.execute(() -> {
                        try {
                            // 예시 데이터 전송
                            emitter.send("Hello, SSE!");
                            emitter.complete();
                        } catch (IOException e) {
                            emitter.completeWithError(e);
                        }
                    });
                } else {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치하지 않습니다.");
                    flag = true;
                    testCaseResults.put(i+"회차","실패");
                }
            }
            if(flag)
                return new ResponseCodeDto(false, excuteTime, testCaseResults);
            else
                return new ResponseCodeDto(true, excuteTime, testCaseResults);

        } catch (Exception e) {
            throw new CustomException(ErrorCode.SQL_EXCEPTION); // 따로 코드 실행 에러를 만들어야합니다. 임시 SQL 에러입니다.
        }
    }

}
