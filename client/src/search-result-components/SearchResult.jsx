import { StartingPointCard } from './StartingPointCard'
import { Button } from '@mantine/core';
import '../styles/SearchResult.css';

export const SearchResult = ({ refResult, result, isSearching, destination }) => {
    if (result === null) {
        return null;
    }
    let searchedDestination;
    useEffect(()=>{
        searchedDestination = "Paris";
    }, [isSearching])

    const uniqueOrigins = [...new Set(result.map(f => f.origin))];
    
    return (
        <div id="results-container" className="results-container" ref={refResult}>
            <div className="results-header">
                <div className="results-header-text-box">
                    <span className="results-header-main-text">Flights to {searchedDestination}</span>
                    <span className="results-header-sub-text">Showing results from 3 cities</span>
                </div> 
                <div className="results-header-buttons-box">
                    <Button className="results-button-departure">
                        Departure
                    </Button>
                    <Button className="results-button-return">
                        Return
                    </Button>
                </div>
            </div>
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