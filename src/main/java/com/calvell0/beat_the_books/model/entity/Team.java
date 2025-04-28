package com.calvell0.beat_the_books.model.entity;

import com.calvell0.beat_the_books.model.enums.LeagueType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "team")
public class Team {

    @Id
    @Column(name = "uid")
    private String uid;
    
    @Column(name = "guid")
    private String guid;
    
    @Column(name = "id")
    private String id;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "abbreviation")
    private String abbreviation;
    
    @Column(name = "display_name")
    private String displayName;
    
    @Column(name = "short_display_name")
    private String shortDisplayName;
    
    @Column(name = "color")
    private String color;
    
    @Column(name = "alternate_color")
    private String alternateColor;
    
    @Column(name = "is_active")
    private boolean active;
    
    @Column(name = "is_all_star")
    private boolean allStar;
    
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Logo> logos;
    
    @OneToMany(mappedBy = "homeTeam")
    private List<Event> homeEvents;
    
    @OneToMany(mappedBy = "awayTeam")
    private List<Event> awayEvents;

    @Enumerated(EnumType.STRING)
    @Column(name = "league")
    private LeagueType league;
}
