import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../constants/MyColor';

const getThumbnailText = (filename) => filename[0];

const convertTime = (minutes) => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = Math.floor(hrs);
        const percent = parseInt((hrs % 1) * 100);
        const sec = Math.ceil((60 * percent) / 100);
        return `${minute < 10 ? `0${minute}` : minute}:${sec < 10 ? `0${sec}` : sec}`;
    }
    return '00:00';
};

const AudioListItem = ({ title, duration, onOptionPress, onAudioPress, isPlaying, activeListItem }) => {
    const colorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(colorAnim, {
            toValue: isPlaying && activeListItem ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [isPlaying]);

    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [color.FONT_LIGHT, 'rgb(255,0,242)'] // Example colors
    });

    const renderPlayPauseIcon = isPlaying => {
        return !isPlaying ?  <Entypo name='controller-play' size={24} color='black' /> : <Entypo name='controller-paus' size={24} color='black' />;
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onAudioPress}>
                    <View style={styles.leftContainer}>
                        <Animated.View style={[styles.thumbnail, { backgroundColor: backgroundColor }]}>
                            {activeListItem ? renderPlayPauseIcon(isPlaying) : <Text style={styles.thumbnailText}>{getThumbnailText(title)}</Text>}
                        </Animated.View>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>
                                {title}
                            </Text>
                            <Text numberOfLines={1} style={styles.timeText}>
                                {convertTime(duration)}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.rightContainer}>
                    <Entypo onPress={onOptionPress} name="dots-three-vertical" size={18} color={color.FONT_MEDIUM} />
                </View>
            </View>
            <View style={styles.separator} />
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 30,
        marginVertical: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
    titleContainer: {
        width: width - 130,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        color: color.FONT,
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
});

export default AudioListItem;