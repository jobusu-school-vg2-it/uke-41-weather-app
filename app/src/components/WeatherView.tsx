import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import variables from '../variables';
import { API_BASE_URL } from '../config';
import { SelectedCity } from '../types/index.types';
import { Weather } from '../types/weather.types';

interface WeatherViewProps {
    selectedCity: SelectedCity | null;
}

export default function WeatherView({ selectedCity }: WeatherViewProps) {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedCity) {
            setWeather(null);
            setLoading(false);
            setError(null);
            return;
        }

        const { latitude, longitude } = selectedCity.coordinates;
        let isCurrentRequest = true;

        async function loadWeather() {
            setLoading(true);
            setError(null);
            setWeather(null);

            try {
                const url = `${API_BASE_URL}/weather/coordinate/${latitude}/${longitude}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch weather');
                }

                const data: Weather = await response.json();
                if (isCurrentRequest) {
                    setWeather(data);
                }
            } catch {
                if (isCurrentRequest) {
                    setError('Could not load weather. Please try again.');
                }
            } finally {
                if (isCurrentRequest) {
                    setLoading(false);
                }
            }
        }

        void loadWeather();

        return () => {
            isCurrentRequest = false;
        };
    }, [selectedCity]);

    return(
        <View style={styles.container}>
            <Text style={styles.parentPlaceText}>{selectedCity?.country ?? ''}</Text>
            <Text style={styles.placeText}>{selectedCity?.name ?? ''}</Text>
            {weather && <Text style={styles.temperatureText}>{weather.airTemperature}°</Text>}
            {loading && <Text style={styles.statusText}>Loading weather...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingBottom: 50,

        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    parentPlaceText: {
        color: variables.textMuted,
        fontSize: 20,
        lineHeight: 20
    },

    placeText: {
        color: variables.text,
        fontSize: 48,
        fontWeight: 600,
        lineHeight: 48
    },

    temperatureText: {
        color: variables.text,
        fontSize: 32,
        marginTop: 8
    },

    statusText: {
        color: variables.textMuted
    },

    errorText: {
        color: 'red'
    }
});