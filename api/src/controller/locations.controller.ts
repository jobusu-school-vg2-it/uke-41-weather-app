import type { Request, Response } from 'express';

import { getCitiesFromSearch as _getCitiesFromSearch } from '../services/locations.service.js';

export const getCitiesFromSearch = async (request: Request, response: Response) => {
    try {
        const search = request.params.search;
        const cities = await _getCitiesFromSearch(Array.isArray(search) ? search[0] : search);
        response.status(200).json(cities);
    } catch (error) {
        response.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
}