import App from "../../app/app"

class BankingAppTransfer extends App {
    constructor() {
        super("BankingAppTransfer")

        this.forwardableEvents.add("responseBankingCap")
    }
}

export default new BankingAppTransfer()