import {motion} from "framer-motion";
import React from "react";
import Prediction from "@/types/Prediction";


interface PredictionCardProps {
    prediction: Prediction
}


export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {


    return (
        <motion.div
            className="mt-4 p-4 bg-gray-700 rounded-md"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
        >
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center gap-2"
                    style={{color: prediction.homeTeam.primaryColor}}
                >
                    <img
                        src={prediction.homeTeam.logoUrl}
                        alt={prediction.homeTeam.name}
                        className="w-6 h-6"
                    />
                    <span>{prediction.homeTeam.abbreviation}</span>
                </div>
                <span className="text-xl font-bold">vs</span>
                <div
                    className="flex items-center gap-2"
                    style={{color: prediction.awayTeam.primaryColor}}
                >
                    <img
                        src={prediction.awayTeam.logoUrl}
                        alt={prediction.awayTeam.name}
                        className="w-6 h-6"
                    />
                    <span>{prediction.awayTeam.abbreviation}</span>
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
    )
}