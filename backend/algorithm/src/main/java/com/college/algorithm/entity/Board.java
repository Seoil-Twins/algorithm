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
@Table(name = "board")
@NoArgsConstructor
@DynamicInsert
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "board_type_id", referencedColumnName = "type_id")
    private BoardType boardType;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "uploader_id", referencedColumnName = "user_id")
    private AppUser user;

    @OneToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "adopt_id", referencedColumnName = "comment_id")
    private Comment adopt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "algorithm_id", referencedColumnName = "algorithm_id")
    private Algorithm algorithm;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "comment_count")
    private Long commentCount;

    @Column(name = "recommend_count")
    private Integer recommendCount;

    @Column(name = "view_count")
    private Long viewCount;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Column(name = "deleted")
    private Boolean deleted;

    @Column(name = "deleted_time")
    private LocalDateTime deletedTime;

    @Transient
    private Boolean isSolved;

    public Boolean getIsSolved() {
        return adopt != null;
    }


    @Builder
    public Board(BoardType boardType, AppUser user, String title, String content, Algorithm algorithm) {
        this.boardType = boardType;
        this.user = user;
        this.title = title;
        this.content = content;
        this.algorithm = algorithm;
    }
}
