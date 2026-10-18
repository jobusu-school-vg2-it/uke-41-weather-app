// Uses Yr.no's Locationforecast 2.0 endpoint in the compact format.

import { assembleRequestUrl } from './api-utilites.service.js';

import type { Coordinates, ApiRequestParams } from '../types/index.types.js';
import { Weather, YrApiResponse, YrTimeseries } from '../types/weather.types.js';


async function sendRequest(url: URL, headers: HeadersInit): Promise<YrApiResponse> {
    if (!url) {
        throw new Error("Parameter 'url' must not be empty")
    }

    const response = await fetch(url, { headers });

    const data = await response.json() as YrApiResponse;

    if (data.status) {
        throw new Error(`Yr API error: ${data.status.message}`);
    }

    if (!response.ok) {
        throw new Error(`Yr HTTP error: ${response.status}`);
    }

    return data;
}


// Example output: "2026-10-09T12:00:00Z"
function getNearestHourISO(date = new Date()) {
    const msPerHour = 3600 * 1000;
    const roundedTime = Math.round(date.getTime() / msPerHour) * msPerHour;
    return new Date(roundedTime).toISOString().split('.')[0] + 'Z';
}


export async function getWeather(coordinates: Coordinates): Promise<Weather> {
    if (!coordinates) { throw new Error("Parameter 'coordinates' must not be empty"); }

    // Encode the URL with the latitude and longitude of the location we're requesting weather for
    const requestParams: ApiRequestParams[] = [
        ['lat', coordinates.latitude.toFixed(3)],
        ['lon', coordinates.longitude.toFixed(3)]
    ];

    const requestUrl = assembleRequestUrl('https://api.met.no/weatherapi/locationforecast/2.0/compact', requestParams);

    // Set user agent header with my peronal authentication 
    const requestHeaders: HeadersInit = {
        'User-Agent': 'jobusu-weather-app/1.0.0 (https://github.com/Peskyexe)'
    };

    const data = await sendRequest(requestUrl, requestHeaders);

    // Get current time in ISO format
    const currentTime = getNearestHourISO();
    let currentTimeseries: YrTimeseries | undefined;

    // Find the right timeseries in the raw data for the current weather.
    for (const value of data.properties.timeseries) {
        if (value.time === currentTime) {
            currentTimeseries = value;
            break;
        }
    }

    if (!currentTimeseries) {
        throw new Error(`No weather data found for time ${currentTime}`);
    }

    // Format and discard the data that we dont need.
    const weather: Weather = {
        updatedAt: data.properties.meta.updated_at,
        airTemperature: Math.round(currentTimeseries.data.instant.details.air_temperature),
        windSpeed: currentTimeseries.data.instant.details.wind_speed,
        windFromDirection: currentTimeseries.data.instant.details.wind_from_direction,
        symoblCode: currentTimeseries.data.next_1_hours.summary.symbol_code,
        precipiationAmount: currentTimeseries.data.next_1_hours.details.precipitation_amount
    };

    return weather;
}