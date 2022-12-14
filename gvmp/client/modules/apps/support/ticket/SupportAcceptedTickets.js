import App from "../../../app/app"

class SupportAcceptedTickets extends App {
    constructor() {
        super("SupportAcceptedTickets")
        this.forwardableEvents.add("responseAcceptedTicketList")
    }
}

export default new SupportAcceptedTickets()
