import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link } from "expo-router";

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/login/2151414321.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="person-outline" size={20} color="#fff" style={styles.icon} />
                        <TextInput placeholder="Username" placeholderTextColor="#fff" style={styles.input} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="mail-outline" size={20} color="#fff" style={styles.icon} />
                        <TextInput placeholder="Email" placeholderTextColor="#fff" style={styles.input} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
                        <TextInput placeholder="Password" placeholderTextColor="#fff" secureTextEntry style={styles.input} />
                    </View>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Link href="/Home">SINGUP</Link>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>Already have an account?
                        <TouchableOpacity>
                            <Link style={styles.loginLink} href="/LoginScreen">Sign In</Link>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        width: 300,
        height: 330,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    signUpButton: {
        width: 130,
        height: 40,
        backgroundColor: '#ff00f2',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginVertical: 20,
    },
    loginText: {
        color: '#fff',
        marginBottom: 270,
    },
    loginLink: {
        color: '#ffa500',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
