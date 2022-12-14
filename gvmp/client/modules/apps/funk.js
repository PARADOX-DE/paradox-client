import App from '../app/app'
import playerPanel from '../interfaces/hud/player-panel'

class FunkApp extends App {
    constructor () {
        super('FunkApp')

        this.forwardableEvents.add('responseVoiceSettings')

        mp.events.add('setVoiceRadioActive', (voiceRadio) => {
            playerPanel.setVoiceRadioActive(voiceRadio)
        })

        mp.events.add('voiceRadioActive', (voiceRadioActive) => {
            playerPanel.setVoiceRadioActiveType(voiceRadioActive)
        })
    }

    onEvent (name, ...args) {
        if (name === 'setVoiceRadioActive') {
            playerPanel.setVoiceRadioActive(args[0])
        } else if (name === 'setVoiceRadioActiveType') {
            playerPanel.setVoiceRadioActiveType(args[0])
        }
    }
}

export default new FunkApp()