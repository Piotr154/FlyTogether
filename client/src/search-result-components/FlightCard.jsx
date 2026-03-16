import { IconCalendarWeek, IconPlaneTilt, IconPlane, IconClockHour4 } from '@tabler/icons-react';
import { Divider } from '@mantine/core';
import '../styles/FlightCard.css';

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
                <div className="flight-date-and-airline">
                    <div className="flight-date">
                        <IconCalendarWeek className='flight-date-and-airline-icon'/> 
                        {departureDate}
                    </div>
                    <div className="flight-airline">
                        <IconPlaneTilt className='flight-date-and-airline-icon'/>
                        {airline}
                    </div>
                </div>
                <div className="flight-timeline">
                    <div className="flight-departure-section">
                        <span><h2>{departureExactTime}</h2></span>
                        <span className="flight-timeline-subtext">{origin}</span>
                    </div>
                    <div className="flight-duration-section">
                        <div className="flight-duration-bar">
                            <Divider flex={1} color="gray.3" />
                            <IconPlane className="flight-duration-bar-icon"/>
                            <Divider flex={1} color="gray.3" />
                        </div>
                        <span className="flight-timeline-subtext"><IconClockHour4 className="flight-duration-icon"stroke={2}/>{durationHoursMinutes}</span>
                    </div>
                    <div className="flight-return-section">
                        <span><h2>{arrivalExactTime}</h2></span>
                        <span className="flight-timeline-subtext">{destination}</span>
                    </div>
                </div>
            </div>
            <div className="flight-price">
                <h2>${price}</h2>
                <span>per person</span>
                <a href={deep_link} target="_blank">Select</a>
            </div>
        </div>
    );
};