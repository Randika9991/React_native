import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const artists = [
    { id: '1', name: 'Shinedown', image: 'data:image/jpeg;base64,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' },
    { id: '2', name: 'Slipknot', image: 'https://example.com/slipknot.jpg' },
    { id: '3', name: 'Staind', image: 'https://example.com/staind.jpg' },
    { id: '4', name: 'Steven Wilson', image: 'https://example.com/steven_wilson.jpg' },
];

export default function RootLayout() {
    const artist = ({item}) => (
        <View style={styles.artistCard}>
            <Image style={styles.artistImage} source={{uri: item.image}}/>
            <Text style={styles.artistName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon name="menu" size={30} color="#000"/>
                <Text style={styles.headerTitle}>Library</Text>
                <Icon name="search" size={30} />
            </View>

            {/* Artists */}
            <FlatList
                data={artists}
                renderItem={artist}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.artistGrid}
            />

            {/*Navigation Bar Click */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home-outline" size={30} color="#000"/>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="musical-notes-outline" size={30} color="#000"/>
                    <Text style={styles.navText}>Songs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="albums-outline" size={30} color="#000"/>
                    <Text style={styles.navText}>Albums</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="person-outline" size={30} color="#000"/>
                    <Text style={styles.navText}>Artists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="list-outline" size={30} color="#000"/>
                    <Text style={styles.navText}>Playlists</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    artistGrid: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    artistCard: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    artistImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    artistName: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 3,
    },
});


