import {League} from "@/types/league";
import {Team} from "@/types/Team";


export default interface BettingLine{
    id: string;
    league: League;
    teams: [Team, Team];
    odds: [number, number]; // [home odds, away odds]
    predictedWinner: 0 | 1; // 0 for home, 1 for away
    date: string;
    potentialUpside: number; // 0-1 scale
}