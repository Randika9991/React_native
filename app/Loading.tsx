import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Loading = () => {
    const router = useRouter();

    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Animation for rotation
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/Home');
        }, 1000);

        return () => clearTimeout(timeout);
    }, [router]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/images/login/icons8-loading-48.png')}
                style={[styles.logo, { transform: [{ rotate: rotateInterpolate }] }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151926',
    },
    logo: {
        width: 50,
        height: 50,
    },
});

export default Loading;
