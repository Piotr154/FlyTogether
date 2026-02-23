import axios from 'axios';
import { CommonDestination, Flight, SearchFlightQuery } from './flights.types';

export const SearchFlights = async (query: SearchFlightQuery): Promise<CommonDestination[]> => {
    // 1. Convert the comma-separated string "WAW,BER" into an array ["WAW", "BER"]
    const origins = query.from.split(',');

    console.log(`Searching for flights to ${query.to} from origins:`, origins);

    const outboundStart = query.outboundDateStart as string;
    const apiFormattedStartDate = `${outboundStart}T00:00:00`;

    const outboundEnd = query.outboundDateEnd ? (query.outboundDateEnd as string) : outboundStart;
    const apiFormattedEndDate = `${outboundEnd}T23:59:59`;

    const inboundStart = query.inboundDateStart as string;

    // 2. Create an array of Promises (each origin gets its own API request)
    const flightRequests = origins.map(async (cityCode) => {
        const options = {
            method: 'GET',
            url: 'https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip',
            params: {
                source: cityCode.trim(), // Remove any accidental spaces
                destination: query.to,
                outboundDepartureDateStart: apiFormattedStartDate,
                outboundDepartureDateEnd: apiFormattedEndDate,
                transportTypes: 'FLIGHT',
                currency: 'EUR',
                limit: '300' // Fetch the top 1 cheapest flights per city
            },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': process.env.RAPIDAPI_HOST
            }
        };

        try {
            const response = await axios.request(options);
            const rootData = response.data.data || response.data;
            const flightsList = rootData.itineraries;

            if (!flightsList || !Array.isArray(flightsList)) {
                console.log(`No valid itineraries found for origin: ${cityCode}`);
                return [];
            }

            // 3. Map the data to our Flight interface (including outbound and inbound)
            return flightsList.map((item: any) => {
                const outboundSegment = item.outbound?.sectorSegments?.[0]?.segment;
                const inboundSegment = item.inbound?.sectorSegments?.[0]?.segment;
                
                // If either outbound or inbound is missing, skip this flight entirely
                if (!outboundSegment || !inboundSegment) return null;

                return {
                    id: item.id,
                    origin: outboundSegment.source?.station?.code,
                    destination: outboundSegment.destination?.station?.code,
                    price: parseFloat(item.price?.amount || '0'),
                    outboundDuration: Math.floor((item.outbound?.duration || 0) / 60),
                    inboundDuration: Math.floor((item.inbound?.duration || 0) / 60),
                    airline: outboundSegment.carrier?.name || 'Unknown',
                    deep_link: `https://www.kiwi.com${item.bookingOptions?.edges?.[0]?.node?.bookingUrl || ''}`,
                    
                    // OUTBOUND dates
                    outboundDepartureTime: outboundSegment.source?.localTime,
                    outboundArrivalTime: outboundSegment.destination?.localTime,
                    
                    // INBOUND dates
                    inboundDepartureTime: inboundSegment.source?.localTime,
                    inboundArrivalTime: inboundSegment.destination?.localTime,
                };
            }).filter((flight: any) => flight !== null) as Flight[];

        } catch (error) {
            console.error(`Error fetching flights from ${cityCode}:`, error);
            return []; // If one city fails, return an empty array so others can succeed
        }
    });

    // 4. EXECUTE: Fire all requests concurrently and wait for all of them to resolve
    const results = await Promise.all(flightRequests);

    // 5. FLATTEN: Merge the array of arrays (e.g., [[WAW_flights], [BER_flights]]) into a single array
    const allFlights = results.flat();

    const destinationMap = new Map<string, Flight[]>();
    for (const flight of allFlights) {
        if (!destinationMap.has(flight.destination)) {
            destinationMap.set(flight.destination, []);
        }

        destinationMap.get(flight.destination)!.push(flight);
    }
    const commonDestinations: CommonDestination[] = [];

    for (const [destCode, flightsToThisDest] of destinationMap.entries()) {
        let everyoneCanFlyHere = true;
        let totalCost = 0;
        const selectedFlights: Flight[] = [];
        
        for (const originCity of origins) {
            const trimmedOrigin = originCity.trim();

            const flightsFromThisOrigin = flightsToThisDest.filter(f => f.origin === trimmedOrigin);

            if (flightsFromThisOrigin.length === 0) {
                everyoneCanFlyHere = false;
                break;
            }

            flightsFromThisOrigin.sort((a, b) => a.price - b.price);
            const cheapestFlight = flightsFromThisOrigin[0]!;
            selectedFlights.push(cheapestFlight);
            totalCost += cheapestFlight.price || 0;
        }

        if (everyoneCanFlyHere) {
            commonDestinations.push({
                destination: destCode,
                totalPrice: totalCost,
                flights: selectedFlights
            });
        }
    } 
    commonDestinations.sort((a, b) => a.totalPrice - b.totalPrice);
    console.log(`MATCHMAKER: Found ${commonDestinations.length} matching destinations!`);

    // 7. Return the results (e.g., top 15 to avoid sending huge payloads)
    return commonDestinations.slice(0, 15);
}