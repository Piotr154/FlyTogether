import axios from 'axios';
import { Flight, SearchFlightQuery } from './flights.types';


export const SearchFlights = async (query: SearchFlightQuery): Promise<Flight[]> => {
    const options = {
        method: 'GET',
        url: 'https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip',
        params: {
            source: query.from,
            destination: query.to,
            outboundDepartureDateStart: query.date,
            transportTypes: 'FLIGHT',
            currency: 'EUR',
            limit: '1'
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
    } 
    try {
        const response = await axios.request(options);
        console.log("API response:", JSON.stringify(response.data, null, 2));
        const rootData = response.data.data || response.data;
        const apiData = rootData.itineraries;

        if (!apiData || !Array.isArray(apiData)) {
            console.log("No flights for this query");
            return [];
        }

        const flights: Flight[] = apiData.map((item: any) => {
            const outboundSegment = item.outbound?.sectorSegments?.[0]?.segment;
            if (!outboundSegment) return null;
            return {
                id: item.id,                       
                origin: outboundSegment.source?.station?.code,
                destination: outboundSegment.destination?.station?.code,       
                departureTime: outboundSegment.source?.utcTime,
                arrivalTime: outboundSegment.destination?.utcTime,   
                price: parseFloat(item.price?.amount || '0'),              
                duration: Math.floor((item.outbound?.duration || 0) / 60), 
                airline: outboundSegment.carrier?.name || 'Unknown', 
                deep_link: 'https://kiwi.com' + (item.bookingOptions?.edges?.[0]?.node?.bookingUrl || '')
            };
        }).filter((flight: any) => flight !== null) as Flight[];

        return flights;

    } catch (error) {
        console.error('Error when getting flight details:', error);
        return []; 
    }
}
