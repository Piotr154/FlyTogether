import { StartingPointCard } from './StartingPointCard.jsx'
import { ResultsHeader } from './ResultsHeader.jsx';
import '../styles/SearchResult.css';

export const SearchResult = ({ refResult, result, destination, StartingPointsCount}) => {
    if (result === null) {
        return null;
    }

    const uniqueOrigins = [...new Set(result.map(f => f.origin))];
    
    return (
        <div id="results-container" className="results-container" ref={refResult}>
            <ResultsHeader destination={destination} StartingPointsCount={StartingPointsCount}/>
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