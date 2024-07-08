import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function RootLayout() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerLogo}>SLTravelApp</Text>
                <View style={styles.navMenu}>
                    <Text style={styles.navItem}>Destinations</Text>
                    <Text style={styles.navItem}>Tours</Text>
                    <Text style={styles.navItem}>Bookings</Text>
                    <Text style={styles.navItem}>About Us</Text>
                    <Text style={styles.navItem}>Contact</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 TravelApp. All rights reserved.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#6200ea' },
    headerLogo: { fontSize: 24, color: '#01ffff' },
    navMenu: { flexDirection: 'row' },
    navItem: { color: '#fff', marginLeft: 15 },

    footer: { padding: 20, alignItems: 'center', backgroundColor: '#333' },
    footerText: { color: '#fff' },
});

