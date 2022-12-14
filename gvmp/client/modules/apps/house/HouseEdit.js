import App from "../../app/app"

class HouseEdit extends App {
    constructor() {
        super("HouseEdit")
        this.forwardableEvents.add("responseHouseData")
    }
}

export default new HouseEdit()