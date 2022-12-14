import Window from '../../windows/window'
import peds from "../../peds/peds"

class TuningWindow extends Window {
    constructor() {
        super('Tuning')

        this.setCurserVisible(true)
        this.setChatVisible(false)
        this.forwardableEvents.add('responseTuningModlist')
    }

    onEvent(name, ...args) {
        if (name === 'cursor') {
            this.setCurserVisible(args[0][0])
        }
            if (name === 'getMaxIndex') {

             peds.disableAllControls(false);
             peds.disabledAll = false;

            var pushi = JSON.parse(args[0][0]);
            var veh = mp.vehicles.atRemoteId(args[0][1]);
            pushi.forEach(x => {
                x.oldval = x.index;
                x.maxindex = (veh != null) ? veh.getNumMods(x.id) : 100;
            });
            this.callOnBrowser(`responseListMods('${JSON.stringify(pushi)}')`)
        }
    }   
}

export default new TuningWindow()