import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from "@react-native-community/slider";
import Sound from 'react-native-sound';
import {router} from "expo-router";


const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Sound | null>(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    const playPause = () => {
        if (sound) {
            if (isPlaying) {
                sound.pause();
            } else {
                sound.play(() => {
                    setIsPlaying(false);
                    setPosition(0);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const onSliderValueChange = (value) => {
        if (sound) {
            sound.setCurrentTime(value * duration);
            setPosition(value * duration);
        }
    };

    useEffect(() => {
        if (sound) {
            const interval = setInterval(() => {
                sound.getCurrentTime((seconds) => setPosition(seconds));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [sound]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={30} color="#fff" onPress={()=>router.push('/Home')} />
                <Text style={styles.headerTitle}>Lofi Lofi</Text>
                <Icon name="ellipsis-vertical" size={30} color="#fff" />
            </View>

            <Image
                source={{ uri: 'https://github.com/Randika9991/React_native_project/blob/main/imagess/2151179004.jpg?raw=true' }}
                style={styles.albumCover}
            />

            <View style={styles.songDetails}>
                <Text style={styles.songTitle}>grainy days</Text>
                <Text style={styles.artist}>moody.</Text>
            </View>

            <View style={styles.controls}>
                <Slider
                    style={styles.seekBar}
                    value={position / duration}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#ff00f2"
                    maximumTrackTintColor="#E91E63"
                    thumbTintColor="#ff00f2"
                    onValueChange={onSliderValueChange}
                />
                <View style={styles.timeRow}>
                    <Text style={styles.time}>{formatTime(position)}</Text>
                    <Text style={styles.time}>{formatTime(duration)}</Text>
                </View>

                <View style={styles.playbackControls}>
                    <Icon name="play-back" size={30} color="#fff" />
                    <TouchableOpacity style={styles.playButton} onPress={playPause}>
                        <Icon name={isPlaying ? "pause" : "play"} size={40} color="#fff" />
                    </TouchableOpacity>
                    <Icon name="play-forward" size={30} color="#fff" />
                </View>
            </View>
        </View>
    );
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    header: {
        marginTop: 30,
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
        backgroundColor: '#ff00f2',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Player;


