import {SearchIcon} from "lucide-react";
import React from "react";


interface FilterBarProps {
    selectedLeague: string;
    // Use the event type expected by <select>'s onChange
    onLeagueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    searchTerm: string;
    // Use the event type expected by <input>'s onChange
    onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sortBy: 'date' | 'upside';
    // Use the event type expected by <select>'s onChange
    onSortByChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    // Optional: Pass the list of leagues to make the component more reusable
    availableLeagues?: string[];
}

const DEFAULT_LEAGUES = ["All", "NBA", "NFL", "MLB", "NHL", "NCAA"];


export const FiltersBar: React.FC<FilterBarProps> =
    ({
         selectedLeague,
         onLeagueChange,
         searchTerm,
         onSearchTermChange,
         sortBy,
         onSortByChange,
         availableLeagues = DEFAULT_LEAGUES
     }) => {
        return (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                    className="bg-gray-800 rounded-md p-2"
                    value={selectedLeague}
                    onChange={onLeagueChange}
                >
                    {availableLeagues.map((league) => (
                        <option key={league} value={league}>
                            {league == "All" ? "All Leagues" : league}
                        </option>
                    ))}
                </select>

                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Search teams..."
                        className="w-full bg-gray-800 rounded-md pl-10 p-2"
                        value={searchTerm}
                        onChange={onSearchTermChange}
                    />
                </div>

                <select
                    className="bg-gray-800 rounded-md p-2"
                    value={sortBy}
                    onChange={onSortByChange}
                >
                    <option value="upside">Potential Upside</option>
                    <option value="date">Date</option>
                </select>
            </div>
        )
    }