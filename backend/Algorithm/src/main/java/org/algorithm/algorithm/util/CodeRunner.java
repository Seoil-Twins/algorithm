package org.algorithm.algorithm.util;

import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.entity.TestcaseEntity;
import org.algorithm.algorithm.exception.GlobalException;
import org.algorithm.algorithm.repository.TestcaseRepository;

import java.io.*;

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

        System.out.println(codeDTO.getAlgorithmId());
        TestcaseEntity testcaseEntity = testcaseRepository.findByAlgorithmId(codeDTO.getAlgorithmId());
        String[] inputs = testcaseEntity.getInput().split(",");
        String expectedOutput = testcaseEntity.getOutput();

// Java에서 C++ 코드 실행
        try {
            // 외부 프로세스로 코드를 컴파일하고 실행
            Process compileProcess = Runtime.getRuntime().exec("g++ -o program -x c++ -");
            compileProcess.getOutputStream().write(codeDTO.getCode().getBytes());
            compileProcess.getOutputStream().close();

            // 컴파일 결과 확인
            int compileResult = compileProcess.waitFor();
            if (compileResult != 0) {
                System.out.println("컴파일 에러가 발생했습니다.");
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
            StringBuilder actualResult = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                actualResult.append(line).append("\n");
            }

            // 결과 출력
            System.out.println("결과값:");
            System.out.println(actualResult.toString());

            // 에러 출력
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(executeProcess.getErrorStream()));
            System.out.println("에러:");
            while ((line = errorReader.readLine()) != null) {
                System.out.println(line);
            }

            // 결과값 비교
            if (expectedOutput.trim().equals(actualResult.toString().trim())) {
                System.out.println("결과값이 일치합니다.");
                return true;
            } else {
                System.out.println("결과값이 일치하지 않습니다.");
                return false;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void runPython(CodeDTO codeDTO){
        // Java에서 python 코드 실행
        try {
            // 파이썬 코드를 실행하여 파이썬 프로세스 생성
            ProcessBuilder pb = new ProcessBuilder("python");
            Process process = pb.start();

            // 파이썬 스크립트 입력 스트림에 파이썬 코드 쓰기
            process.getOutputStream().write(codeDTO.getCode().getBytes());
            process.getOutputStream().close();

            // 파이썬 프로세스의 출력을 읽음
            InputStream is = process.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }

            // 프로세스가 종료될 때까지 대기
            int exitCode = process.waitFor();
            System.out.println("Python 프로세스 종료 코드: " + exitCode);
        } catch (Exception e) {
            throw new GlobalException("error");
        }
    }

    public void runJava(CodeDTO codeDTO){
        try {

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

            // 실행 결과 출력
            BufferedReader reader = new BufferedReader(new InputStreamReader(processRun.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            // 임시 파일 삭제
            sourceFile.delete();
            new File("HelloWorld.class").delete();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
