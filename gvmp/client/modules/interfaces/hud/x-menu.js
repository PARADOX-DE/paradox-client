import Component from "../../components/component"
import player from "../../player/player"
import vehicle from "../../vehicle/vehicle-module"
import flatbed from "../../vehicle/flatbed"
import peds from "../../peds/peds"
import raycast from "../../raycast/raycast"

class XMenu extends Component {
    constructor() {
        super("XMenu")
        this.visible = false
    }

    setItems(items) {
        if(items == null) {
            return
        }

        this.visible = items.length > 0
        this.callOnBrowser(`setDataItems('${JSON.stringify(items)}')`)
        if (this.visible) {
            mp.gui.cursor.visible = true
        } else {
            mp.gui.cursor.visible = false
        }
    }

    // Get menu items
    getItems() {
        if(player.isInAnyVehicle(false)) {
            return vehicle.getVehicleItems()
        }
        else {
            let obj = raycast.createRaycast()

            if(obj != null) {
                let distance = player.getDistance(obj.position)

                if(obj.entity.isAVehicle()) {
                    if (!distance || distance < 0 || distance > 3) {
                        return
                    }

                    return vehicle.getVehicleItems()
                }
                else if(obj.entity.isAPed()) {

                    if (!distance || distance < 0 || distance > 2) {
                        return
                    }

                    return peds.getPlayerMenuItems()
                }
            }

            return null
        }
    }

    switchDpos

    // Call server function
    onEvent(name, ...args) {
        if (name == "select") {
            // In vehicle
            if(player.isInAnyVehicle(false)) {
                if (args[0].id == "donothing") {
                    return
                } else if (args[0].arg == "dposclient") {
                    flatbed.xmenuswitch(args[0].itemId);
                    return
                } else if (args[0].arg == "" || args[0].arg == undefined || args[0].arg.length <= 0) {
                    mp.events.callRemote(args[0].itemId, player.remoteHashKey)
                    return
                } else if(args[0].itemId == "LOCAL_ACTION") {
                    if (args[0].arg == "RadioOff") mp.game.audio.setRadioToStationName("OFF")
                    return
                }
                else mp.events.callRemote(args[0].itemId, args[0].arg, player.remoteHashKey)
            }
            // Not in vehicle
            else {
                let obj = raycast.createRaycast()
                if(obj == null) return

                if(args[0].id == "donothing") {
                    return
                } else if(args[0].arg == "" || args[0].arg == undefined || args[0].arg.length <= 0) {
                    mp.events.callRemote(args[0].itemId, obj.entity, player.remoteHashKey)
                }
                else mp.events.callRemote(args[0].itemId, obj.entity, args[0].arg, player.remoteHashKey)
            }
        }
    }
}

export default new XMenu()
