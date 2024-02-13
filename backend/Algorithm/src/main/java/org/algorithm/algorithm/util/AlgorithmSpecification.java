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

    public static Specification<AlgorithmEntity> withDynamicQuery(String solved, String sort, String level, String kind, String rate, String tag, String keyword) {
        return (Root<AlgorithmEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // solved 조건
            if ("s".equals(solved)) {
                // 'solved'가 's'일 경우, true인 경우만 필터링
                predicates.add(criteriaBuilder.isTrue(root.get("solved")));
            } else if ("ns".equals(solved)) {
                // 'solved'가 'ns'일 경우, false인 경우만 필터링
                predicates.add(criteriaBuilder.isFalse(root.get("solvedField")));
            }

            // level 조건
            if (!"-1".equals(level)) {
                predicates.add(criteriaBuilder.equal(root.get("level"), Integer.parseInt(level)));
            }

            // kind 조건
            if (!"a".equals(kind)) {
                predicates.add(criteriaBuilder.equal(root.get("kind"), kind));
            }

            // tag 조건
            if (tag != null) {
                predicates.add(criteriaBuilder.equal(root.get("tag"), tag));
            }

            // keyword 조건
            if (keyword != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + keyword + "%"));
            }

            // 정렬 조건
            if ("r".equals(sort)) {
                query.orderBy(criteriaBuilder.desc(root.get("createdAt"))); // createdAt는 예시 필드
            } else if ("or".equals(sort)) {
                query.orderBy(criteriaBuilder.asc(root.get("createdAt")));
            }

            // 기타 조건들 ...

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}