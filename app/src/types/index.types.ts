export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface SelectedCity {
    name: string;
    country: string;
    coordinates: Coordinates;
}