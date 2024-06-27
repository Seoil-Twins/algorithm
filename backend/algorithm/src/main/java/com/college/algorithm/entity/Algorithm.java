package com.college.algorithm.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "algorithm")
@NoArgsConstructor
@DynamicInsert
public class Algorithm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "algorithm_id")
    private Long algorithmId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "uploader_id", referencedColumnName = "user_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "kind_id", referencedColumnName = "kind_id")
    private AlgorithmKind kind;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "compe_id", referencedColumnName = "compe_id")
    private AlgorithmCompe compe;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "level", nullable = false)
    private Character level;

    @Column(name = "limit_time", nullable = false)
    private String limitTime;

    @Column(name = "limit_memory", nullable = false)
    private String limitMemory;

    @Column(name = "recommend_count")
    private Integer recommendCount;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Builder
    public Algorithm(AppUser user, AlgorithmKind kind, AlgorithmCompe compe, String title, String content, Character level, String limitTime, String limitMemory) {
        this.user = user;
        this.kind = kind;
        this.compe = compe;
        this.title = title;
        this.content = content;
        this.level = level;
        this.limitTime = limitTime;
        this.limitMemory = limitMemory;
    }
}
