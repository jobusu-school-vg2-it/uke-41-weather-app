import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import SearchResultItem from './SearchResultItem';
import { API_BASE_URL } from '../config';

import variables from '../variables';

import { GeoNamesPlace } from '../types/locations.types';
import { SelectedCity } from '../types/index.types';

interface CitySearchProps {
    onSelectCity: (city: SelectedCity) => void;
}

export default function CitySearch({ onSelectCity }: CitySearchProps) {
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState<GeoNamesPlace[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // If no keystroke is pressed after 1000 miliseconds, send get request and show the results
    useEffect(() => {
        const query = searchText.trim();

        if (!query) {
            setSearchResults([]);
            setLoading(false);
            setError(null);
            return;
        }

        // Set a 1000 milisecond timer
        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `${API_BASE_URL}/locations/city/${encodeURIComponent(query.trim())}`;
                const response = await fetch(url);

                if (!response.ok) { throw new Error('Failed to fetch cities'); }

                const data: GeoNamesPlace[] = await response.json();
                setSearchResults(data);
            } catch (err) {
                setSearchResults([]);
                setError('Could not load cities. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchText]);

    return (
        <View style={styles.citySearchWrapper}>
            <TextInput
                style={styles.citySearch}
                placeholder='Search any city'
                placeholderTextColor={variables.textMuted}
                value={searchText}
                onChangeText={setSearchText}
            />

            {/* Hide the search results if nothing is typed into the search bar */}
            {searchText.trim() !== '' && (
                <View style={styles.citySearchResults}>
                    {loading && <Text style={styles.statusText}>Searching...</Text>}

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {!loading && !error && searchResults.map((city) => (
                        <SearchResultItem
                            key={city.geonameId}
                            name={city.name}
                            country={city.countryName}
                            population={city.population}
                            onPress={() => {
                                onSelectCity({
                                    name: city.name,
                                    country: city.countryName,
                                    coordinates: {
                                        latitude: Number(city.lat),
                                        longitude: Number(city.lng)
                                    }
                                });
                                setSearchText('');
                            }}
                        />
                    ))}

                    {!loading && !error && searchText.trim() !== '' && searchResults.length === 0 && (
                        <Text style={styles.statusText}>No cities found.</Text>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
	citySearchWrapper: {
		width: '100%',
		gap: 6,
		alignItems: 'center'
	},

	citySearch: {
		backgroundColor: variables.bg2,
		color: variables.text,

		width: '80%',	
		paddingVertical: 8,
		paddingHorizontal: 12,

		borderWidth: 1,
		borderColor: variables.border,
		borderRadius: 4,

		fontSize: 18
	},

	citySearchResults: {
		backgroundColor: variables.bg2,

		width: '80%',
		paddingVertical: 8,
		paddingHorizontal: 12,
		gap: 14,

		borderWidth: 1,
		borderColor: variables.border,
		borderRadius: 4
	},

    statusText: {
        color: variables.textMuted
    },

    errorText: {
        color: 'red'
    }
});