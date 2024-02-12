package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.algorithm.algorithm.exception.GlobalException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class GlotService {
    private final String apiKey = "a33c251f-416d-4a00-b18f-16c90e6581ea";
    private final RestTemplate restTemplate = new RestTemplate();

    private String runCode(String language, String code) {
        try {
            System.out.println("11111111111111111");
            String apiUrl = "https://glot.io/api/run/" + language + "/latest";
            System.out.println("22222222222222222");
            HttpHeaders headers = new HttpHeaders();
            System.out.println("33333333333333333");
            headers.setContentType(MediaType.APPLICATION_JSON);
            System.out.println("4444444444444");
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            System.out.println("5555555555555555");
            headers.set("Authorization", "Token " + apiKey);
            System.out.println("6666666666666666");
            System.out.println(code);
            String payload = "{\"files\": [{\"name\": \"Main.java\", \"content\": \"" + code + "\"}]}";

            System.out.println("77777777777777777");
            HttpEntity<String> entity = new HttpEntity<>(payload, headers);

            System.out.println(entity.getBody());
            return restTemplate.postForObject(apiUrl, entity, String.class);
        }
        catch(Error e){
            throw new GlobalException("Glot");
        }
    }

    public String runPythonCode(String code) {
        return runCode("python", code);
    }

    public String runJavaCode(String javaCode){
        return runCode("java", javaCode);
    }

    public String runCppCode(String code) {
        return runCode("cpp", code);
    }

    private String getFileExtension(String language) {
        switch (language) {
            case "python":
                return "py";
            case "java":
                return "java";
            case "cpp":
                return "cpp";
            default:
                throw new IllegalArgumentException("Unsupported language");
        }
    }
}