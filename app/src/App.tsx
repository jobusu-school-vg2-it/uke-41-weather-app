import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WeatherView from './components/WeatherView';
import CitySearch from './components/CitySearch';

import variables from './variables';

import { SelectedCity } from './types/index.types';


export default function App() {	
	const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);

	return (
		<View style={styles.main}>
			<View style={styles.weatherView}>
				<WeatherView selectedCity={selectedCity} />
			</View>
			<View style={styles.citySearch}>
				<CitySearch onSelectCity={setSelectedCity} />
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	main: {
		backgroundColor: variables.bg1,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	weatherView: {
		flex: 4,
		width: '100%'
	},

	citySearch: {
		flex: 5,
		width: '100%'
	}
});
