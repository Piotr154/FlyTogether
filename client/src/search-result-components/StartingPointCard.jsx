import { FlightCard } from "./FlightCard.jsx";

export const StartingPointCard = ({ startingPoint, flights }) => {
    return (
        <div className="starting-point-card">
            <h3>Wylot z: {startingPoint}</h3>
            {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    )
}