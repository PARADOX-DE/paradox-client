import Window from '../../windows/window'

class RimsWindow extends Window {
    constructor() {
        super('Rims')

        this.setCurserVisible(true)
        this.setChatVisible(false)

        this.forwardableEvents.add('responseTuningRims')
        this.forwardableEvents.add('responseTuningCategoryRims')
    }
}

export default new RimsWindow()