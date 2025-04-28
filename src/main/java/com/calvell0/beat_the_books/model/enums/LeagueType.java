package com.calvell0.beat_the_books.model.enums;

public enum LeagueType {
    NHL,
    NBA,
    NFL,
    MLB,
    NCAAMBB;

    public String sport(){
        return switch (this) {
            case NHL -> "hockey";
            case NBA, NCAAMBB -> "basketball";
            case NFL -> "football";
            case MLB -> "baseball";
            default -> throw new IllegalArgumentException("Unsupported league type: " + this);
        };
    }

    public String leagueUri(){
        return switch (this) {
            case NHL -> "nhl";
            case NBA -> "nba";
            case NFL -> "nfl";
            case MLB -> "mlb";
            case NCAAMBB -> "mens-college-basketball";
            default -> throw new IllegalArgumentException("Unsupported league type: " + this);
        };
    }

    public boolean isSupported(){
        return false;
    }
}
