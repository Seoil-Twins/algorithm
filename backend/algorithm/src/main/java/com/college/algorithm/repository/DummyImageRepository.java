package com.college.algorithm.repository;

import com.college.algorithm.entity.DummyImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DummyImageRepository extends JpaRepository<DummyImage, Long> {
    DummyImage findDummyImageByImageId(Long imageId);
}
