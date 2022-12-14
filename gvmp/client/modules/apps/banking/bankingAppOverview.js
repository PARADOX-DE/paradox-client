import App from "../../app/app"

class BankingAppOverview extends App {
    constructor() {
        super("BankingAppOverview")

        this.forwardableEvents.add("responseBankingAppOverview")
    }
}

export default new BankingAppOverview()