package com.calvell0.beat_the_books.config;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Getter
@ConfigurationProperties(prefix = "espn.api")
@Configuration
public class ESPNApiProperties {
    private String baseUrl;

}
