import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const Constants = {
    MAX_WIDTH: width,
    MAX_HEIGHT: height,
    CENTER: 25,
    MIN_SIDE: Math.min(width, height),
    PSEUDO_PIXEL: Math.min(width, height) / 50,
    DART_SIZE: Math.min(width, height) / 50
};
