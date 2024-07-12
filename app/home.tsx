import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Link} from "expo-router";

const playlist = [
    { id: '1', name: 'EDM', songName: 'kella masurata dfdfg sgdfgdsgdsfjdngjnjgdgndsngds', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134416.png?raw=true' },
    { id: '2', name: 'TRAP', songName: 'kella', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134451.png?raw=true' },
    { id: '3', name: 'LO-FI', songName: 'kella', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134533.png?raw=true' },
    { id: '4', name: 'DRILL', songName: 'kella', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134627.png?raw=true' },

];

const Recent = [
    { id: '1', name: 'YOHANI', songName: 'deep', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134416.png?raw=true' },
    { id: '2', name: 'IRAJ', songName: 'lets me', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134627.png?raw=true' },
    { id: '3', name: 'EDWARD', songName: 'kella', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134533.png?raw=true' },
    { id: '4', name: 'TRAP', songName: 'kella', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134451.png?raw=true' },

];

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="menu" size={30} color="#fff" />
                <Text style={styles.headerTitle}>Music player</Text>
                <Icon name="search" size={30} color="#fff" />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Favorites</Text>
                    </View>
                    <View style={styles.favoritplaylist}>
                        <TouchableOpacity style={styles.favoriteCard}>
                            <Image source={require('../assets/images/home/favorite.png')} style={styles.favoriteImageCard} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.favoriteCard}>
                            <Image source={require('../assets/images/home/resent.png')} style={styles.favoriteImageCard} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My playlist</Text>
                        <Icon name="chevron-forward" size={24} color="#fff" />
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
                        {playlist.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.playlistCard}>
                                <Image source={{ uri: item.image }} style={styles.playlistImage} />
                                <Text style={styles.playlistLabel}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recently Songs</Text>
                        <Icon name="chevron-forward" size={24} color="#fff" />
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
                        {Recent.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.playlistCard}>
                                <Image source={{ uri: item.image }} style={styles.playlistImage} />
                                <Text style={styles.playlistLabel}>{item.songName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home-outline" size={30} color="#FFF"/>
                    <Link href="/home" style={styles.navText}>Home</Link>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} >
                    <Icon name="musical-notes-outline" size={30} color="#FFF"/>
                    <Link href="/Songs" style={styles.navText}>Songs</Link>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="albums-outline" size={30} color="#FFF"/>
                    <Text style={styles.navText}>Albums</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 0,
    },
    scrollContainer: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',

    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Favorite
    favoritplaylist: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    favoriteCard: {
        alignItems: 'center',
    },
    favoriteImageCard: {
        width: 170,
        height: 100,
        borderRadius: 10,
    },
    favoriteLabel: {
        color: '#fff',
        marginTop: 5,
    },


    // Playlist
    playlist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    playlistCard: {
        alignItems: 'center',
        marginHorizontal: 10, // Add horizontal margin to create space between items
        width: 100, // Set a fixed width
    },
    playlistImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    playlistLabel: {
        color: '#fff',
        marginTop: 5,
        width: 100,
        textAlign: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderTopColor: '#ffffff',
        borderTopWidth: 1,

        borderLeftColor: '#ffffff',
        borderLeftWidth: 2,

        borderRightColor: '#ffffff',
        borderRightWidth: 2,

        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 3,
        color:'#ffffff',
    },
    horizontalScrollContainer: {
        paddingHorizontal: 5,
    },
});

export default HomeScreen;
