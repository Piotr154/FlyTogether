import { Divider } from '@mantine/core';
import { FlightCard } from "./FlightCard.jsx";
import { IconMapPin } from '@tabler/icons-react';
import '../styles/StartingPointCard.css';

export const StartingPointCard = ({ startingPoint, flights, showingDepartures }) => {
    return (
        <div className="starting-point-card">
            <div className="starting-point-card-header">
                <IconMapPin
                    color = "rgb(0, 160, 255)"
                />
                <h3>{showingDepartures? "From " : "To "} {startingPoint}</h3>
                <Divider flex={1} color="gray.3" />
                <h4>{flights.length} {flights.length>1? "flights" : "flight"}</h4>
            </div>
            
            {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
}