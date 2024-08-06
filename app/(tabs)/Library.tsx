import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import color from '../../constants/MyColor';
import PlayListInputModal from '../../components/PlayListInputModal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioContext } from "../context/AudioProvider";
import PlayListDetail from "../../components/PlayListDetail";
import { AntDesign } from '@expo/vector-icons';

const PlayList = () => {
    const { playListPageHelp, setPlayListPageHelp, addToPlayListPageHelp, setAddToPlayListPageHelp } = useContext(AudioContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [selectedPlayList, setSelectedPlayList] = useState(null);

    const createPlayList = async (playListName) => {
        const result = await AsyncStorage.getItem('playList');
        let updatedList = [];
        if (result !== null) {
            updatedList = JSON.parse(result);
        }

        const audios = [];
        if (addToPlayListPageHelp) {
            audios.push(addToPlayListPageHelp);
        }
        const newList = {
            id: Date.now(),
            title: playListName,
            audios: audios
        };

        updatedList.push(newList);
        setAddToPlayListPageHelp(null);
        setPlayListPageHelp(updatedList);
        await AsyncStorage.setItem('playList', JSON.stringify(updatedList));
        setModalVisible(false);
    };

    const renderPlayList = async () => {
        const result = await AsyncStorage.getItem('playList');
        if (result === null) {
            const defaultPlayList = {
                id: Date.now(),
                title: 'My Favorite',
                audios: []
            };
            const newPlayList = [defaultPlayList];
            setPlayListPageHelp(newPlayList);
            await AsyncStorage.setItem('playList', JSON.stringify(newPlayList));
        } else {
            setPlayListPageHelp(JSON.parse(result));
        }
    };

    useEffect(() => {
        renderPlayList();
    }, []);

    const handleBannerPress = async (playList) => {
        if (addToPlayListPageHelp) {
            const result = await AsyncStorage.getItem('playList');
            let oldList = [];
            if (result !== null) {
                oldList = JSON.parse(result);
            }

            const updatedPlayList = oldList.map(item => {
                if (item.id === playList.id) {
                    const audioExists = item.audios.find(audio => audio.id === addToPlayListPageHelp.id);
                    if (audioExists) {
                        Alert.alert('Found Same Audio', `${addToPlayListPageHelp.filename} is already inside the list`);
                    } else {
                        item.audios.push(addToPlayListPageHelp);
                    }
                }
                return item;
            });

            setPlayListPageHelp(updatedPlayList);
            await AsyncStorage.setItem('playList', JSON.stringify(updatedPlayList));
            setAddToPlayListPageHelp(null);
        }

        setSelectedPlayList(playList);
        setDetailVisible(true);
    };

    const deletePlayList = async (id) => {
        const result = await AsyncStorage.getItem('playList');
        let updatedList = [];
        if (result !== null) {
            updatedList = JSON.parse(result).filter(item => item.id !== id);
        }

        setPlayListPageHelp(updatedList);
        await AsyncStorage.setItem('playList', JSON.stringify(updatedList));
    };

    return (
        <View style={styles.container}>
            <View style={styles.favoriteMain}>
                <Text style={styles.favoriteMainMessage}>My Favorite</Text>
            </View>
            <FlatList
                data={playListPageHelp}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={
                    <TouchableOpacity onPress={() => handleBannerPress({
                        id: 'static-id',
                        title: 'My Favorite',
                        audios: []
                    })}>
                    </TouchableOpacity>
                }
                renderItem={({ item }) => (
                    <View style={styles.playListContainer}>
                        <TouchableOpacity style={styles.playListBanner} onPress={() => handleBannerPress(item)}>
                            <Text style={styles.message}>{item.title}</Text>
                            <Text style={styles.audioCount}>{item.audios.length} Song{item.audios.length !== 1 ? 's' : ''}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePlayList(item.id)}>
                            <AntDesign name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
                ListFooterComponent={
                    <>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{ marginTop: 1, backgroundColor: 'black', padding: 1 }}>
                            <Text style={styles.playListBTN}>+ Add New PlayList</Text>
                        </TouchableOpacity>
                        <PlayListInputModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            onSubmit={createPlayList}
                        />
                    </>
                }
                contentContainerStyle={styles.container}
            />
            {selectedPlayList && (
                <PlayListDetail
                    visible={detailVisible}
                    onClose={() => setDetailVisible(false)}
                    playList={selectedPlayList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        paddingVertical: 20,
        backgroundColor: 'black',
    },
    favoriteMain: {
        backgroundColor: 'black',
        padding: 10,
        marginBottom: 1,
        borderWidth: 1,
        borderColor: 'white',
        borderTopWidth: 0, // Remove top border
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteMainMessage: {
        fontSize: 16,
        color: '#ffffff',
    },
    favoriteMainAudioCount: {
        color: '#020000',
    },
    playListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    playListBanner: {
        flex: 1,
        padding: 20,
        color: '#000000',
        borderRadius: 20,
        marginRight: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    message: {
        color: '#FFFFFF',
    },
    audioCount: {
        marginTop: 3,
        opacity: 0.5,
        color: '#FFFFFF',
        fontSize: 14,
    },
    playListBTN: {
        color: color.MAIN_COLOR,
        letterSpacing: 1,
        fontWeight: 'bold',
        fontSize: 14,
        padding: 5,
    },
});

export default PlayList;
