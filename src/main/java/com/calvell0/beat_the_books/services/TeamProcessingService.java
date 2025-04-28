package com.calvell0.beat_the_books.services;


import com.calvell0.beat_the_books.mappers.TeamMapper;
import com.calvell0.beat_the_books.model.dto.espn.EspnTeam;
import com.calvell0.beat_the_books.model.entity.Team;
import com.calvell0.beat_the_books.model.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamProcessingService {

    private final Logger LOG = LoggerFactory.getLogger(TeamProcessingService.class);

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;

    public Team processAndSaveEspnTeam(EspnTeam espnTeam) {
        var team = teamMapper.espnTeamToTeam(espnTeam);

        try {
            return teamRepository.save(team);
        } catch (Exception e){
            LOG.error("Error saving team: {}. Exception: {}", team, e.getMessage(), e);
        }

        return null;
    }

    public List<Team> processAndSaveEspnTeams(List<EspnTeam> espnTeams) {

        var teams = teamMapper.espnTeamsToTeams(espnTeams);

        try {
            return teamRepository.saveAll(teams);
        } catch (Exception e) {
            LOG.error("Error saving teams: {}. Exception: {}", teams, e.getMessage(), e);
        }


        return null; // This method could be modified to return a list of saved teams if needed
    }

}
