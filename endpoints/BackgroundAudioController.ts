import { Audio } from 'expo-av';

export default class BackgroundAudioController {
    constructor() {
        this._playbackInstance = null;
        this._isPlayingNow = false;
    }

    _playbackInstance: any;
    _isPlayingNow: boolean;

    _sound: Audio.Sound;

    async loadNewPlayback(played: boolean) {
        if (this._playbackInstance != null) {
            await this._playbackInstance.unloadAsync()
                .then(() => {
                    console.log('[BackgroundAudioController]: Current BG music had unmounted!');
                });

            this._playbackInstance.setOnPlaybackStatusUpdate(null);
            this._playbackInstance = null;
        }

        const source = require('.././assets/music/lofi-main.wav');
        const initialStatus = {
            shouldPlay: played,
            rate: 1.0,
            shouldCorrectPitch: true,
            volume: 0.8,
            isMuted: false
        };

        this._sound = new Audio.Sound();
        await this._sound.loadAsync(source, initialStatus);

        this._playbackInstance = this._sound;
        this._playbackInstance.setIsLoopingAsync(true);
        this._playbackInstance.playAsync();
    }

    setAudioMode() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
        }).then(() => {
            console.log('[BackgroundAudioController]: Background music is played.');

            this._isPlayingNow = true;
        })
            .catch((err: Error) => {
                console.error('[BackgroundAudioController]: Background music cant be played.', err);
            });
    }

    async unloadBackgroundMusic() {
        await this._playbackInstance.unloadAsync();
        this._isPlayingNow = false;
    }

    setPlaybackVolume(volume: number) {
        this._sound.setVolumeAsync(volume);
    }

    isPlayingNow = () => {
        return this._isPlayingNow;
    }
}
