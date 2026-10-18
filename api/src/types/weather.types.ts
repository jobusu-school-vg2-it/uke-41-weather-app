export interface YrTimeseries {
    time: string;
    data: {
        instant: {
            details: {
                air_temperature: number;
                wind_speed: number;
                wind_from_direction: number;
            };
        };
        next_1_hours: {
            summary: {
                symbol_code: string;
            };
            details: {
                precipitation_amount: number;
            };
        };
    };
}

export interface YrApiResponse {
    properties: {
        meta: {
            updated_at: string;
        };
        timeseries: YrTimeseries[];
    };
    status?: {
        message: string;
        value: number;
    };
}

export interface Weather {
    updatedAt: string;
    airTemperature: number;
    windSpeed: number;
    windFromDirection: number;
    symoblCode: string;
    precipiationAmount: number;
}