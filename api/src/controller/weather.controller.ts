import type { Request, Response } from 'express';

import { getWeather as _getWeather } from '../services/weather.service.js';

export const getWeather = async (request: Request, response: Response) => {
    try {
        const lat = Number(request.params.lat);
        const lon = Number(request.params.lon);

        const weather = await _getWeather({latitude: lat, longitude: lon});
        response.status(200).json(weather);
    } catch (error) {
        response.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
}