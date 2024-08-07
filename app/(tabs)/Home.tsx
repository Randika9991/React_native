import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Easing, Animated } from 'react-native';
import Slider from "@react-native-community/slider";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import color from '../../constants/MyColor';
import Screen from '../../components/Screen';
import PlayerButton from '../../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider';
import { pause, play, seekTo, stop } from "../../constants/AudioController";

const { width } = Dimensions.get('window');

const Player = () => {
    const {
        audioFiles,
        selectAudio,
        currentPlay,
        currentAudioName,
        totalAudioCount,
        isPlaying,
        setIsPlaying,
        playbackObj,
        playBackDuration,
        playBackPosition,
        setPlayBackPosition,
        loadPreviousAudioPlay,
        handleStop
    } = useContext(AudioContext);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeAnim.setValue(0); // Reset the animation value to 0
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [currentAudioName]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playbackObj && isPlaying) {
                playbackObj.getStatusAsync().then(status => {
                    if (status.isLoaded) {
                        setPlayBackPosition(status.positionMillis);
                    }
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [playbackObj, isPlaying]);

    const handlePlayPause = async () => {
        try {
            if (playbackObj === null) {
                await loadPreviousAudioPlay();
            } else {
                const status = await playbackObj.getStatusAsync();
                if (status.positionMillis === status.durationMillis) {
                    await seekTo(playbackObj, 0);
                    await play(playbackObj);
                    setIsPlaying(true);
                } else {
                    if (isPlaying) {
                        await pause(playbackObj);
                        setIsPlaying(false);
                    } else {
                        await play(playbackObj);
                        setIsPlaying(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error inside play/pause handler:', error);
        }
    };

    const calculateSeekBar = () => {
        if (playBackPosition !== null && playBackDuration !== null) {
            return playBackPosition / playBackDuration;
        }
        return 0;
    };

    const handleSeekBarChange = async value => {
        try {
            if (playbackObj) {
                const newPosition = value * playBackDuration;
                await seekTo(playbackObj, newPosition);
                setPlayBackPosition(newPosition);
                const status = await playbackObj.getStatusAsync();
                if (status.isPlaying) {
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            }
        } catch (error) {
            console.error('seekTo error:', error);
        }
    };

    const handlePrev = async () => {
        if (playbackObj) {
            const newIndex = currentPlay - 1 < 0 ? audioFiles.length - 1 : currentPlay - 1;
            const prevAudio = audioFiles[newIndex];
            await selectAudio(prevAudio, newIndex);
        }
    };

    const handleNext = async () => {
        if (playbackObj) {
            const newIndex = currentPlay + 1 >= audioFiles.length ? 0 : currentPlay + 1;
            const nextAudio = audioFiles[newIndex];
            await selectAudio(nextAudio, newIndex);
        }
    };

    // Helper function to format time
    const formatTime = millis => {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const removeMp3Extension = (name) => {
        if (name && typeof name === 'string') {
            return name.replace(/\.mp3$/i, '');
        }
        return name;
    };

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{currentPlay + 1}/{totalAudioCount}</Text>
                <View style={styles.midImageContainer}>
                    <MaterialCommunityIcons name="music-circle" size={300} color={isPlaying ? color.MAIN_COLOR : color.FONT_MEDIUM} />
                </View>
                <View style={styles.audioPlayerContainer}>
                    <Animated.Text numberOfLines={1} style={[styles.audioTitle, { opacity: fadeAnim }]}>
                        {removeMp3Extension(currentAudioName)}
                    </Animated.Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(playBackPosition)}</Text>
                    <Text style={styles.timeText}>{formatTime(playBackDuration)}</Text>
                </View>
                <Slider
                    style={{ width, height: 40 }}
                    value={calculateSeekBar()}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#ff00f2"
                    maximumTrackTintColor="#333"
                    thumbTintColor="#ff00f2"
                    onValueChange={handleSeekBarChange}
                />
                <View style={styles.audioContainer}>
                    <PlayerButton onPress={handlePrev} iconType="PREV" size={20}/>
                    <PlayerButton
                        onPress={handlePlayPause}
                        style={{ marginHorizontal: 30 }}
                        iconType={isPlaying ? 'PLAY' : 'PAUSE'}
                    />
                    <PlayerButton onPress={handleNext} iconType="NEXT" size={20}/>
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    audioCount: {
        textAlign: 'right',
        padding: 15,
        color: color.FONT_LIGHT,
        fontSize: 14,
    },
    midImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    audioPlayerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    audioTitle: {
        fontSize: 16,
        color: color.FONT,
        padding: 15,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 40,
        paddingHorizontal: 10,
    },
    timeText: {
        fontSize: 14,
        color: color.FONT,
    },
    audioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
});

export default Player;
