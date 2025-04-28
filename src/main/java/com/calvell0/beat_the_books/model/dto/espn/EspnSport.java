package com.calvell0.beat_the_books.model.dto.espn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record EspnSport(
        String id,
        String uid,
        String name,
        String slug,
        List<EspnLeague> leagues
) {}
