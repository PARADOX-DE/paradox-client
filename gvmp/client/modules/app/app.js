import apps from "./apps"
import Component from "../components/component"

class App extends Component {
    constructor(name, ...events) {
        super(name, ...events)
        apps.apps.set(name, this)
    }
}

export default App
