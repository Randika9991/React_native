import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAudioForNextOpening = async (audio, index ,newSound) => {
    try {
        await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio, index,newSound }));
    } catch (error) {
        console.log("Error storing audio for next opening", error);
    }
};


import { Audio } from "expo-av";

// export const play = async (playbackObj, uri) => {
//     try {
//         if (uri) {
//             const { sound, status } = await Audio.Sound.createAsync(
//                 { uri },
//                 { shouldPlay: true }
//             );
//             await sound.playAsync();
//             return { sound, status };
//         }
//         await playbackObj.playAsync();
//     } catch (error) {
//         console.log('play error:', error);
//     }
// };
//
// export const pause = async (playbackObj) => {
//     try {
//         await playbackObj.pauseAsync();
//     } catch (error) {
//         console.log('pause error:', error);
//     }
// };
//
// export const resume = async (playbackObj) => {
//     try {
//         await playbackObj.playAsync();
//     } catch (error) {
//         console.log('resume error:', error);
//     }
// };
//
// export const stop = async (playbackObj) => {
//     try {
//         await playbackObj.stopAsync();
//     } catch (error) {
//         console.log('stop error:', error);
//     }
// };
