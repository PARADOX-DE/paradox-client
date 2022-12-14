import App from "../../app/app"

class PlateOverviewApp extends App {
    constructor() {
        super("KennzeichenUebersichtApp")
        this.forwardableEvents.add("responsePlateOverview")
    }
}

export default new PlateOverviewApp()
