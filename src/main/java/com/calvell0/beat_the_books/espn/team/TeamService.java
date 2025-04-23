package com.calvell0.beat_the_books.espn.team;


import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    //TODO: Caching
    @Cacheable(value = "teams")
    public List<Team> fetchTeams(){
        return List.of(new Team());
    }
}
