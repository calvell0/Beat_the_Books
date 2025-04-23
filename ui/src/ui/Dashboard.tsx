import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";



type League = "NBA" | "NFL" | "MLB" | "NHL" | "NCAA";


// Types for our data structures
interface Team {
    id: string;
    name: string;
    abbreviation: string;
    city: string;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    league: League;
}

interface BettingLine {
    id: string;
    league: League;
    teams: [Team, Team];
    odds: [number, number]; // [home odds, away odds]
    predictedWinner: 0 | 1; // 0 for home, 1 for away
    date: string;
    potentialUpside: number; // 0-1 scale
}

interface Prediction {
    winner: Team;
    confidence: number; // 0-1 scale
}

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
    const [selectedLeague, setSelectedLeague] = useState<string>("All");
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

    // Filter and sort betting lines
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


    // Handle prediction request
    const handlePrediction = async () => {
        if (!homeTeam || !awayTeam || homeTeam.id === awayTeam.id) return;


        // Simulate API call
        setTimeout(() => {
            setPrediction({
                winner: Math.random() > 0.5 ? homeTeam : awayTeam,
                confidence: Math.random() * 0.4 + 0.6, // 60-100% confidence
            });
        }, 1000);
    };

    const handleLeagueChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLeague = e.target.value;
        setSelectedLeague(newLeague);
        setSelectedLeagueTeams(mockTeams.filter(team => newLeague === "All" || team.league === newLeague));

        setHomeTeam(null);
        setAwayTeam(null);

    }

    const getFormattedOdds = (odds: number) => {
        return odds > 0 ? `+${odds}` : odds.toString();
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                    className="bg-gray-800 rounded-md p-2"
                    value={selectedLeague}
                    onChange={handleLeagueChange}
                >
                    <option value="All">All Leagues</option>
                    <option value="NBA">NBA</option>
                    <option value="NFL">NFL</option>
                    <option value="MLB">MLB</option>
                    <option value="NHL">NHL</option>
                    <option value="NCAA">NCAA</option>
                </select>

                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search teams..."
                        className="w-full bg-gray-800 rounded-md pl-10 p-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="bg-gray-800 rounded-md p-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "date" | "upside")}
                >
                    <option value="upside">Potential Upside</option>
                    <option value="date">Date</option>
                </select>
            </div>

            {/* Betting Lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {isLoadingBettingLines ? (
                    <div className="col-span-full text-center">Loading...</div>
                ) : filteredLines.length === 0 ? (
                    <div className="col-span-full text-center">No betting lines found</div>
                ) : (
                    filteredLines.map((line) => (
                        <motion.div
                            key={line.id}
                            className="bg-gray-800 rounded-lg p-4 shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-bold">{line.league}</span>
                                <span className="text-sm">
                  {new Date(line.date).toLocaleDateString()}
                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                {line.teams.map((team, index) => (
                                    <div
                                        key={team.id}
                                        className="flex items-center gap-2"
                                        style={{ color: team.primaryColor }}
                                    >
                                        <img
                                            src={team.logoUrl}
                                            alt={team.name}
                                            className="w-8 h-8"
                                        />
                                        <div>
                                            <div className="font-bold">{team.abbreviation}</div>
                                            <div className="text-sm">{getFormattedOdds(line.odds[index])}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <div className="text-sm text-gray-400">Potential Upside</div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{
                                            width: `${line.potentialUpside * 100}%`,
                                            backgroundColor: line.teams[line.predictedWinner].primaryColor,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Prediction Tool */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Matchup Predictor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                        className="bg-gray-900 rounded-md p-2"
                        onChange={(e) =>
                            setHomeTeam(selectedLeagueTeams.find((t) => t.id === e.target.value) || null)
                        }
                    >
                        <option value="">Select Home Team</option>
                        {selectedLeagueTeams.map((team) => (
                            <option key={team.id} value={team.id} disabled={team.id === awayTeam?.id}>
                                {team.city} {team.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="bg-gray-900 rounded-md p-2"
                        onChange={(e) =>
                            setAwayTeam(selectedLeagueTeams.find((t) => t.id === e.target.value) || null)
                        }
                    >
                        <option value="">Select Away Team</option>
                        {selectedLeagueTeams.map((team) => (
                            <option key={team.id} value={team.id} disabled={team.id === homeTeam?.id}>
                                {team.city} {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    className="mt-4"
                    onClick={handlePrediction}
                    disabled={!homeTeam || !awayTeam || homeTeam?.id === awayTeam?.id}
                >
                    Get Prediction
                </Button>
                {prediction && homeTeam && awayTeam && (
                    <motion.div
                        className="mt-4 p-4 bg-gray-700 rounded-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className="flex items-center gap-2"
                                style={{ color: homeTeam.primaryColor }}
                            >
                                <img
                                    src={homeTeam.logoUrl}
                                    alt={homeTeam.name}
                                    className="w-6 h-6"
                                />
                                <span>{homeTeam.abbreviation}</span>
                            </div>
                            <span className="text-xl font-bold">vs</span>
                            <div
                                className="flex items-center gap-2"
                                style={{ color: awayTeam.primaryColor }}
                            >
                                <img
                                    src={awayTeam.logoUrl}
                                    alt={awayTeam.name}
                                    className="w-6 h-6"
                                />
                                <span>{awayTeam.abbreviation}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-lg">
                                Predicted Winner:{" "}
                                <span
                                    className="font-bold"
                                    style={{ color: prediction.winner.primaryColor }}
                                >
                  {prediction.winner.name}
                </span>
                            </div>
                            <div className="text-sm">
                                Confidence: {(prediction.confidence * 100).toFixed(1)}%
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SportsBettingDashboard;