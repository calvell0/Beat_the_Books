import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import React, {useEffect} from "react";
import {Team} from "@/types/Team";
import {League} from "@/types/league";
import Prediction from "@/types/Prediction";
import {PredictionCard} from "@/components/predictions/PredictionCard";


interface PredictionToolProps {
    teams: Team[],
    league: League
}

export const PredictionTool: React.FC<PredictionToolProps> = ({teams, league = "All"}) => {

    const [homeTeam, setHomeTeam] = React.useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = React.useState<Team | null>(null);
    const [prediction, setPrediction] = React.useState<Prediction | null>(null);
    const [loading, setLoading] = React.useState(false);


    const handlePrediction = async () => {
        if (!homeTeam || !awayTeam || homeTeam.id === awayTeam.id) return;


        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setPrediction({
                winner: Math.random() > 0.5 ? {...homeTeam} : {...awayTeam},
                homeTeam: {...homeTeam},
                awayTeam: {...awayTeam},
                confidence: Math.random() * 0.4 + 0.6, // 60-100% confidence
            } as Prediction)
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Matchup Predictor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                    className="bg-gray-900 rounded-md p-2"
                    onChange={(e) =>
                        setHomeTeam(teams.find((t) => t.id === e.target.value) || null)
                    }
                >
                    <option value="">Select Home Team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id} disabled={team.id === awayTeam?.id}>
                            {team.city} {team.name}
                        </option>
                    ))}
                </select>

                <select
                    className="bg-gray-900 rounded-md p-2"
                    onChange={(e) =>
                        setAwayTeam(teams.find((t) => t.id === e.target.value) || null)
                    }
                >
                    <option value="">Select Away Team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id} disabled={team.id === homeTeam?.id}>
                            {team.city} {team.name}
                        </option>
                    ))}
                </select>
            </div>
            <Button
                className="mt-4"
                onClick={handlePrediction}
                disabled={ !homeTeam || !awayTeam || homeTeam?.id === awayTeam?.id || loading}
            >
                {loading ? "Loading..." : "Get Prediction"}
            </Button>
            {prediction && (
                <PredictionCard prediction={prediction}></PredictionCard>
            )}
        </div>
    )
}