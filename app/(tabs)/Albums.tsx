import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'

export default function Albums() {
    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.text}>index</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/images/icon.png')}
            />
            <Text style={styles.numberText} href="/profile">{number}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    text: {
        fontSize: 20,
        color: '#ff0000',
        marginBottom: 20,
    },
    numberText: {
        fontSize: 18,
        marginTop: 20,
    },
})
