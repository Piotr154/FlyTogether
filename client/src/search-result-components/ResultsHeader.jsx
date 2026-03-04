import { Button } from '@mantine/core';
import { SummaryCard } from './SummaryCard.jsx';
import { ResultsFilter } from './ResultsFilter.jsx';
import '../styles/ResultsHeader.css';

export const ResultsHeader = ({destination, StartingPointsCount}) => {
    return (
        <>
        <div className="results-header">
            <div className="results-header-text-box">
                <span className="results-header-main-text">Flights to {destination}</span>
                <span className="results-header-sub-text">Showing results from {StartingPointsCount} cities</span>
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