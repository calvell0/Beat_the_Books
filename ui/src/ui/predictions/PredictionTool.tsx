import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import React from "react";
import {Team} from "@/types/Team";
import {League} from "@/types/league";


interface PredictionToolProps {
    teams: Team[],
    league: League
}

export const PredictionTool: React.FC<PredictionToolProps> = ({teams, league = "All"}) => {

    const [homeTeam, setHomeTeam] = React.useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = React.useState<Team | null>(null);
    const [prediction, setPrediction] = React.useState<{ winner: Team; confidence: number } | null>(null);
    const [loading, setLoading] = React.useState(false);

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
                disabled={!homeTeam || !awayTeam || homeTeam?.id === awayTeam?.id}
            >
                Get Prediction
            </Button>
            {prediction && homeTeam && awayTeam && (
                <motion.div
                    className="mt-4 p-4 bg-gray-700 rounded-md"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-2"
                            style={{color: homeTeam.primaryColor}}
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
                            style={{color: awayTeam.primaryColor}}
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
                                style={{color: prediction.winner.primaryColor}}
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
    )
}