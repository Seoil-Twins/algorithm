package org.algorithm.algorithm.util;

import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.entity.TestcaseEntity;
import org.algorithm.algorithm.exception.GlobalException;
import org.algorithm.algorithm.repository.TestcaseRepository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CodeRunner {

    public final TestcaseRepository testcaseRepository;

    public CodeRunner(TestcaseRepository testcaseRepository) {
        this.testcaseRepository = testcaseRepository;
    }

    public void runC(CodeDTO codeDTO){
        try {
            // 코드를 컴파일하여 실행파일을 생성
            Process compileProcess = Runtime.getRuntime().exec("gcc -o program -x c -");
            compileProcess.getOutputStream().write(codeDTO.getCode().getBytes());
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

    public Boolean runCpp(CodeDTO codeDTO){

        TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(codeDTO.getAlgorithmId());

// Java에서 C++ 코드 실행
        try {
            for(TestcaseEntity testcaseEntity : testcaseEntities) {
                String[] inputs = testcaseEntity.getInput().split(" ");
                String[] expectedOutput = testcaseEntity.getOutput().split(" ");

                // 외부 프로세스로 코드를 컴파일하고 실행
                Process compileProcess = Runtime.getRuntime().exec("g++ -o program -x c++ -");
                compileProcess.getOutputStream().write(codeDTO.getCode().getBytes());
                compileProcess.getOutputStream().close();

                // 컴파일 결과 확인
                int compileResult = compileProcess.waitFor();
                if (compileResult != 0) {
                    System.out.println("CPP 컴파일 에러가 발생했습니다.");
                    return null;
                }

                // 생성된 실행 파일 실행하여 결과값 확인
                Process executeProcess = Runtime.getRuntime().exec("./program");

                // 입력값 제공
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(executeProcess.getOutputStream()));
                for (String input : inputs) {
                    writer.write(input.trim() + "\n");
                }
                writer.close();

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
                    System.out.println("결과값이 일치합니다.");
                } else {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치하지 않습니다.");
                    return false;
                }
            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Boolean runPython(CodeDTO codeDTO){
        TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(codeDTO.getAlgorithmId());
        // Java에서 python 코드 실행
        try {
            for(TestcaseEntity testcaseEntity : testcaseEntities) {
                String[] inputs = testcaseEntity.getInput().split(" ");
                String[] expectedOutput = testcaseEntity.getOutput().split(" ");

                List<String> command = new ArrayList<>();
                command.add("python");
                command.add("-c");
                command.add(codeDTO.getCode());
                command.addAll(List.of(inputs));  // 모든 추가 인자들을 명령 목록에 추가

                ProcessBuilder pb = new ProcessBuilder(command);
                Process process = pb.start();

                // 파이썬 프로세스의 출력을 읽음
                InputStream is = process.getInputStream();
                InputStreamReader isr = new InputStreamReader(is);
                BufferedReader br = new BufferedReader(isr);
                String line;
                List<String> results = new ArrayList<>();
                System.out.println("결과값:");
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                    results.add(line);
                }

                // 결과값 비교
                if (results.equals(Arrays.asList(expectedOutput))) {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치합니다.");
                } else {
                    System.out.println(Arrays.toString(inputs));
                    System.out.println(results);
                    System.out.println(Arrays.asList(expectedOutput));
                    System.out.println("결과값이 일치하지 않습니다.");
                    return false;
                }


                // 프로세스가 종료될 때까지 대기
                int exitCode = process.waitFor();
                System.out.println("Python 프로세스 종료 코드: " + exitCode);
            }
            return true;
        } catch (Exception e) {
            throw new GlobalException("error");
        }
    }

    public Boolean runJava(CodeDTO codeDTO){
        TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(codeDTO.getAlgorithmId());
        ExecutorService executorService = Executors.newCachedThreadPool();
        // Java에서 python 코드 실행
        try {
            for(TestcaseEntity testcaseEntity : testcaseEntities) {
                String[] inputs = testcaseEntity.getInput().split(" ");
                String[] expectedOutput = testcaseEntity.getOutput().split(" ");

                // 소스 파일 작성
                File sourceFile = new File("Main.java");
                FileWriter writer = new FileWriter(sourceFile);
                writer.write(codeDTO.getCode());
                writer.close();

                // javac로 컴파일
                ProcessBuilder pbCompile = new ProcessBuilder("javac", "Main.java");
                Process processCompile = pbCompile.start();
                processCompile.waitFor();

                // java로 실행
                ProcessBuilder pbRun = new ProcessBuilder("java", "Main");
                pbRun.redirectErrorStream(true); // 표준 에러를 표준 출력으로 리디렉션
                Process processRun = pbRun.start();


                // 입력값 제공
                BufferedWriter inputWriter = new BufferedWriter(new OutputStreamWriter(processRun.getOutputStream()));
                for (String input : inputs) {
                    inputWriter.write(input.trim() + "\n");
                }
                inputWriter.close(); // [ 3  5 ]   ->   [ 8 ]

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
                    return false;
                }
            }
            return true;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
