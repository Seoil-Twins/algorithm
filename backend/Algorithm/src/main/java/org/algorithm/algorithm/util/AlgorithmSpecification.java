package org.algorithm.algorithm.util;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.algorithm.algorithm.entity.AlgorithmEntity;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;

public class AlgorithmSpecification {

    public static Specification<AlgorithmEntity> withDynamicQuery(String level, String tag, String keyword) {
        return (Root<AlgorithmEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // level 조건
            if (!"-1".equals(level)) {
                predicates.add(criteriaBuilder.equal(root.get("level"), Integer.parseInt(level)));
            }

            // tag 조건
            if (tag != null) {
                predicates.add(criteriaBuilder.equal(root.get("algorithmKind"), tag));
            }

            // keyword 조건
            if (keyword != null) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + keyword + "%"));
            }


            // 정렬 조건
//            if ("r".equals(sort)) {
//                query.orderBy(criteriaBuilder.desc(root.get("createdTime"))); // createdAt는 예시 필드
//            } else if ("or".equals(sort)) {
//                query.orderBy(criteriaBuilder.asc(root.get("createdTime")));
//            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}