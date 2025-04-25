package com.calvell0.beat_the_books.model.entity;

import com.calvell0.beat_the_books.model.enums.EventStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "event")
public class Event {

    @Column(name = "id")
    private Integer id;

    @Id
    @Column(name = "uid")
    private String uid;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "season_year")
    private Short seasonYear;

    @Column(name = "season_type")
    private Short seasonType;

    @Column(name = "week")
    private Short week;

    @Column(name = "competition_type")
    private Short competitionType;

    @Column(name = "conference_competition")
    private Boolean conferenceCompetition;

    @Column(name = "neutral_site")
    private Boolean neutralSite;

    @ManyToOne
    @JoinColumn(name = "home_team", referencedColumnName = "uid")
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "away_team", referencedColumnName = "uid")
    private Team awayTeam;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EventStatus status;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Competitor> competitors;
} 