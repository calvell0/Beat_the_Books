package com.calvell0.beat_the_books.model.dto.espn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record EspnTeamWrapper(
        EspnTeam team
) {}
