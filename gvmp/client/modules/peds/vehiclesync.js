
import player from "../player/player"

class VehicleSync {
    constructor() {
        /*
        this.closestStreamingVehicles = []

        mp.events.add('entityStreamOut', (entity) => {
            if (entity.type == "vehicle") {
                let index = this.closestStreamingVehicles.indexOf(entity)

                if(index > -1) {
                    this.closestStreamingVehicles.splice(index, 1)
                }
            }
        })

        var pedsHandler = this

        setInterval(function() {
            if(pedsHandler != null && player.vehicleSync) {
                // Vehicle CloseStreaming
                if(pedsHandler.closestStreamingVehicles != null) {
                    mp.vehicles.forEachInStreamRange(
                        (vehicle) => {
                            if(vehicle.type == "vehicle") {
                                let streamedPlayerPos = vehicle.position
                                let distance = player.getDistance(streamedPlayerPos)
                                if(distance < 80)
                                {ok,
                                    if(!pedsHandler.closestStreamingVehicles.includes(vehicle)) {
                                        mp.events.callRemote("requestVehicleSyncData", vehicle, player.remoteHashKey);
                                        pedsHandler.closestStreamingVehicles.push(vehicle);
                                    }
                                }
                            }
                        }
                    );
                }
            }
        }, 1500)
        */
    }
}

export default new VehicleSync()