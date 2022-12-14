import Window from '../../windows/window'

class PaymentMethodsWindow extends Window {
    constructor () {
        super('PaymentMethods')

        this.setCurserVisible(true)
    }
}

export default new PaymentMethodsWindow()
