import Component from "../../components/component"

class Infocard extends Component {
    constructor() {
        super("Infocard")

        mp.events.add("sendInfocard", (content, color, imgSrc, duration, data) => {
            this.callOnBrowser(`pushInfocard('${content}', '${color}', '${imgSrc}', '${duration}', '${data}')`)
        })
    }
}

export default new Infocard()
