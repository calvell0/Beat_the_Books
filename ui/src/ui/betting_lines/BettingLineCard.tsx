import BettingLine from "@/types/BettingLine";
import {motion} from "framer-motion";
import React from "react";


interface BettingLineCardProps {
    line: BettingLine;
}

//TODO: Maybe move somewhere better
const getFormattedOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : odds.toString();
}

export const BettingLineCard: React.FC<BettingLineCardProps> = ({ line }) => {


    return (
        <motion.div
            key={line.id}
            className="bg-gray-800 rounded-lg p-4 shadow-md"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
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
                        style={{color: team.primaryColor}}
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
    )
}