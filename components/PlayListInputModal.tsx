import { View, Modal, TextInput, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import color from '../constants/MyColor';

const PlayListInputModal = ({ visible, onClose ,onSubmit }) => {
    const [playListName, setPlayListName] = useState('');

    function handleOnSubmit() {
        if (!playListName.trim()) {
            // Call onSubmit prop with the playlist name
            setPlayListName('');  // Clear the input field
            onClose();  // Close the modal
        } else {
            onClose();
            setPlayListName('');
            onSubmit(playListName);
        }
    }

    return (
        <Modal visible={visible} animationType='fade' transparent onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter playlist name"
                            placeholderTextColor={'black'}
                            value={playListName}
                            onChangeText={(text => setPlayListName(text))}
                        />
                        <TouchableOpacity onPress={handleOnSubmit} style={styles.submitIcon}>
                            <View style={styles.iconBack}>
                                <AntDesign name="check" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        zIndex: 1,
    },
    iconBack: {

        backgroundColor: color.MAIN_COLOR,
        width: 35,
        height: 35,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2, // Ensures the modal is above the overlay
    },
    inputContainer: {
        width: width - 40,
        padding: 20,
        borderRadius: 20,
        backgroundColor: color.APP_BG,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd', // Uniform border color
        borderWidth: 1, // Uniform border width
    },
    input: {
        padding: 5,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: color.ACTIVE_FONT,
        color: 'black',
        fontSize: 16,
        paddingVertical: 5,
        borderRadius:5,
    },
    submitIcon: {
        padding: 10,
        backgroundColor: color.APP_BG,
        borderRadius: 50,
        marginTop: 15,
    },
});

export default PlayListInputModal;
