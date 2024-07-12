package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "try")
@NoArgsConstructor
public class Try {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "try_id")
    private Long tryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "algorithm_id", referencedColumnName = "algorithm_id")
    private Algorithm algorithm;

    @Column(name = "solved")
    private Boolean solved;

    @Column(name = "try_time", nullable = false)
    private String tryTime;

    @Column(name = "try_memory", nullable = false)
    private String tryMemory;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public Try(AppUser user, Algorithm algorithm, Boolean solved, String tryTime, String tryMemory) {
        this.user = user;
        this.algorithm = algorithm;
        this.solved = solved;
        this.tryTime = tryTime;
        this.tryMemory = tryMemory;
    }
}
