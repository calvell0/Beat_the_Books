package com.calvell0.beat_the_books.model.dto.espn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record EspnTeam(
        String id,
        String uid,
        String slug,
        String abbreviation,
        String displayName,
        String shortDisplayName,
        String name,
        String nickname,
        String location,
        String color,
        String alternateColor,
        boolean isActive,
        boolean isAllStar,
        List<EspnLogo> logos
) {}
