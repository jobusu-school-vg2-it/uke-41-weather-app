// Uses the searchJSON endpoint from GeoNames to search for the lat/long of any city

import type { Coordinates, ApiRequestParams } from '../types/index.types.js';
import type { GeoNamesPlace, GeoNamesApiResponse } from '../types/locations.types.js';

import { assembleRequestUrl } from './api-utilites.service.js';


async function sendSearchRequest(url: URL): Promise<GeoNamesApiResponse> {
    if (!url) {
        throw new Error("Parameter 'url' must not be empty")
    }

    const response = await fetch(url);

    const data = await response.json() as GeoNamesApiResponse;

    if (data.status) {
        throw new Error(`GeoNames API error: ${data.status.message}`);
    }

    if (!response.ok) {
        throw new Error(`GeoNames HTTP error: ${response.status}`);
    }

    return data;
}


export async function getCitiesFromSearch(search: string, maxResults: number = 5): Promise<GeoNamesPlace[]> {
    if (!search.trim()) { throw new Error("Parameter 'search' must not be empty"); }

    // Uses my own personal account for authentication
    const requestParams: ApiRequestParams[] = [
        ['name', search.trim()],
        ['featureClass', 'P'],
        ['maxRows', String(maxResults)],
        ['orderby', 'population'],
        ['username', 'jobusu']
    ];

    const requestUrl = assembleRequestUrl('https://secure.geonames.org/searchJSON', requestParams);
    const data = await sendSearchRequest(requestUrl);

    const cities = data.geonames as GeoNamesPlace[];
    
    return cities
}