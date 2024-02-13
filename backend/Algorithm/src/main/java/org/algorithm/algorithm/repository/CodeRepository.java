package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.CodeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CodeRepository extends JpaRepository<CodeEntity, Long> {

    Page<CodeEntity> findAll(Pageable pageable);
    List<CodeEntity> findAll();
    CodeEntity findCodeEntityByCodeId(Long codeId);
//    @Query(value = "select * from code where algorithm_id = :algorithmId;",
//            nativeQuery = true)

    
//    Page<CodeEntity> findCodeEntitiesByAlgorithmId(Pageable pageable, Long algorithmId);
    Page<CodeEntity> findCodeEntitiesByAlgorithmIdAndTypeAndSolved(Pageable pageable, Long algorithmId, Long type, Boolean solved);

    @Query(value = "SELECT COUNT(*) FROM recommend_code where code_id = :codeId",
            nativeQuery = true)
    String findRecommendByCodeId(@Param("codeId") Long codeId);


}