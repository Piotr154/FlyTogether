import { StartingPointCard } from './StartingPointCard'

export const SearchResult = ({ refResult, result }) => {
    if (result === null) {
        return null;
    }

    const uniqueOrigins = [...new Set(result.map(f => f.origin))];
    
    return (
        <div id="results-container" className="results-container" ref={refResult}>
            {uniqueOrigins.map((origin, index) => (
                <StartingPointCard 
                    key={index}
                    startingPoint={origin} 
                    flights={result.filter(flight => flight.origin === origin)} 
                />
            ))}
        </div>
    )
}