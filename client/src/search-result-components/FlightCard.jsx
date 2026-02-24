export const FlightCard = ({flight}) => {
    return (
        <div className="flight-card">
            <h4>{flight.airline}</h4>
            <p>{flight.origin} → {flight.destination}</p>
            <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
            <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p>Duration: {Math.floor(flight.duration / 60)}h {flight.duration % 60}m</p>
            <p>Price: ${flight.price}</p>
            <a href={flight.deep_link} target="_blank" rel="noopener noreferrer">Book Now</a>
        </div>
    )
}