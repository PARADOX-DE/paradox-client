import Component from "../../components/component"

class Nutrition extends Component {
    constructor() {
        super("Nutrition")
        mp.events.add("responseNutrition", (data) => {
            this.callOnBrowser(`responseNutrition('${data}')`)
        })
    }
}

export default new Nutrition()