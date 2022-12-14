import Component from "../../components/component"

class Fishing extends Component {
    constructor() {
        super("Fishing")

        mp.events.add('showfishing', (fishingstate) => {
            this.callOnBrowser(`showfishing(${fishingstate})`)
        })
        mp.events.add('setAngelState', (angelstate) => {
            this.callOnBrowser(`setAngelState(${angelstate})`)
        })
        mp.events.add('setFishState', (fishstate) => {
            this.callOnBrowser(`setFishState(${fishstate})`)
        })
    }
}

export default new Fishing()