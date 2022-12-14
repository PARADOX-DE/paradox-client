import App from "../../app/app"
import browser from "../../browser/browser"

class MarketplaceApp extends App {
    constructor() {
        super("MarketplaceApp")
        this.forwardableEvents.add("responseMarketPlaceCategories")
        this.forwardableEvents.add("responseMyOffers")
        this.forwardableEvents.add("responseMarketPlaceOffers")
    }
}
export default new MarketplaceApp()