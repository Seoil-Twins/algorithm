package org.algorithm.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.TestcaseEntity;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TestcaseDTO {
    private long testcaseId;
    private long algorithmId;
    private String input;
    private String output;

    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static TestcaseDTO toTestcaseDTO(TestcaseEntity testcaseEntity) {
        TestcaseDTO testcaseDTO = new TestcaseDTO();
        testcaseDTO.setTestcaseId(testcaseEntity.getTestcaseId());
        testcaseDTO.setAlgorithmId(testcaseEntity.getAlgorithmId());
        testcaseDTO.setInput(testcaseEntity.getInput());
        testcaseDTO.setOutput(testcaseEntity.getOutput());
        return testcaseDTO;
    }
}
