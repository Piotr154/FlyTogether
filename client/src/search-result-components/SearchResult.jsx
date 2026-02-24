import { StartingPointCard } from './StartingPointCard'
import '../SearchResult.css'

export const SearchResult = ({ result }) => {

    const uniqueOrigins = [...new Set(result.map(f => f.origin))];

    return (
        <div className="results-container">
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