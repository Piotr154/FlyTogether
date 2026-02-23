import { Request, Response } from 'express';
import { SearchFlights } from './flights.service';
import  { SearchFlightQuery } from './flights.types';

export const getFlights = async (req: Request, res: Response) => {
    try {
        const { from, to, outboundDateStart, outboundDateEnd, inboundDateStart, inboundDateEnd, nightsInDestFrom, nightsInDestTo } = req.query;

        if (!from) {
            res.status(400).json({
                success: false,
                message: "Choose the city of departure"
            });
            return;
        }

        if (!to) {
            res.status(400).json({
                success: false,
                message: "Choose your destination"
            });
            return;
        }

        if (!outboundDateStart) {
            res.status(400).json({
                success: false,
                message: "Choose date of departure"
            });
            return;
        }

        if (!inboundDateStart && !nightsInDestFrom) {
            res.status(400).json({
                success: false,
                message: "You must provide either a return date or a number of nights"
            });
            return;
        }

        const query: SearchFlightQuery = {
            from: from as string,
            to: to as string,
            outboundDateStart: outboundDateStart as string,
            outboundDateEnd: outboundDateEnd ? (outboundDateEnd as string) : undefined,
            inboundDateStart: inboundDateStart ? (inboundDateStart as string) : undefined,
            inboundDateEnd: inboundDateEnd ? (inboundDateEnd as string) : undefined,
            nightsInDestFrom: nightsInDestFrom ? parseInt(nightsInDestFrom as string, 10) : undefined,
            nightsInDestTo: nightsInDestTo ? parseInt(nightsInDestTo as string, 10) : undefined 
        };

        console.log("Controller: forwarding the query to the service:", query);

        const flights = await SearchFlights(query);

        res.status(200).json({
            success: true,
            count: flights.length,
            data: flights
        });
    } catch (error) {
        console.error("Error in getFlights: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

