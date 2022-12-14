import Window from '../../windows/window'
import Camera from '../../utils/bodyCamera'

class CharacterCreator extends Window {
    constructor () {
        super('CharacterCreator')

        this.setCurserVisible(true)
        this.setChatVisible(false)
    }

    onEvent (name, ...args) {
        switch (name) {
            case 'changeCharacterPart':
                let part = args[0],
                    arg  = []

                if (part.method !== 'setFaceFeature') {
                    part.settings.forEach((setting) => {
                        if (String(setting.value) === 'true') {
                            arg.push(true)

                            return
                        }

                        if (String(setting.value) === 'false') {
                            arg.push(false)

                            return
                        }

                        arg.push(parseFloat(setting.value))
                    })

                    mp.players.local[part.method](...arg)

                    return
                }

                // Only float values for setFaceFeature
                for (let i = 0; i < 20; i++) {
                    mp.players.local[part.method](i, parseFloat(part.settings[i].value))
                }

                break
            case 'changeGender':
                mp.players.local.model = args[0]

                break
            case 'moveCam':
                this.moveCam(args[0].offset)

                break
        }
    }

    onReady () {
        this.toInitialZoom(true)
    }

    onClose () {
        Camera.resetBodyCamera()
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     */
    moveCam (heading) {
        Camera.rotateBodyCameraWithParams(heading, 3, 0)
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom (create = false) {
        let player = mp.players.local

        if (create) {
            Camera.createBodyCamera(player.position)
        }

        Camera.flyBodyCameraWithParams(0, 3, 0)
    }
}

export default new CharacterCreator()
