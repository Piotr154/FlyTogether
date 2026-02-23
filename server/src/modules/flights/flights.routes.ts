import { Router } from 'express';
import { getFlights } from './flights.controller';

const router = Router();

router.get('/search', getFlights);

export default router;