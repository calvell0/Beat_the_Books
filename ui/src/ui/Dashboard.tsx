import React, {useState, useMemo, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {SearchIcon} from "lucide-react";
import {motion} from "framer-motion";
import {Header} from "@/ui/Header";
import {League} from "@/types/league";
import {FiltersBar} from "@/ui/filters/FiltersBar";
import {Team} from "@/types/Team";
import BettingLine from "@/types/BettingLine";
import Prediction from "@/types/Prediction";
import {BettingLineList} from "@/ui/betting_lines/BettingLineList";
import {PredictionTool} from "@/ui/predictions/PredictionTool";


// Mock data
const mockTeams: Team[] = [
    {
        id: "1",
        name: "Lakers",
        abbreviation: "LAL",
        city: "Los Angeles",
        primaryColor: "#552583",
        secondaryColor: "#FDB927",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
        league: "NBA"
    },
    {
        id: "2",
        name: "Celtics",
        abbreviation: "BOS",
        city: "Boston",
        primaryColor: "#007A33",
        secondaryColor: "#BA9653",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
        league: "NBA"
    },
    {
        id: "3",
        name: "Warriors",
        abbreviation: "GSW",
        city: "Golden State",
        primaryColor: "#1D428A",
        secondaryColor: "#FFC72C",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/gsw.png",
        league: "NBA"
    },
    {
        id: "4",
        name: "Bulls",
        abbreviation: "CHI",
        city: "Chicago",
        primaryColor: "#CE1141",
        secondaryColor: "#000000",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/chi.png",
        league: "NBA"
    },
    {
        id: "5",
        name: "Patriots",
        abbreviation: "NE",
        city: "New England",
        primaryColor: "#002244",
        secondaryColor: "#C60C30",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
        league: "NFL"
    },
    {
        id: "6",
        name: "Cowboys",
        abbreviation: "DAL",
        city: "Dallas",
        primaryColor: "#041E42",
        secondaryColor: "#869397",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
        league: "NFL"
    },
    {
        id: "7",
        name: "Yankees",
        abbreviation: "NYY",
        city: "New York",
        primaryColor: "#003087",
        secondaryColor: "#E4002B",
        logoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
        league: "MLB"
    },
    {
        id: "8",
        name: "Red Sox",
        abbreviation: "BOS",
        city: "Boston",
        primaryColor: "#BD3039",
        secondaryColor: "#0C2340",
        logoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
        league: "MLB"
    },
    {
        id: "9",
        name: "Bruins",
        abbreviation: "BOS",
        city: "Boston",
        primaryColor: "#FFB81C",
        secondaryColor: "#000000",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nhl/500/bos.png",
        league: "NHL"
    },
    {
        id: "10",
        name: "Maple Leafs",
        abbreviation: "TOR",
        city: "Toronto",
        primaryColor: "#003E7E",
        secondaryColor: "#FFFFFF",
        logoUrl: "https://a.espncdn.com/i/teamlogos/nhl/500/tor.png",
        league: "NHL"
    }
];

const mockBettingLines: BettingLine[] = [
    {
        id: "1",
        league: "NBA",
        teams: [mockTeams[0], mockTeams[1]],
        odds: [-150, +130],
        predictedWinner: 1,
        date: "2024-01-15",
        potentialUpside: 0.85,
    },
    {
        id: "2",
        league: "NBA",
        teams: [mockTeams[2], mockTeams[3]],
        odds: [-120, +110],
        predictedWinner: 1,
        date: "2024-01-16",
        potentialUpside: 0.75,
    },
    {
        id: "3",
        league: "NFL",
        teams: [mockTeams[4], mockTeams[5]],
        odds: [-140, +125],
        predictedWinner: 1,
        date: "2024-01-17",
        potentialUpside: 0.80,
    },
    {
        id: "4",
        league: "MLB",
        teams: [mockTeams[6], mockTeams[7]],
        odds: [-130, +115],
        predictedWinner: 1,
        date: "2024-01-18",
        potentialUpside: 0.70,
    },
    {
        id: "5",
        league: "NHL",
        teams: [mockTeams[8], mockTeams[9]],
        odds: [-110, +105],
        predictedWinner: 1,
        date: "2024-01-19",
        potentialUpside: 0.65,
    }
];


const SportsBettingDashboard: React.FC = () => {
    // State management
    const [bettingLines, setBettingLines] = useState<BettingLine[]>([]);
    const [selectedLeague, setSelectedLeague] = useState<League>("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "upside">("upside");
    const [homeTeam, setHomeTeam] = useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = useState<Team | null>(null);
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [isLoadingBettingLines, setIsLoadingBettingLines] = useState(false);
    const [selectedLeagueTeams, setSelectedLeagueTeams] = useState<Team[]>(mockTeams);


    // Fetch initial data
    useEffect(() => {
        // Simulate API call
        setIsLoadingBettingLines(true);
        setTimeout(() => {
            setBettingLines(mockBettingLines);
            setIsLoadingBettingLines(false);
        }, 1000);
    }, []);


    const filteredLines = useMemo(() => {
        return bettingLines
            .filter((line) => {
                const leagueMatch =
                    selectedLeague === "All" || line.league === selectedLeague;
                const searchMatch =
                    !searchTerm ||
                    line.teams.some((team) =>
                        `${team.city} ${team.name} ${team.abbreviation}`
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    );
                return leagueMatch && searchMatch;
            })
            .sort((a, b) =>
                sortBy === "date"
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : b.potentialUpside - a.potentialUpside
            );
    }, [bettingLines, selectedLeague, searchTerm, sortBy]);

    const handleSearchTermChange = async () => (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.trim());
    }

    const handleSortByChange = async () => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value.trim() as "date" | "upside");
    }


    const handleLeagueChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLeague = e.target.value as League;
        setSelectedLeague(newLeague);
        setSelectedLeagueTeams(mockTeams.filter(team => newLeague === "All" || team.league === newLeague));

        setHomeTeam(null);
        setAwayTeam(null);

    }


    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <Header></Header>

            <FiltersBar selectedLeague={selectedLeague}
                        onLeagueChange={handleLeagueChange}
                        searchTerm={searchTerm}
                        onSearchTermChange={handleSearchTermChange}
                        sortBy={sortBy}
                        onSortByChange={handleSortByChange}></FiltersBar>

            <BettingLineList filteredLines={filteredLines}
                             isLoadingBettingLines={isLoadingBettingLines}></BettingLineList>

            <PredictionTool teams={selectedLeagueTeams} league={selectedLeague}></PredictionTool>

        </div>
    );
};

export default SportsBettingDashboard;