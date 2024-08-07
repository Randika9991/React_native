import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, ActivityIndicator, View } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../../components/AudioListItem';
import OptionModel from '../../components/OptionModel';
import Screen from '../../components/Screen';
import color from '../../constants/MyColor';
import { Audio } from 'expo-av';
import { pause, play, resume, seekTo, stop } from '../../constants/AudioController';
import { storeAudioForNextOpening } from "../../constants/Helper";
import { useRouter } from 'expo-router';  // Import useRouter hook

const { width: screenWidth } = Dimensions.get('window');

const Songs = () => {
    const router = useRouter();
    const {
        dataProvider,
        audioFiles,
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
        setPlayBackPosition,
        setPlayBackDuration,

        playListPageHelp,
        setPlayListPageHelp,
        addToPlayListPageHelp,
        setAddToPlayListPageHelp,
        loadPreviousAudioPlay

    } = useContext(AudioContext);
    const [isBuffering, setIsBuffering] = useState(false);

    const layoutProvider = useRef(
        new LayoutProvider(
            index => 'NORMAL',
            (type, dim) => {
                dim.width = screenWidth;
                dim.height = 70;
            }
        )
    ).current;

    useEffect(() => {
        return () => {
            if (playbackObj) {
                playbackObj.unloadAsync();
            }
        };
    }, [playbackObj]);

    const handleAudioPress = async (audio) => {
        try {
            if (currentAudio && currentAudio.uri === audio.uri) {
                if (playbackObj) {
                    const status = await playbackObj.getStatusAsync();
                    // console.log('Playback status:', status);

                    if (status.positionMillis === status.durationMillis) {
                        await seekTo(playbackObj, 0);
                        await play(playbackObj);
                        setIsPlaying(true);
                        return;
                    }
                    if (isPlaying) {
                        await pause(playbackObj);
                        const index = audioFiles.findIndex(item => item.uri === audio.uri);
                        setCurrentPlay(index);
                        setCurrentAudioName(audio.filename);
                        setIsPlaying(false);
                        return;
                    } else {
                        await resume(playbackObj);
                        setIsPlaying(true);
                        return;
                    }
                }
            }

            if (playbackObj) {
                await stop(playbackObj);
            }
            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: audio.uri },
                { shouldPlay: true }
            );

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setIsBuffering(status.isBuffering);
                    if (status.isPlaying) {
                        setPlayBackPosition(status.positionMillis);
                        setPlayBackDuration(status.durationMillis);
                    }
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

            if (status.isLoaded) {
                const index = audioFiles.findIndex(item => item.uri === audio.uri);
                setCurrentPlay(index);
                setCurrentAudioName(audio.filename);
                await play(newSound);
                setIsPlaying(true);
                await storeAudioForNextOpening(audio, index, newSound);
            } else {
                console.log("Audio failed to load properly:", status);
            }
        } catch (error) {
            console.log('Error loading audio', error);
        }
    };

    const rowRenderer = (type, data, index, extendedState) => {
        return (
            <AudioListItem
                title={data.filename}
                duration={data.duration}
                onAudioPress={() => handleAudioPress(data)}
                onOptionPress={() => {
                    setModalVisible(true);
                    setSelectedAudio(data);
                }}
                isPlaying={extendedState.currentAudio && extendedState.currentAudio.uri === data.uri && extendedState.isPlaying}
                activeListItem={extendedState.currentPlay === index}
            />
        );
    };

    return (
        <Screen style={styles.container}>
            <RecyclerListView
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
                extendedState={{ isPlaying, currentAudio, currentPlay }}
            />
            {selectedAudio && (
                <OptionModel
                    visible={modalVisible}
                    closeModal={() => setModalVisible(false)}
                    visibleName={selectedAudio.filename}
                    playOptionPage={() => handleAudioPress(selectedAudio)}
                    onPlayListPrss={() => {
                        setAddToPlayListPageHelp(selectedAudio)
                        router.push('/Library')}
                    }
                />
            )}
            {isBuffering && (
                <View style={styles.bufferingIndicator}>
                    <ActivityIndicator size="large" color={color.FONT_LIGHT} />
                </View>
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(10,0,10)',
        flex: 1,
    },
    bufferingIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1,
    },
});

export default Songs;
