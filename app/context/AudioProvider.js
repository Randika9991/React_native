import React, { createContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

// Create the context
export const AudioContext = createContext();

// Create the provider component
export const AudioProvider = ({ children }) => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [permissionError, setPermissionError] = useState(false);

    useEffect(() => {
        getPermission();
    }, []);

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

            setAudioFiles(media.assets);
            console.log(media.assets);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AudioContext.Provider value={{ audioFiles, permissionError }}>
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
