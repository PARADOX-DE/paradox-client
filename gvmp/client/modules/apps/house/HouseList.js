import App from "../../app/app"

class HouseList extends App {
    constructor() {
        super("HouseList")
        this.forwardableEvents.add("responseTenants")
    }
}

export default new HouseList()