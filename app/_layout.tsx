import React from 'react';

import { Stack } from 'expo-router';
import {AudioProvider} from './context/AudioProvider'

export default function RootLayout() {
    return (
        <AudioProvider>
            <Stack>
                <Stack.Screen name="SingUpScreen" options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="Loading" options={{ headerShown: false }} />
                {/*<Stack.Screen name="home" options={{ headerShown: false }} />*/}
                {/*<Stack.Screen name="Songs" options={{ headerShown: false }} />*/}
                <Stack.Screen name="Player" options={{ headerShown: false }} />
            </Stack>
        </AudioProvider>
    );
};
