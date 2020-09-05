import { Audio } from 'expo-av';

// Press audio effect.
const clickButtonSound = new Audio.Sound();
clickButtonSound.loadAsync(require('.././assets/music/press-effect.wav')).then(() => console.log('[AudioEffect]: click sound effect loaded!'));

export const clickAudioEffect = () => {
    try {
        clickButtonSound.playAsync().then();
        clickButtonSound.setPositionAsync(0).then();
        clickButtonSound.setRateAsync(3, false).then();
    } catch (err) {
        console.error('[AudioEffect]: cant play audio effect!', err);
    }
}
