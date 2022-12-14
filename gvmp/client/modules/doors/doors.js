class Doors {
    constructor() {
        mp.events.add('setStateOfClosestDoorOfType', (type, x, y, z, locked, heading, p6) => {
            mp.game.object.setStateOfClosestDoorOfType(type, x, y, z, locked, heading, p6)
        })
    }
}

export default new Doors()