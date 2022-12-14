import App from "../../app/app"

class ExportApp extends App {
    constructor() {
        super("ExportApp")
        this.forwardableEvents.add("responseExports")
    }
}

export default new ExportApp()