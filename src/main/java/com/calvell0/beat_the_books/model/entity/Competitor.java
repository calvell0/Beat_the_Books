package com.calvell0.beat_the_books.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "competitor")
public class Competitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instance_id")
    private Long instanceId;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "uid")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "event_uid", referencedColumnName = "uid")
    private Event event;

    @Column(name = "winner")
    private Boolean winner;

    @Column(name = "home_wins")
    private Short homeWins;

    @Column(name = "home_losses")
    private Short homeLosses;

    @Column(name = "away_wins")
    private Short awayWins;

    @Column(name = "away_losses")
    private Short awayLosses;
} 