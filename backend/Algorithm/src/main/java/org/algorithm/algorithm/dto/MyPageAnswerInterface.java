package org.algorithm.algorithm.dto;

import java.time.Instant;
import java.time.LocalDateTime;

public interface MyPageAnswerInterface {
    Long getBoard_id();
    Long getBoard_type();
    String getTitle();
    String getContent();
    String getSolved();
    String getViews();
    Instant getCreated_time();
}
