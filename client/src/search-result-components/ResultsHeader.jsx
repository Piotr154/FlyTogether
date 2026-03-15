import { useEffect } from 'react';
import { SummaryCard } from './SummaryCard.jsx';
import { Filter } from './Filter.jsx';
import { SortBy } from './SortBy.jsx';
import '../styles/ResultsHeader.css';

export const ResultsHeader = ({
    destination, 
    StartingPoints, 
    StartingPointsCount, 
    showingDepartures, 
    setShowingDepartures, 
    startingPointFilter, 
    setStartingPointFilter, 
    sortFlightsBy, 
    setSortFlightsBy, 
    filteredFlights}) => {

        useEffect(() => {
            setStartingPointFilter([]);
            setSortFlightsBy("Departure Time");
        }, [showingDepartures]);

        const totalResults = filteredFlights.length;
        const bestPrice = totalResults > 0 ? Math.min(...filteredFlights.map(flight => flight.price)): 0;
        const shortestDuration = totalResults > 0 ? Math.min(...filteredFlights.map(flights => flights.duration)) : 0;
        const formatDuration = (minutes) => {
            const h = Math.floor(minutes / 60);
            const m = minutes % 60;
            return `${h}h ${m > 0 ? m + "m" : ""}`;
        };
            
    return (
        <>
        <div className="results-header">
            <div className="results-header-text-box">
                <span className="results-header-main-text">Flights to {destination}</span>
                <span className="results-header-sub-text">Showing results for {StartingPointsCount} {StartingPointsCount===1?"city":"cities"}</span>
            </div>
            <div className="results-header-buttons-box">
                <button 
                    onClick = {()=>setShowingDepartures(true)}
                    className = {showingDepartures? "results-button-departure-active" : "results-button-departure"}
                >
                    Departure
                </button>
                <button 
                    onClick = {()=>setShowingDepartures(false)}
                    className = {showingDepartures? "results-button-return" : "results-button-return-active"}
                >
                    Return
                </button>
            </div>
        </div>
        <div className="results-summary">
            <SummaryCard title="Best Price" value={totalResults > 0 ? `$ ${bestPrice}` : "-"}/>
            <SummaryCard title="Fastest" value={totalResults > 0 ? formatDuration(shortestDuration) : "-"}/>
            <SummaryCard title="Total Results" value={totalResults>0 ? `${totalResults} ${totalResults===1? "option" : "options"}` : "-"}/>
            <div className="results-filters">
                <Filter
                    filter={startingPointFilter}
                    data = {StartingPoints}
                    startingPointFilter={startingPointFilter}
                    setStartingPointFilter={setStartingPointFilter}
                />
                <SortBy
                    SortFlightsBy = { sortFlightsBy }
                    setSortFlightsBy = { setSortFlightsBy }
                    data = {["Departure Time", "Best Price", "Shortest Duration"]}
                />
            </div>
        </div>
        </>
    );
}