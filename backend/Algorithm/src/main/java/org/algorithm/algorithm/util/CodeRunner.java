package org.algorithm.algorithm.util;

import org.algorithm.algorithm.dto.CodeDTO;

import java.io.*;

public class CodeRunner {
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

    public void runCpp(CodeDTO codeDTO){
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
                return;
            }

            // 생성된 실행 파일 실행하여 결과값 확인
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

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void runPython(CodeDTO codeDTO){
        // Java에서 python 코드 실행
        String pythonCode ="import psutil\n" +
                "pid = os.getpid()\n" +
                "process = psutil.Process(pid)\n" +
                "memory_usage = process.memory_info().rss\n" +
                "print(\"Memory usage:\", memory_usage)";
        try {
            // 파이썬 코드를 실행하여 파이썬 프로세스 생성
            ProcessBuilder pb = new ProcessBuilder("python");
            Process process = pb.start();

            // 파이썬 스크립트 입력 스트림에 파이썬 코드 쓰기
            process.getOutputStream().write(pythonCode.getBytes());
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
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

}
