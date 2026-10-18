export interface GeoNamesPlace {
    name: string;
    lat: string;
    lng: string;
    countryCode: string;
    countryName: string;
    population: number;
    geonameId: number;
}

export interface GeoNamesApiResponse {
    geonames: GeoNamesPlace[];
    status?: {
        message: string;
        value: number;
    };
}