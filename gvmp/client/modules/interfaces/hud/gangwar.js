import Component from "../../components/component"

class Gangwar extends Component {
    constructor() {
        super("Gangwar")

        mp.events.add("initializeGangwar", (attackerTeam, defenderTeam, attackerId, defenderId, gangwarTime) => {
            this.callOnBrowser(`initializeGangwar('${attackerTeam}', '${defenderTeam}', '${attackerId}', '${defenderId}', '${gangwarTime}')`)
        })

        mp.events.add("updateGangwarScore", (attackerScore, defenderScore) => {
            this.callOnBrowser(`updateScore('${attackerScore}','${defenderScore}')`)
        })

        mp.events.add("finishGangwar", () => {
            this.callOnBrowser(`finishGangwar()`)
        })
    }
}

export default new Gangwar()