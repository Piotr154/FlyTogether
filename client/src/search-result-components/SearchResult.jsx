import { StartingPointCard } from './StartingPointCard.jsx'
import { ResultsHeader } from './ResultsHeader.jsx';
import { useState } from 'react';
import '../styles/SearchResult.css';

export const SearchResult = ({ refResult, result, destination}) => {
    const [showingDepartures, setShowingDepartures] = useState(true);
    const [startingPointFilter, setStartingPointFilter] = useState([]);
    const [sortFlightsBy, setSortFlightsBy] = useState("Departure Time");

    if (result === null) {
        return null;
    }

    const filteredFlights = result.filter(flight => {
        const matchesType = flight.type === showingDepartures;
        const matchesStartingPoint = startingPointFilter.length === 0 || startingPointFilter.includes(flight.origin);
        return matchesType && matchesStartingPoint;
    });

    const uniqueOrigins = [...new Set(filteredFlights.map(f => f.origin))];
    const allOriginsForFilter = [...new Set(result.filter(f => f.type === showingDepartures).map(f => f.origin))];

    
    
    return (
        <div id="results-container" className="results-container" ref={refResult}>
            <ResultsHeader 
                destination={destination} 
                StartingPoints={allOriginsForFilter}
                StartingPointsCount={uniqueOrigins.length} 
                showingDepartures={showingDepartures} 
                setShowingDepartures={setShowingDepartures}
                startingPointFilter={startingPointFilter}
                setStartingPointFilter={setStartingPointFilter}
                sortFlightsBy={sortFlightsBy}
                setSortFlightsBy={setSortFlightsBy}
                filteredFlights={filteredFlights}
            />
            {uniqueOrigins.map((origin, index) => {
                const flightsForOrigin = filteredFlights.filter(flight => flight.origin === origin);
                return(
                    <StartingPointCard 
                        key={index}
                        startingPoint={origin} 
                        flights={flightsForOrigin} 
                        showingDepartures = {showingDepartures}
                        sortFlightsBy = {sortFlightsBy}
                    />
                )
            })}
        </div>
    );
}