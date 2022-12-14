import Window from '../../windows/window'

class AdminWindow extends Window {
    constructor() {
        super('AdminMenu')

        this.setCurserVisible(true)
        this.setChatVisible(false)

        this.forwardableEvents.add('responseAdminMenu')
        this.forwardableEvents.add('responseCloseAdminMenu')
    }
}

export default new AdminWindow()