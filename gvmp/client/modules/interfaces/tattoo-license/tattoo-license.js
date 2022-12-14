import Window from '../../windows/window'

class TattooLicenseShopWindow extends Window {
    constructor () {
        super('TattooLicenseShop')

        this.setCurserVisible(true)
        this.setChatVisible(false)

        this.forwardableEvents.add('responseLicenseShopZoneLicenses')
    }
}

export default new TattooLicenseShopWindow()