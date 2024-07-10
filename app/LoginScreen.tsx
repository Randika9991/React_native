import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Link} from "expo-router";

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/login/8656.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <Text style={styles.signInText}>Sign In</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="person-outline" size={20} color="#fff" style={styles.icon} />
                        <TextInput placeholder="Username" placeholderTextColor="#fff" style={styles.input} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
                        <TextInput placeholder="Password" placeholderTextColor="#fff" secureTextEntry style={styles.input} />
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Link href="/home">LOGIN</Link>
                    </TouchableOpacity>
                    <View style={styles.rememberMeContainer}>
                        {/*<CheckBox value={false} style={styles.checkbox} />*/}
                        <Text style={styles.rememberMeText}>Remember me</Text>
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.signUpText}>Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
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
    signInText: {
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
    loginButton: {
        width: 125,
        height: 40,
        backgroundColor: '#ffa500',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginVertical: 20,
    },
    loginButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    checkbox: {
        marginRight: 10,
    },
    rememberMeText: {
        color: '#fff',
    },
    forgotPasswordText: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
    signUpText: {
        color: '#fff',
        marginTop: 20,
    },
    signUpLink: {
        color: '#ffa500',
        fontWeight: 'bold',
    },
});
