import { Tabs } from 'expo-router';
import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StyleSheet, View } from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';


export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarStyle: styles.bottomNav,
                }}
            >
                <Tabs.Screen
                    name="Songs"
                    options={{
                        title: 'Songs',
                        tabBarIcon: ({ focused }) => (
                            <Icon name={focused ? 'musical-notes' : 'musical-notes-outline'} size={25} color="#FFF" />
                        ),
                    }}

                />
                <Tabs.Screen
                    name="Home"
                    options={{
                        title: 'Player',
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? 'music-note' : 'music-note-outline'}
                                size={25}
                                color="#FFF"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Library"
                    options={{
                        title: 'Library',
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? 'music-box' : 'music-box-outline'}
                                size={25}
                                color={focused ? '#FFF' : '#fcfcfc'} // Change color based on focus
                            />
                        ),
                    }}
                />


            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Ensures the background color is black
        paddingBottom: 17,
    },
    bottomNav: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'black',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderLeftColor: '#ffffff',
        borderLeftWidth: 1,
        borderRightColor: '#ffffff',
        borderRightWidth: 1,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        overflow: 'hidden', // Ensures child components don't overflow
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 3,
        color: '#ffffff',
    },
});
