import React, { useContext, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import AudioListItem from "../../components/AudioListItem";
import OptionModel from "../../components/OptionModel";
import Screen from "../../components/Screen";
import color from '../../constants/MyColor';

const { width } = Dimensions.get('window');

const Songs = () => {
    const { audioFiles } = useContext(AudioContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [nameVisible, setName] = useState(null);

    // Set up DataProvider
    const dataProvider = useRef(
        new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(audioFiles)
    ).current;

    // Set up LayoutProvider
    const layoutProvider = useRef(
        new LayoutProvider(
            index => 'NORMAL', // All items have the same type in this example
            (type, dim) => {
                dim.width = width;
                dim.height = 70; // Adjust height as needed
            }
        )
    ).current;

    // Row renderer
    const rowRenderer = (type, data) => {
        return (
            <AudioListItem
                title={data.filename}
                duration={data.duration}
                onOptionPress={() => {
                    setModalVisible(true);
                    setName(data.filename);
                }}
            />
        );
    };

    return (
        <Screen style={styles.container}>
            <RecyclerListView
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
            />
            <OptionModel visible={modalVisible} closeModal={() => setModalVisible(false)} visibleName={nameVisible}/>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.APP_BG,
    },
});

export default Songs;
