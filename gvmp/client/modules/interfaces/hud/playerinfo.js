import Component from '../../components/component'
import player from '../../player/player'

class PlayerInfo extends Component {
    constructor () {
        super('PlayerInfo')
    }

    onReady () {
        this.callOnBrowser(`setPlayerId(${player.playerId})`)
        this.callOnBrowser(`setVoiceHash("${player.voiceHash}")`)
    }

    setPlayerId (playerId) {
        this.callOnBrowser(`setPlayerId(${playerId})`)
    }

    setVoiceHash (voiceHash) {
        this.callOnBrowser(`setvoiceHash(${voiceHash})`)
    }
}

export default new PlayerInfo()