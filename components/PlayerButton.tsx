import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import color from '../constants/MyColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const PlayerButton = (props) => {
    const {
        iconType,
        size = 40,
        iconColor = color.FONT,
        otherProps,
        onPress
    } = props
    const getIconName = (type) => {
        switch (type) {
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircleo';
            case 'NEXT':
                return 'forward';
            case 'PREV':
                return 'banckward'; // corrected typo
            case 'STOP':
                return 'stop';
            default:
                return 'questioncircleo';
        }
    };

    return iconType === 'STOP' ? (
        <FontAwesome
            {...props}
            onPress={onPress}
            name={getIconName(iconType)}
            size={size}
            color={iconColor}
        />
    ) : (
        <AntDesign
            {...props}
            onPress={onPress}
            name={getIconName(iconType)}
            size={size}
            color={iconColor}
        />
    );
};

export default PlayerButton;
