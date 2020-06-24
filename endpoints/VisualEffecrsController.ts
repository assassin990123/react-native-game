import * as Brightness from 'expo-brightness';

export default class VisualEffectsController {
    private _brightness:        number = 0;
    private _defaultBrightness: number = 0;

    private static _instance: VisualEffectsController;

    private constructor() {
        Brightness.getBrightnessAsync().then((currnetBrightness) => {
            this._defaultBrightness = currnetBrightness;
        }).catch(err => console.error('[VisualEffectsController]: Cant get device brightness', err));

        this._brightness = this._defaultBrightness;
    }

    public static getInstance = () => {
        if (!VisualEffectsController._instance) {
            VisualEffectsController._instance = new VisualEffectsController();
        }

        return VisualEffectsController._instance;
    };

    setDefaultParams = async () => {
        const { status } = await Brightness.requestPermissionsAsync();

        if (status === 'granted') {
            Brightness.setSystemBrightnessAsync(this._defaultBrightness);
        } 

        return true;
    };

    currentBrightness = (): number => {
        return Math.floor(this._brightness * 100);
    };

    raiseBrightness = async (): Promise<Boolean> => {
        if (this._brightness >= 1) {
            return false;
        }

        const { status } = await Brightness.requestPermissionsAsync();

        if (status === 'granted') {
            this._brightness += 0.1;
            Brightness.setSystemBrightnessAsync(this._brightness);
        } 
        
        return true;
    };

    lowerBrightness = async (): Promise<Boolean> => {
        if (this._brightness <= 0) {
            return false;
        }

        const { status } = await Brightness.requestPermissionsAsync();

        if (status === 'granted') {
            this._brightness -= 0.1;
            Brightness.setSystemBrightnessAsync(this._brightness);
        } 

        return true;
    };
}


