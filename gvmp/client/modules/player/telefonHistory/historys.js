import History from "./history"

class Historys {
    constructor() {
        this.historys = new Map()
    }

    addCallToHistory(contact, number, time, accepted, method) {
        this.historys.set(time,new History(contact, number, time, accepted, method))
    }

    toJson() {
        var historys = []
        for(let value of this.historys.values())
        {
            historys.push(value)
        }
        return JSON.stringify(historys)
    }
}

export default Historys
