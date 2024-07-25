import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../constants/MyColor';

const getThumbnailText = (filename) => filename[0];

const convertTime = minutes => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
        const sec = Math.ceil((60 * percent) / 100);
        if (parseInt(minute) < 10 && sec < 10) {
            return `0${minute}:0${sec}`;
        }
        if (parseInt(minute) < 10) {
            return `0${minute}:${sec}`;
        }
        if (sec < 10) {
            return `${minute}:0${sec}`;
        }
        return `${minute}:${sec}`;
    }
};

const AudioListItem = ({ title, duration,onOptionPress }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.thumbnailText}>{getThumbnailText(title)}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>
                            {title}
                        </Text>
                        <Text numberOfLines={1} style={styles.timeText}>
                            {convertTime(duration)}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Entypo onPress={onOptionPress} name="dots-three-vertical" size={18} color={color.FONT_MEDIUM} />
                </View>
            </View>
            <View style={styles.separator} />
        </>
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
        backgroundColor: color.FONT_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ff00f2',
        borderRightWidth: 1,
        borderRadius: 25,
       // White border with 50% opacity
        borderWidth: 1,
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
        opacity: 0.9,
        height: 1,
        alignSelf: 'center',
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        color: color.FONT_LIGHT,
    },
});

export default AudioListItem;
