import React from "react";
import BettingLine from "@/types/BettingLine";
import {BettingLineCard} from "@/components/betting/BettingLineCard";


interface BettingLineListProps {
    filteredLines: BettingLine[];
    isLoadingBettingLines: boolean;
}




export const BettingLineList: React.FC<BettingLineListProps> = ({isLoadingBettingLines = true, filteredLines}) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {isLoadingBettingLines ? (
                <div className="col-span-full text-center">Loading...</div>
            ) : filteredLines.length === 0 ? (
                <div className="col-span-full text-center">No betting lines found</div>
            ) : (
                filteredLines.map((line) => (
                    <BettingLineCard line={line}></BettingLineCard>
                ))
            )}
        </div>
    )
}