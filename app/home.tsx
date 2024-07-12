import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const playlist = [
    { id: '1', name: 'YOHANI', songName: 'kella masurata dfdfg sgdfgdsgdsfjdngjnjgdgndsngds', image: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/login%20screen.png?raw=true' },
    { id: '2', name: 'IRAJ', songName: 'kella', image: 'https://lankaonglobe.wordpress.com/wp-content/uploads/2013/05/irajweeraratne.jpg' },
    { id: '3', name: 'EDWARD', songName: 'kella', image: 'https://cdns-images.dzcdn.net/images/artist/8438b0b18a992c7439b204acc4d1beeb/500x500.jpg' },
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
                    <View style={styles.playlist}>
                        {playlist.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.playlistCard}>
                                <Image source={{ uri: item.image }} style={styles.playlistImage} />
                                <Text style={styles.playlistLabel}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recently Songs</Text>
                        <Icon name="chevron-forward" size={24} color="#fff" />
                    </View>
                    <View style={styles.playlist}>
                        {playlist.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.playlistCard}>
                                <Image source={{ uri: item.image }} style={styles.playlistImage} />
                                <Text style={styles.playlistLabel}>{item.songName}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
});

export default HomeScreen;
