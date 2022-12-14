class BoatModule {
    constructor() {
        setInterval(function () {
            mp.vehicles.forEachInStreamRange((vehicle) => {
                if (mp.game.vehicle.isThisModelABoat(vehicle.model) || mp.game.vehicle.isThisModelAnEmergencyBoat(vehicle.model)) {
                    if (vehicle.isInWater())
                    {
                        vehicle.position.z = mp.game.water.getWaterHeight(vehicle.position.x, vehicle.position.z, vehicle.position.y, vehicle.position.z);
                    }
                }
            })
        }, 100);
    }
}

export default new BoatModule()