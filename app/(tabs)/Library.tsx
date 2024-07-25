import {View, Text, StyleSheet, TextInput, Image, FlatList} from 'react-native'
import React from 'react'

const library = [
    { id: '1', title: 'Album 1', artist: 'Artist 1', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134416.png?raw=true' },
    { id: '2', title: 'Album 2', artist: 'Artist 2', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134416.png?raw=true' },
    { id: '3', title: 'Album 3', artist: 'Artist 3', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134416.png?raw=true' },
    // Add more library here
];

export default function Albums() {
    const renderItem = ({ item }) => (
        <View style={styles.albumItem}>
            <Image source={{ uri: item.image }} style={styles.albumImage} />
            <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{item.title}</Text>
                <Text style={styles.albumArtist}>{item.artist}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Albums</Text>
            <FlatList
                data={library}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 10,
    },
    header: {

        marginTop: 30,
        padding: 10,
        color: '#fff',
        fontSize: 24,
        marginVertical: 20,
        textAlign: 'center', // Center the text horizontally
    },
    albumItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    albumImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    albumInfo: {
        flex: 1,
        marginLeft: 10,
    },
    albumTitle: {
        color: '#fff',
        fontSize: 18,
    },
    albumArtist: {
        color: '#888',
        fontSize: 14,
    },
});