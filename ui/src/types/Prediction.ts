import {Team} from "@/types/Team";


export default interface Prediction {
    winner: Team;
    confidence: number; // 0-1 scale
}