import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import color from '../constants/MyColor';

const Screen = ({ children }) => {
    return (
        <View style={styles.container}>{children}</View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: StatusBar.currentHeight,
    },
});

export default Screen;