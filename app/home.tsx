import React from 'react';
import {StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Link} from "expo-router";

const artists = [
    { id: '1', name: 'YOHANI','songName': 'kella', image: 'https://m.media-amazon.com/images/M/MV5BMWRlMTA4ZjktOGE5Mi00NzkxLWIyNGMtZWUyMmQ3MzI2MzI4XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_FMjpg_UX1000_.jpg'},
    { id: '2', name: 'IRAJ','songName': 'kella', image: 'https://lankaonglobe.wordpress.com/wp-content/uploads/2013/05/irajweeraratne.jpg'},
    { id: '3', name: 'EDWARD ','songName': 'kella', image: 'https://cdns-images.dzcdn.net/images/artist/8438b0b18a992c7439b204acc4d1beeb/500x500.jpg'},
    { id: '4', name: 'JAYA SRI','songName': 'kella', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQCdu67eIrSEYXmsm7P8f__KXIVWiLEPJOOigDMK0HU88OupL3t'},
];

const Home = ({ navigation }) => {
    const artist = ({item}) => (
        <View style={styles.artistCard}>
            <Image style={styles.artistImage} source={{uri: item.image}}/>
            <Text style={styles.artistName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/home/2150821824.jpg')}
                style={styles.backgroundImage}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Icon name="menu" size={30} color="#FFF"/>
                    <Text style={styles.headerTitle}>Library</Text>
                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="search" size={30} color="#FFF"/>
                    </TouchableOpacity>
                </View>

                {/* Artists */}
                <FlatList
                    data={artists}
                    renderItem={artist}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.artistGrid}
                />

                <View style={styles.header}>
                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="play-circle" size={30} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Navigation Bar Click */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} >
                        <Icon name="home-outline" size={30} color="#FFF"/>
                        <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} >
                        <Icon name="musical-notes-outline" size={30} color="#FFF"/>
                        <Link href="/Songs" style={styles.navText}>Songs</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="albums-outline" size={30} color="#FFF"/>
                        <Text style={styles.navText}>Albums</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="person-outline" size={30} color="#FFF"/>
                        <Text style={styles.navText}>Artists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="list-outline" size={30} color="#FFF"/>
                        <Text style={styles.navText}>Playlists</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({

    backgroundImage: {
        width: '100%',
        height: '100%',
    },

    // header
    container: {
        flex: 1,
        // backgroundColor: 'rgba(81,85,85,0.99)',
        backgroundColor: 'rgba(51,51,51,0.96)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',//backgroundColor black
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',        //bold
        color:'white',
    },

    //body
    artistGrid: {
        paddingHorizontal: 10,
        paddingTop: 30,

    },

    artistCard: {
        width: 122,    //image size custom
        height: 122,
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    artistImage: {
        width: 130,    //image size custom
        height: 130,
        flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#4b4848',
        borderRadius: 10,
    },

    artistName: {
        width: 122,    //image size custom
        height: 22,
        fontSize: 16,
        textAlign: 'center',
        color:'rgb(9,0,0)',
        borderRadius: 10,
        marginBottom: 5,
    },

    //navBar
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 3,
        color:'#ffffff',
    },
});

export default Home;