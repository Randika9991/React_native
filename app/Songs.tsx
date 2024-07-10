import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {Link} from "expo-router";

const Songs = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/home/2150821824.jpg')}
                style={styles.backgroundImage}
            >
                {/* Header */}


                {/* Artists */}



                {/* Navigation Bar Click */}
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
};


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

export default Songs;
