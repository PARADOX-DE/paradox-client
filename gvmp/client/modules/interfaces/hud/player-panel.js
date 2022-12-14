import Component from "../../components/component"
import player from "../../player/player"

class PlayerPanel extends Component {
    constructor() {
        super("PlayerPanel")

        this.displayState = false;
        this.forwardableEvents.add("responsePlaySMSSound")

        mp.events.add('setVoiceType', (voiceRange) => {
            this.callOnBrowser(`voiceRange=${voiceRange}`)
        })
    }

    onReady() {
        this.callOnBrowser(`money=${player.money}`)
        this.callOnBrowser(`wanteds=${player.wanteds}`)
    }

    setMoney(money) {
        this.callOnBrowser(`money=${money}`)
    }

    displayChange() {
        this.displayState = !this.displayState;
        this.callOnBrowser(`state=${this.displayState}`)
    }

    setAirRadio(type) {
        this.callOnBrowser(`airRadioActiveType=${type}`)
    }

    setAirRadioState(state) {
        this.callOnBrowser(`airRadioActive=${state}`)
    }

    setBlackmoney(money) {
        this.callOnBrowser(`blackmoney=${money}`)
    }

    setWanteds(wanteds) {
        this.callOnBrowser(`wanteds=${wanteds}`)
    }

    setVoiceRadio(voiceRadio) {
        this.callOnBrowser(`voiceRadio=${voiceRadio}`)
    }

    setVoiceRadioActive(voiceRadioActive) {
        this.callOnBrowser(`voiceRadioActive=${voiceRadioActive}`)
    }

    playPPTSound() {
        this.callOnBrowser(`playPushToTalkSound()`)
    }

    setVoiceRadioActiveType(type) {
        this.callOnBrowser(`voiceRadioActiveType=${type}`)
    }

    setAduty(aduty) {
        this.callOnBrowser(`aduty=${aduty}`)
    }

    executeDisplay(state) {
        this.callOnBrowser(`state=${state}`)
    }

    setTalking(state) {
        this.callOnBrowser(`talking=${state}`)
    }

    setNutritionEating(state) {
        this.callOnBrowser(`nutritionEating=${state}`)
    }

    setNutritionDrinking(state) {
        this.callOnBrowser(`nutritionDrinking=${state}`)
    }
}

export default new PlayerPanel()
