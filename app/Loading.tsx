import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Text, Animated, Easing } from 'react-native';

const Loading = () => {
    // Animated values
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Animation for rotation
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    // Animation for pulsing text
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    // Rotation interpolation
    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                <ImageBackground
                    source={require('../assets/images/partial-react-logo.png')} // Adjust path if necessary
                    style={styles.logo}
                >
                    <Animated.Text style={[styles.overlayText, { transform: [{ scale: pulseAnim }] }]}>
                        Loading...
                    </Animated.Text>
                </ImageBackground>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Optional: background color for the loading screen
    },
    logo: {
        width: 200, // Adjust size as needed
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: background color for text to make it more readable
        padding: 10,
        borderRadius: 5,
    },
});

export default Loading;
