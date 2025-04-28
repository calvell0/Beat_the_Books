package com.calvell0.beat_the_books;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;


@EnableAsync
@EnableCaching
@SpringBootApplication
public class BeatTheBooksApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeatTheBooksApplication.class, args);
    }

}
