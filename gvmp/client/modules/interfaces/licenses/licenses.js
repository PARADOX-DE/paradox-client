import Component from "../../components/component"

class Licenses extends Component {
    constructor() {
        super("Licenses")

        mp.events.add("showLicense", (name, firstaid, gunlicense, driverlicense, trucklicense, motorcyclelicense, boatlicense, flyinglicensea, flyinglicenseb, taxilicense, passengertransportlicense, lawyerlicense, registryofficelicense, gwd, zwd) => {
            this.callOnBrowser(`showLic('${name}', '${firstaid}', '${gunlicense}', '${driverlicense}', '${trucklicense}', '${motorcyclelicense}', '${boatlicense}', '${flyinglicensea}', '${flyinglicenseb}', '${taxilicense}', '${passengertransportlicense}', '${lawyerlicense}', '${registryofficelicense}', '${gwd}', '${zwd}')`)
        })
    }
}

export default new Licenses()