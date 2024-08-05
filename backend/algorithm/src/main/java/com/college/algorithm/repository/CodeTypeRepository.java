package com.college.algorithm.repository;

import com.college.algorithm.entity.CodeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeTypeRepository extends JpaRepository<CodeType, Long> {
    CodeType findCodeTypeByTypeId(String typeId);
}
