import React from 'react';

import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="Songs" options={{ headerShown: false }} />
        </Stack>
    );
};
