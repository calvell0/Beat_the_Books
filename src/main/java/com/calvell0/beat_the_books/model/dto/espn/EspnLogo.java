package com.calvell0.beat_the_books.model.dto.espn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record EspnLogo(
        String href,
        String alt,
        List<String> rel,
        int width,
        int height
) {}
