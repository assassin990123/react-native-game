import { Audio } from 'expo-av';

export default class BackgroundAudioController {
    constructor() {
        this._playbackInstance = null;
        this._isPlayingNow = false;
    }

    _playbackInstance: any;
    _isPlayingNow: boolean;

    loadNewPlayback = async (played: boolean) => {
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
            volume: 1.0,
            isMuted: false
        };

        const { sound } = await Audio.Sound.createAsync(
            source,
            initialStatus
        );

        this._playbackInstance = sound;
        this._playbackInstance.setIsLoopingAsync(true);
        this._playbackInstance.playAsync();
    }

    setAudioMode = () => {
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
            .catch(err => {
                console.error('[BackgroundAudioController]: Background music cant be played.', err);
            });
    }

    unloadBackgroundMusic = () => {
        this._playbackInstance.unloadAsync();
        this._isPlayingNow = false;
    }

    isPlayingNow = () => {
        return this._isPlayingNow;
    }
}
