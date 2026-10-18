import express from 'express';
const router = express.Router();

import { getWeather } from '../controller/weather.controller.js';

router.get('/coordinate/:lat/:lon', getWeather);

export default router;