package com.calvell0.beat_the_books.model.dto.espn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

// Represents the root JSON object { "sports": [...] }
@JsonIgnoreProperties(ignoreUnknown = true)
public record EspnSportsApiResponse(
        List<EspnSport> sports
) {}
