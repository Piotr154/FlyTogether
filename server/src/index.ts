import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import flightsRouter from './modules/flights/flights.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[LOG]: Recieved request ${req.method} to address ${req.url}`);
    next();
});

app.use('/api/flights', flightsRouter);

app.listen(PORT, () => {
    console.log('Server works on http://localhost:${PORT}');
});