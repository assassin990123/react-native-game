import { Dimensions } from 'react-native';

const Constants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    CENTER: 25,
    MIN_SIDE: Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height),
    PSEUDO_PIXEL: Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height)/50,
    DART_SIZE: Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height)/50
}

export { Constants };