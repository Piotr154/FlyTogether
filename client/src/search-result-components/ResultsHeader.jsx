import { SummaryCard } from './SummaryCard.jsx';
import { ResultsFilter } from './ResultsFilter.jsx';
import '../styles/ResultsHeader.css';

export const ResultsHeader = ({destination, StartingPointsCount, showingDepartures, setshowingDepartures}) => {
    return (
        <>
        <div className="results-header">
            <div className="results-header-text-box">
                <span className="results-header-main-text">Flights to {destination}</span>
                <span className="results-header-sub-text">Showing results from {StartingPointsCount} cities</span>
            </div>
            <div className="results-header-buttons-box">
                <button 
                    onClick = {()=>setshowingDepartures(true)}
                    className = {showingDepartures? "results-button-departure-active" : "results-button-departure"}
                >
                    Departure
                </button>
                <button 
                    onClick = {()=>setshowingDepartures(false)}
                    className = {showingDepartures? "results-button-return" : "results-button-return-active"}
                >
                    Return
                </button>
            </div>
        </div>
        <div className="results-summary">
            <SummaryCard title="Best Price" value="$ 272"/>
            <SummaryCard title="Fastest" value="3h 57m"/>
            <SummaryCard title="Total Results" value="6 options"/>
            <div className="results-filters">
                <ResultsFilter/>
                <ResultsFilter/>
            </div>
        </div>
        </>
    );
}