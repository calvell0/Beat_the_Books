package com.calvell0.beat_the_books.model.dto.espn;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record EspnLeague(
        String id,
        String uid,
        String name,
        String abbreviation,
        String shortName,
        String slug,
        List<EspnTeamWrapper> teams,
        int year
) {}
