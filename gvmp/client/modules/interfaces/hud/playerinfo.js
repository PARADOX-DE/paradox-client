import Component from '../../components/component'
import player from '../../player/player'

class PlayerInfo extends Component {
    constructor () {
        super('PlayerInfo')
    }

    onReady () {
      this.callOnBrowser(`setPlayerId(${player.playerId})`)
      this.callOnBrowser(`setPlayerCount(${mp.players.length})`)
      this.callOnBrowser(`setVoiceHash("${player.voiceHash}")`)
    }

    setPlayerId (playerId) {
      this.callOnBrowser(`setPlayerId(${playerId})`)
    }

    setPlayerCount () {
      this.callOnBrowser(`setPlayerCount(${mp.players.length})`)
    }

    setVoiceHash (voiceHash) {
        this.callOnBrowser(`setvoiceHash(${voiceHash})`)
    }
}

export default new PlayerInfo()