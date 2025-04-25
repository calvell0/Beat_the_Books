CREATE TYPE league_type AS ENUM ('NHL', 'NFL', 'NBA', 'MLB', 'NCAAMBB');

ALTER TABLE team
    ADD COLUMN league league_type;