package com.calvell0.beat_the_books.services;

import com.calvell0.beat_the_books.config.ESPNApiProperties;
import com.calvell0.beat_the_books.model.dto.espn.EspnSportsApiResponse;
import com.calvell0.beat_the_books.model.enums.LeagueType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import java.util.Optional;


@Service
public class ESPNApiClient {


    Logger LOG = LoggerFactory.getLogger(ESPNApiClient.class);

    private final RestTemplate restTemplate;
    private final ESPNApiProperties espnApiProperties;
    private final ObjectMapper objectMapper;

    @Autowired
    public ESPNApiClient(RestTemplate restTemplate, ESPNApiProperties espnApiProperties, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.espnApiProperties = espnApiProperties;
        this.objectMapper = objectMapper;
    }



    public Optional<EspnSportsApiResponse> getTeamsByLeague(LeagueType leagueType) {
        String url = String.format("%s/sports/%s/%s/teams?limit=1000",
                espnApiProperties.getBaseUrl(),
                leagueType.sport(),
                leagueType.leagueUri());

        try {
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);


            if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.hasBody()) {
                String jsonResponse = responseEntity.getBody();

                if (jsonResponse == null || jsonResponse.isEmpty()) {
                    System.err.println("Received empty response body from API.");
                    return Optional.empty();
                }

                EspnSportsApiResponse apiResponse = objectMapper.readValue(jsonResponse, EspnSportsApiResponse.class);

                return Optional.ofNullable(apiResponse);

            } else {
                LOG.error("API Error: Received status code %s from %s%n", responseEntity.getStatusCode(), url);
                return Optional.empty();
            }

        } catch (JsonProcessingException e) {
            System.err.println("Error deserializing ESPN JSON response: " + e.getMessage());
            return Optional.empty();
        } catch (RestClientException e) {
            System.err.println("Error during ESPN API call via RestTemplate: " + e.getMessage());
            return Optional.empty();
        } catch (Exception e) {
            System.err.println("Unexpected error fetching ESPN data: " + e.getMessage());
            return Optional.empty();
        }
    }

}
