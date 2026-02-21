export interface Flight {
    id: string;

    origin: string;
    destination: string;

    outboundDepartureTime: string; // departure and arrival time in UTC not local time 
    outboundArrivalTime: string;

    inboundDepartureTime: string;
    inboundArrivalTime: string;

    price: number;
    duration: number;
    airline: string;
    deep_link: string;
}

export interface SearchFlightQuery {
    from: string;
    to: string;
    outboundDateStart: string;
    outboundDateEnd: string;
    inboundDateStart: string;
}

export interface CommonDestination {
    destination: string;
    totalPrice: number;
    flights: Flight[];
}