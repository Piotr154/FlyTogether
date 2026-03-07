export const FlightCard = ({ flight }) => {
    const dateOptions = { 
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    }
    const { origin, destination, airline, departureTime, arrivalTime, duration, price, deep_link } = flight;
    const departureDate = new Date(departureTime).toLocaleDateString('en-US', dateOptions);
    const departureExactTime = new Date(departureTime).toLocaleTimeString([],timeOptions);
    const arrivalDate = new Date(arrivalTime).toLocaleDateString('en-US', dateOptions);
    const arrivalExactTime = new Date(arrivalTime).toLocaleTimeString([],timeOptions);
    const durationHoursMinutes = Math.floor(duration / 60)+ "h " + (duration%60 != 0? duration % 60 + "m" : "");
    return (
        <div className="flight-card">
            <div className="flight-details">
                <div className="date-and-airline">
                </div>
                <div className="flight-timeline">
                </div>
            </div>
            <div className="flight-price"></div>
        </div>
    );
};