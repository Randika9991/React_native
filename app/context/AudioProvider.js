import React, { createContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {storeAudioForNextOpening} from "../../constants/Helper";
import {pause, play, resume, seekTo, stop} from "../../constants/AudioController";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [permissionError, setPermissionError] = useState(false);
    const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => r1.id !== r2.id));
    const [totalAudioCount, setTotalAudioCount] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [playbackObj, setPlaybackObj] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlay, setCurrentPlay] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [playBackPosition, setPlayBackPosition] = useState(null);
    const [playBackDuration, setPlayBackDuration] = useState(null);

    //this array help playListPage
    const [playListPageHelp, setPlayListPageHelp] = useState([]);
    const [addToPlayListPageHelp, setAddToPlayListPageHelp] = useState(null);


    const [currentPlayListDetail, setCurrentPlayListDetail] = useState(null);

    const [currentAudioName, setCurrentAudioName] = useState(null);

    useEffect(() => {
        getPermission();
    }, []);

    useEffect(() => {
        setDataProvider(dataProvider.cloneWithRows(audioFiles));
    }, [audioFiles]);

    useEffect(() => {
        loadPreviousAudio();
    }, [audioFiles]);

    const permissionAlert = () => {
        Alert.alert(
            "Permission Required",
            "This app needs to read audio files!",
            [
                { text: 'I am ready', onPress: () => getPermission() },
                { text: 'Cancel', onPress: () => permissionAlert() }
            ]
        );
    };

    const getPermission = async () => {
        try {
            const permission = await MediaLibrary.getPermissionsAsync();
            if (permission.granted) {
                await getAudioFiles();
            } else if (!permission.granted && permission.canAskAgain) {
                const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'denied' && canAskAgain) {
                    permissionAlert();
                } else if (status === 'granted') {
                    await getAudioFiles();
                } else if (status === 'denied' && !canAskAgain) {
                    setPermissionError(true);
                }
            } else {
                setPermissionError(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAudioFiles = async () => {
        try {
            let media = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.audio,
            });
            media = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.audio,
                first: media.totalCount,
            });
            setTotalAudioCount(media.totalCount);
            setAudioFiles(media.assets);
        } catch (error) {
            console.log(error);
        }
    };

    const loadPreviousAudio = async () => {
        try {
            let previousAudio = await AsyncStorage.getItem('previousAudio');
            if (previousAudio === null) {
                setCurrentAudio(audioFiles[0]);
                setCurrentPlay(0);
            } else {
                previousAudio = JSON.parse(previousAudio);
                setCurrentAudio(previousAudio.audio);
                setCurrentPlay(previousAudio.index);
                setCurrentAudioName(previousAudio.audio.filename)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadPreviousAudioPlay = async () => {
        try {
            let previousAudio = await AsyncStorage.getItem('previousAudio');

            if (previousAudio === null) {
                console.log('No prev audio found.');
                return;
            }

            previousAudio = JSON.parse(previousAudio);

            // Create a new Audio.Sound instance and load the audio
            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: previousAudio.audio.uri },
                { shouldPlay: true }
            );

            setPlayBackPosition(status.positionMillis || 0);
            setPlayBackDuration(status.durationMillis || 0);
            setPlaybackObj(newSound);
            setIsPlaying(true);

            newSound.setOnPlaybackStatusUpdate(status => {
                if (status.isPlaying !== isPlaying) {
                    setIsPlaying(status.isPlaying);
                }
                if (status.positionMillis !== playBackPosition) {
                    setPlayBackPosition(status.positionMillis);
                }
            });

        } catch (error) {
            console.log('Error loading previous audio:', error);
        }
    };

    const selectAudio = async (audio, index) => {
        try {
            if (playbackObj) {
                await playbackObj.unloadAsync();
            }

            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: audio.uri },
                { shouldPlay: true }
            );

            newSound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded) {
                    setPlayBackPosition(status.positionMillis);
                    setPlayBackDuration(status.durationMillis);
                }
                if (!status.isLoaded || status.didJustFinish) {
                    setIsPlaying(false);
                    setCurrentAudio(null);
                    setPlaybackObj(null);
                } else if (status.isLoaded) {
                    setIsPlaying(status.isPlaying);
                }
            });

            setPlaybackObj(newSound);
            setCurrentAudio(audio);
            setCurrentPlay(index);
            setCurrentAudioName(audio.filename);
            setIsPlaying(true);
            await storeAudioForNextOpening(audio, index, newSound);

        } catch (error) {
            console.log('Error selecting audio', error);
        }
    };

    const favoritAudioPlayPlayListPage = async (audio, playList, duration) => {
        try {
            if (currentAudio && currentAudio.uri === audio.uri) {
                if (playbackObj) {
                    const status = await playbackObj.getStatusAsync();
                    if (status.positionMillis === status.durationMillis) {
                        await playbackObj.setPositionAsync(0);
                        await playbackObj.playAsync();
                        setIsPlaying(true);
                        return;
                    }

                    if (isPlaying) {
                        await playbackObj.pauseAsync();
                        setIsPlaying(false);
                        setCurrentPlayListDetail(false)
                    } else {
                        await playbackObj.playAsync();
                        setIsPlaying(true);

                    }
                    return;
                } else {
                    console.log('Playback object is not initialized.');
                }
            }

            if (playbackObj) {
                await playbackObj.unloadAsync();
                setCurrentPlayListDetail(false)
            }

            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: audio.uri },  // Audio URI
                { shouldPlay: true }
            );

            setPlayBackPosition(status.positionMillis || 0);
            setPlayBackDuration(status.durationMillis || 0);
            setPlaybackObj(newSound);
            setIsPlaying(true);
            setCurrentAudioName(audio.filename);
            setCurrentAudio(audio);

            const index = playList.audios.findIndex(item => item.uri === audio.uri);
            setCurrentPlay(index);
            console.log(index)

            setCurrentPlayListDetail(true)

            newSound.setOnPlaybackStatusUpdate(status => {
                if (status.isPlaying !== isPlaying) {
                    setIsPlaying(status.isPlaying);
                }
                if (status.positionMillis !== playBackPosition) {
                    setPlayBackPosition(status.positionMillis);
                }
                if (!status.isLoaded || status.didJustFinish) {
                    setIsPlaying(false);
                    setCurrentAudio(null);
                    setPlaybackObj(null);
                    setCurrentPlay(null);  // Clear currentPlayingId when playback ends
                }
            });

        } catch (error) {
            console.log('Error loading audio:', error);
        }
    };


    const handleStop = async () => {
        try {
            if (playbackObj) {
                await stop(playbackObj);
                setIsPlaying(true);
                setCurrentAudio(null);
                setPlaybackObj(null);
                setPlayBackPosition(0);
                setPlayBackDuration(0);
            }
        } catch (error) {
            console.log('Error stopping audio:', error);
        }
    };

    return (
        <AudioContext.Provider value={{
            audioFiles,
            permissionError,
            dataProvider,
            totalAudioCount,
            selectedAudio,
            setSelectedAudio,
            modalVisible,
            setModalVisible,
            playbackObj,
            setPlaybackObj,
            isPlaying,
            setIsPlaying,
            currentPlay,
            setCurrentPlay,
            currentAudio,
            setCurrentAudio,
            setCurrentAudioName,
            currentAudioName,
            playBackPosition,
            setPlayBackPosition,
            playBackDuration,
            setPlayBackDuration,
            loadPreviousAudio,
            loadPreviousAudioPlay,
            selectAudio,
            handleStop,

            //this array help playListPage
            playListPageHelp,
            setPlayListPageHelp,
            addToPlayListPageHelp,
            setAddToPlayListPageHelp,
            favoritAudioPlayPlayListPage,

            setCurrentPlayListDetail,
            currentPlayListDetail
        }}>
            {permissionError ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Permission to access audio files is required.</Text>
                </View>
            ) : (
                children
            )}
        </AudioContext.Provider>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        padding: 20,
    },
});
