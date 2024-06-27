package com.college.algorithm.mapper;

import com.college.algorithm.util.CustomTimestamp;
import org.mapstruct.Qualifier;

import java.time.LocalDateTime;

@Qualifier @interface CustomTimestampTranslator { }
@Qualifier @interface MapCreatedTime { }

@CustomTimestampTranslator
public class CustomTimestampMapper {
    @MapCreatedTime
    public String mapCreatedTime(LocalDateTime createdTime) {
        CustomTimestamp timestamp = new CustomTimestamp();
        timestamp.setTimestamp(createdTime);

        return String.valueOf(timestamp);
    }
}
