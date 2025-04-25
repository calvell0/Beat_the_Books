package com.calvell0.beat_the_books.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "logo")
public class Logo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "href")
    private String href;

    @ManyToOne
    @JoinColumn(name = "team_uid", referencedColumnName = "uid")
    private Team team;
} 