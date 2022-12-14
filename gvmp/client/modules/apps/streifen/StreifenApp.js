import App from "../../app/app"

class StreifenApp extends App {
    constructor() {
        super("StreifenApp")
        this.forwardableEvents.add("responseStreifenData")
        this.forwardableEvents.add("responseStreifenInfo")
    }
}

export default new StreifenApp()