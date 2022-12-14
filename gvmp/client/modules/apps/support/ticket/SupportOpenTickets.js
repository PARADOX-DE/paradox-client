import App from "../../../app/app"

class SupportOpenTickets extends App {
    constructor() {
        super("SupportOpenTickets")
        this.forwardableEvents.add("responseOpenTicketList")
    }
}

export default new SupportOpenTickets()