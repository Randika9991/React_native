import React from 'react';

import { Stack } from 'expo-router';
import {AudioProvider} from './context/AudioProvider'

export default function RootLayout() {
    return (
        <AudioProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="Loading" options={{ headerShown: false }} />
                <Stack.Screen name="Player" options={{ headerShown: false }} />
            </Stack>
        </AudioProvider>
    );
};
