import {Team} from "@/types/Team";


export default interface Prediction {
    homeTeam: Team;
    awayTeam: Team;
    winner: Team;
    confidence: number; // 0-1 scale
}