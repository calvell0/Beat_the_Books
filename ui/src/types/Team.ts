import {League} from "@/types/league";


export interface Team {
    id: string;
    name: string;
    abbreviation: string;
    city: string;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    league: League;
}