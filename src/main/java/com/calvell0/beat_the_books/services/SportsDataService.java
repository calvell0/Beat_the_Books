package com.calvell0.beat_the_books.services;


import com.calvell0.beat_the_books.model.enums.LeagueType;
import lombok.RequiredArgsConstructor;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class SportsDataService {

    private final ESPNApiClient apiClient;
    private final TeamProcessingService teamProcessingService;

    //TODO: Finish implementing, add retry logic to api client class
    public void syncExternalData() {
        Stream.of(LeagueType.values()).forEach(league -> {

        });
    }
}
