import { Divider } from '@mantine/core';
import { FlightCard } from "./FlightCard.jsx";
import { IconMapPin } from '@tabler/icons-react';
import '../styles/StartingPointCard.css';

export const StartingPointCard = ({ startingPoint, flights, showingDepartures, sortFlightsBy }) => {
    let sort_type;
    switch (sortFlightsBy){
        case "Best Price":
            sort_type = (a, b) => a.price - b.price;
        break;
        case "Shortest Duration":
            sort_type = (a, b) => a.duration - b.duration;
        break;
        default:
            sort_type = (a, b) => new Date(a.departureTime) - new Date(b.departureTime);
        break;
    }
        
    return (
        <div className="starting-point-card">
            <div className="starting-point-card-header">
                <IconMapPin
                    color = "rgb(0, 160, 255)"
                />
                <h3>{showingDepartures? "From " : "To "} {startingPoint}</h3>
                <Divider flex={1} color="gray.3" />
                <h4>{flights.length} {flights.length==1? "flight" : "flights"}</h4>
            </div>
            
            {[...flights]
                .sort(sort_type)
                .map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
}