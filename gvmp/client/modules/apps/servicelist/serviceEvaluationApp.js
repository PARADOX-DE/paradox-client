import App from "../../app/app"

class ServiceEvaluationApp extends App {
    constructor() {
        super("ServiceEvaluationApp")
        this.forwardableEvents.add("responseEvaluationService")
    }
}

export default new ServiceEvaluationApp()