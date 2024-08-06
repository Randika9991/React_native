import React, { useEffect, useRef, useContext } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, FlatList, Dimensions, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../constants/MyColor';
import { AudioContext } from '../app/context/AudioProvider';

const getThumbnailText = (filename) => filename[0];

const convertTime = (minutes) => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = Math.floor(hrs);
        const percent = parseInt(String((hrs % 1) * 100));
        const sec = Math.ceil((60 * percent) / 100);
        return `${minute < 10 ? `0${minute}` : minute}:${sec < 10 ? `0${sec}` : sec}`;
    }
    return '00:00';
};

const PlayListDetail = ({ visible, onClose, playList }) => {
    const { favoritAudioPlayPlayListPage, currentPlay } = useContext(AudioContext);
    const colorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(colorAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentPlay]);

    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [color.FONT_LIGHT, 'rgb(255,0,242)'], // Example colors
    });

    const renderPlayPauseIcon = (isPlaying) => (
        isPlaying
            ? <Entypo name='controller-paus' size={24} color='black' />
            : <Entypo name='controller-play' size={24} color='black' />
    );

    const renderItem = ({ item, index }) => {
        const isPlaying = index === currentPlay;
        return (
            <View>
                <TouchableWithoutFeedback>
                    <View style={styles.audioItemContainer}>
                        <Animated.View style={[styles.thumbnail, { backgroundColor: isPlaying ? backgroundColor : color.FONT_LIGHT }]}>
                            {isPlaying ? renderPlayPauseIcon(isPlaying) : <Text style={styles.thumbnailText}>{getThumbnailText(item.filename)}</Text>}
                        </Animated.View>
                        <TouchableOpacity
                            style={styles.titleContainer}
                            onPress={() => favoritAudioPlayPlayListPage(item, playList, index)}
                        >
                            <Text numberOfLines={1} style={styles.audioItem}>{item.filename}</Text>
                            <Text numberOfLines={1} style={styles.timeText}>{convertTime(item.duration)}</Text>
                        </TouchableOpacity>
                        <View style={styles.rightContainer}>
                            <Entypo
                                onPress={() => console.log("Option pressed for", item.filename)}
                                name="dots-three-vertical"
                                size={18}
                                color={color.FONT_MEDIUM}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.separator} />
            </View>
        );
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.modal}>
                <Text style={styles.title}>{playList.title}</Text>
                <FlatList
                    data={playList.audios}
                    keyExtractor={item => item.id.toString()}
                    extraData={currentPlay}
                    renderItem={renderItem}
                    contentContainerStyle={styles.audioList}
                />
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBg} />
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    modal: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'black',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2000,
        padding: 20,
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: color.FONT,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.FONT_MEDIUM,
        paddingBottom: 10,
    },
    audioList: {
        paddingBottom: 20,
    },
    audioItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    audioItem: {
        fontSize: 16,
        color: color.FONT,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG,
    },
    separator: {
        width: width - 80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        color: color.FONT_LIGHT,
    },
    titleContainer: {
        width: width - 130,
        paddingLeft: 10,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlayListDetail;
