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
@Table(name = "user_link")
@NoArgsConstructor
public class UserLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "link_id")
    private Long linkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private AppUser user;

    @Column(name = "link_kind")
    private String linkKind;

    @Column(name = "domain")
    private String domain;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public UserLink(AppUser user, String linkKind, String domain) {
        this.user = user;
        this.linkKind = linkKind;
        this.domain = domain;
    }
}
