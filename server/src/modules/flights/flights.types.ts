export interface Flight {
    id: string;

    origin: string;
    destination: string;

    departureTime: string; // departure and arrival time in UTC not local time 
    arrivalTime: string;

    price: number;
    duration: number;
    airline: string;
    deep_link: string;
}

export interface SearchFlightQuery {
    from: string;
    to: string;
    date: string;
}