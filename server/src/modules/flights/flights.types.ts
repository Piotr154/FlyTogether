export interface Flight {
    id: string;

    origin: string;
    originCity?: string;
    requestedOrigin?: string;
    destination: string;
    destinationCity?: string;
    destinationCityCode?: string;

    outboundDepartureTime: string; // departure and arrival time in UTC not local time 
    outboundArrivalTime: string;

    inboundDepartureTime: string;
    inboundArrivalTime: string;

    price: number;
    outboundDuration: number;
    inboundDuration: number;
    airline: string;
    deep_link: string;
}

export interface SearchFlightQuery {
    from: string;
    to: string;
    outboundDateStart: string;
    outboundDateEnd?: string | undefined;
    inboundDateStart?: string | undefined; // the earliest date to return
    inboundDateEnd?: string | undefined; // the latest date to return
    nightsInDestFrom?: number | undefined; // minimum nights to stay on the place
    nightsInDestTo?: number | undefined; // maximum nights to stay
    maxStopovers?: number | undefined; 
}

export interface CommonDestination {
    destination: string;
    totalPrice: number;
    flights: Flight[];
}