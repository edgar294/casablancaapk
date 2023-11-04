import Sound from 'react-native-sound'

Sound.setCategory('Playback');

export const playSoundNotification = () => {
    var sound = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());

        // Play the sound with an onEnd callback
        sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });

    sound.play()
    sound.release()
}
