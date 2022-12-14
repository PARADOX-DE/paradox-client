import App from "../../app/app"

class HitmanContractListApp extends App {
    constructor() {
        super("HitmanContractListApp")
        this.forwardableEvents.add("responseHitmanContracts")
    }
}

export default new HitmanContractListApp()
