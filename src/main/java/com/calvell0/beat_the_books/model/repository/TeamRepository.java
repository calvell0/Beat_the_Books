package com.calvell0.beat_the_books.model.repository;


import com.calvell0.beat_the_books.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, String> {
}
