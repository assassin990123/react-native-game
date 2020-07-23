import { Dimensions } from 'react-native';

const Constants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 50,
    CENTER: 25,
    MIN_SIDE: Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height),
    PSEUDO_PIXEL: Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height)/50,
    DART_SIZE: Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height)/50*2,
    SLINGSHOT_SIDE: {x : 85 * Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height)/250, y : 119 * Math.min(Dimensions.get("screen").width,Dimensions.get("screen").height)/250}
}

export { Constants }