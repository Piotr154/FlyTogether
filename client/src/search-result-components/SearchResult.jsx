import { StartingPointCard } from './StartingPointCard.jsx'
import { ResultsHeader } from './ResultsHeader.jsx';
import { useState } from 'react';
import '../styles/SearchResult.css';

export const SearchResult = ({ refResult, result, destination, StartingPointsCount}) => {
    const [showingDepartures, setshowingDepartures] = useState(true);

    if (result === null) {
        return null;
    }

    const uniqueOrigins = [...new Set(result.map(f => f.origin))];
    
    return (
        <div id="results-container" className="results-container" ref={refResult}>
            <ResultsHeader 
                destination={destination} 
                StartingPointsCount={StartingPointsCount} 
                showingDepartures={showingDepartures} 
                setshowingDepartures={setshowingDepartures}
            />
            {uniqueOrigins.map((origin, index) => (
                <StartingPointCard 
                    key={index}
                    startingPoint={origin} 
                    flights={result.filter(flight => flight.origin === origin)} 
                />
            ))}
        </div>
    );
}