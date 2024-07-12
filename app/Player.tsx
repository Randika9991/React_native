import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from "@react-native-community/slider";

const Player = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={30} color="#fff" />
                <Text style={styles.headerTitle}>Lofi Lofi</Text>
                <Icon name="ellipsis-vertical" size={30} color="#fff" />
            </View>

            <Image
                source={{ uri: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/Screenshot%202024-07-12%20134533.png?raw=true' }}
                style={styles.albumCover}
            />

            <View style={styles.songDetails}>
                <Text style={styles.songTitle}>grainy days</Text>
                <Text style={styles.artist}>moody.</Text>
            </View>

            <View style={styles.controls}>
                <Slider
                    style={styles.seekBar}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#E91E63"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#E91E63"
                />
                <View style={styles.timeRow}>
                    <Text style={styles.time}>0:00</Text>
                    <Text style={styles.time}>2:43</Text>
                </View>

                <View style={styles.playbackControls}>
                    <Icon name="play-back" size={30} color="#fff" />
                    <TouchableOpacity style={styles.playButton}>
                        <Icon name="play" size={40} color="#fff" />
                    </TouchableOpacity>
                    <Icon name="play-forward" size={30} color="#fff" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    albumCover: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
    },
    songDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    songTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    artist: {
        color: '#888',
        fontSize: 18,
    },
    controls: {
        alignItems: 'center',
    },
    seekBar: {
        width: '100%',
        height: 40,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: -10,
    },
    time: {
        color: '#888',
    },
    playbackControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginTop: 20,
    },
    playButton: {
        backgroundColor: '#E91E63',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Player;
