DROP TABLE team;

CREATE TYPE event_status AS ENUM ('STATUS_SCHEDULED', 'STATUS_POSTPONED', 'STATUS_FINAL', 'STATUS_CANCELED');
CREATE TYPE season_type AS ENUM ('preseason', 'post-season', 'regular-season', 'other');

CREATE TABLE IF NOT EXISTS team
(
    uid              VARCHAR(45) UNIQUE PRIMARY KEY,
    guid            VARCHAR(36),
    id              VARCHAR(5),
    location       VARCHAR(50),
    abbreviation     VARCHAR(5),
    display_name      VARCHAR(75),
    short_display_name VARCHAR(50),
    color            VARCHAR(6),
    alternate_color   VARCHAR(6),
    is_active         BOOLEAN,
    is_all_star        BOOLEAN
    );

CREATE TABLE IF NOT EXISTS event
(
    id                     INT NOT NULL,
    uid                    VARCHAR(45) UNIQUE PRIMARY KEY,
    date                   TIMESTAMP,
    short_name             VARCHAR(20),
    season_year            SMALLINT,
    season_type             SMALLINT,
    week                   SMALLINT,
    competition_type       SMALLINT,
    conference_competition BOOLEAN,
    neutral_site           BOOLEAN,
    home_team              VARCHAR(45),
    away_team              VARCHAR(45),
    status                 event_status,
    FOREIGN KEY (home_team) REFERENCES Team (uid),
    FOREIGN KEY (away_team) REFERENCES Team (uid)
);

CREATE TABLE IF NOT EXISTS competitor
(
    instance_id  SERIAL PRIMARY KEY,
    team_id      VARCHAR(45) NOT NULL,
    event_uid     VARCHAR(45) NOT NULL,
    winner       BOOLEAN DEFAULT NULL,
    home_wins    SMALLINT DEFAULT 0,
    home_losses  SMALLINT DEFAULT 0,
    away_wins    SMALLINT DEFAULT 0,
    away_losses  SMALLINT DEFAULT 0,
    total_wins   SMALLINT GENERATED ALWAYS AS (home_wins + away_wins) STORED,
    total_losses SMALLINT GENERATED ALWAYS AS (home_losses + away_losses) STORED,
    FOREIGN KEY (team_id) REFERENCES team (uid),
    FOREIGN KEY (event_uid) REFERENCES event (uid)
);

CREATE TABLE IF NOT EXISTS Logo
(
    id      SERIAL PRIMARY KEY,
    href    VARCHAR(255),
    team_uid VARCHAR(45),
    FOREIGN KEY (team_uid) REFERENCES Team (uid)
)