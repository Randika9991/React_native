export const play = async (playbackObj) => {
    try {
        return await playbackObj.playAsync();
    } catch (error) {
        console.log('Error inside play helper method', error.message);
    }
};

export const pause = async (playbackObj) => {
    try {
        return await playbackObj.pauseAsync();
    } catch (error) {
        console.log('Error inside pause helper method', error.message);
    }
};

export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync();
    } catch (error) {
        console.log('Error inside resume helper method', error.message);
    }
};

export const stop = async (playbackObj) => {
    try {
        await playbackObj.stopAsync();
        return await playbackObj.unloadAsync();
    } catch (error) {
        console.log('Error inside stop helper method', error.message);
    }
};

export const seekTo = async (playbackObj, positionMillis) => {
    try {
        await playbackObj.setPositionAsync(positionMillis);
    } catch (error) {
        console.log('seekTo error:', error);
    }
};

// import { Audio } from "expo-av";

// export const loadAudio = async (playbackObj, uri) => {
//     try {
//         if (playbackObj) {
//             await playbackObj.unloadAsync();
//             const { sound, status } = await Audio.Sound.createAsync(
//                 { uri },
//                 { shouldPlay: false }
//             );
//             await sound.loadAsync();
//             return { sound, status };
//         }
//     } catch (error) {
//         console.log('loadAudio error:', error);
//     }
// };