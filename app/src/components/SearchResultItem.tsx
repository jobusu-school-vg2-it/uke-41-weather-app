import { StyleSheet, Text, View, Pressable, GestureResponderEvent } from 'react-native';
import PersonIcon from './icons/PersonIcon';

import variables from '../variables';

interface SearchResultItemProps {
    name: string;
    country: string;
    population: number;
    onPress: (event: GestureResponderEvent) => void;
}

export default function SearchResultItem(props: SearchResultItemProps) {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text style={styles.nameText}>{props.name}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.detailText}>{props.country}</Text>
                </View>
                <View style={styles.detail}>
                    <PersonIcon color={variables.textMuted} size={14}/>
                    <Text style={styles.detailText}>{props.population}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: variables.bg2
    },

    nameText: {
        color: variables.text,
        fontSize: 16,
        fontWeight: 600
    },

    detailsContainer: {
        flexDirection: 'row',
        gap: 10
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    detailText: {
        color: variables.textMuted,
        fontSize: 14,
        lineHeight: 14
    }
});