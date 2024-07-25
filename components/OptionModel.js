import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import color from '../constants/MyColor';

const OptionModel = ({ visible, closeModal,visibleName }) => {
    return (
        <>
            {/*<StatusBar hidden/>*/}
            <Modal transparent={true} visible={visible} animationType="slide">
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>
                        {visibleName}
                    </Text>
                    <View style={styles.optionContainer}>
                        <Text style={styles.option}>Play</Text>
                        <Text style={styles.option}>Add to PlayList</Text>
                        {/*<TouchableOpacity onPress={closeModal}>*/}
                        {/*    <Text style={styles.option}>Close</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>

                </View>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBg} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2000,
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG,
    },
});

export default OptionModel;
