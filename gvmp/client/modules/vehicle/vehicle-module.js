import player from "../player/player"

class VehicleModule {
    constructor() {
        this.lastSireneStateCheck = null;

        this.doorstate = false

        // Menu items for basic players outside the car
        this.menuItemsOutOfCar = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" },
            { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" },
            { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" },
            { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }
        ]
        this.menuItemsOutOfCarCops = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" },
            { label: 'Durchsuchen', description: 'Fahrzeug Durchsuchen', icon: 'img/icons/player/search.png', id: 'REQUEST_VEHICLE_FRISK', arg: "" },
            { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" },
            { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" },
            { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" }
        ]
        // Menu items for dpos outside of the car
        this.menuItemsOutOfCarDpos = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK_OUTSIDE', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR_OUTSIDE', arg: "5" },
            { label: 'Tankstelle', description: 'Betanken Sie das Fahrzeug', icon: 'img/icons/vehicle/gasstation.png', id: 'REQUEST_VEHICLE_FILL_FUEL', arg: "" },
            { label: 'Information', description: 'Informationen zum Fahrzeug', icon: 'img/icons/vehicle/information.png', id: 'REQUEST_VEHICLE_INFORMATION', arg: "" },
            { label: 'Reparieren', description: 'Reparieren Sie das Fahrzeug', icon: 'img/icons/vehicle/repair.png', id: 'REQUEST_VEHICLE_REPAIR', arg: "" },
        ]
        // Menu items for basic players inside a car
        this.menuItemsInCar = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" },
            { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" },
            { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" },
            { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }
        ]
        this.menuItemsInCarCops = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" },
            { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" },
            { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" },
            { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" }
        ]
        // Menu items for dpos inside a car
        this.menuItemsInCarDpos = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" },
            { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" },
            { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" },
            { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" }
        ]
        // FLATBED MENU
        this.menuItemsInCarDposFlatbed = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Schlüssel', description: 'Fahrzeug auf/abschließen', icon: 'img/icons/vehicle/key.png', id: 'REQUEST_VEHICLE_TOGGLE_LOCK', arg: "" },
            { label: 'Rauswerfen', description: 'Wirft jemanden aus dem Fahrzeug', icon: 'img/icons/vehicle/eject.png', id: 'REQUEST_VEHICLE_EJECT', arg: "" },
            { label: 'Kofferraum', description: 'Öffnet/Schließt den Kofferraum', icon: 'img/icons/vehicle/trunk.png', id: 'REQUEST_VEHICLE_TOGGLE_DOOR', arg: "5" },
            { label: 'Motor', description: 'Startet/Stopt den Motor', icon: 'img/icons/vehicle/engine.png', id: 'REQUEST_VEHICLE_TOGGLE_ENGINE', arg: "" },
            { label: 'Radio', description: 'Schaltet das Radio ab', icon: 'img/icons/vehicle/radio.png', id: 'LOCAL_ACTION', arg: "RadioOff" },
            { label: 'Hoch/Runter', description: 'Rampe hoch/runter', icon: 'img/icons/vehicle/UpAndDown.png', id: 'REQUEST_VEHICLE_FlATBED_LOAD_TOGGLE', arg: "dposclient" },
            { label: 'An/Ab', description: 'Seil an/ab', icon: 'img/icons/vehicle/rope.png', id: 'REQUEST_VEHICLE_FlATBED_ROPE_TOGGLE', arg: "dposclient" }
        ]
        let smokeR = -1;
        let smokeG = -1;
        let smokeB = -1;

        /*
        mp.events.add("syncTuning", (vehicle, slot, tuning) => {
            if (vehicle == null) {
                return;
            }
            let obj = vehicle.getExtraColours(1, 1);

            if (parseInt(slot) == 23) {
                if (mp.game.invoke("0x772960298DA26FDB", vehicle.handle, 23) == tuning) {
                    return;
                }
            }

            if (parseInt(slot) == 14 || parseInt(slot) == 16 || parseInt(slot) == 18) {
                vehicle.setMod(parseInt(slot), tuning);
            }
            else if (parseInt(slot) == 22) {
                if (tuning == -1) {
                    vehicle.toggleMod(22, false);
                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                }
                else {
                    vehicle.toggleMod(22, true);
                }
            }
            else if (parseInt(slot) == 46) {
                mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, tuning)
            }
            else if (parseInt(slot) == 80) {
                mp.game.invoke("0xE41033B25D003A07", vehicle.handle, tuning);
            }
            else if (parseInt(slot) == 81) {
                vehicle.setNumberPlateTextIndex(parseInt(tuning));
            }
            else if (parseInt(slot) == 95) {
                smokeR = tuning
            }
            else if (parseInt(slot) == 96) {
                smokeG = tuning
            }
            else if (parseInt(slot) == 97) {
                smokeB = tuning
            }
            else if (parseInt(slot) == 98) {
                vehicle.setExtraColours(tuning, obj.wheelColor);
            }
            else if (parseInt(slot) == 99) {
                vehicle.setExtraColours(obj.pearlescentColor, tuning);
            }
            else if (parseInt(slot) == 1337) {
                    vehicle.setWheelType(tuning);
            }
            else {
                //vehicle.setMod(slot, tuning);
                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(slot), tuning, false)
            }
            if (smokeR != -1 && smokeG != -1 && smokeB != -1) {
                vehicle.toggleMod(20, true)
                if (smokeR == 1 && smokeG == 1 && smokeB == 1) {
                    smokeR = 1
                    smokeG = 1
                    smokeB = 1
                }
                vehicle.setTyreSmokeColor(smokeR, smokeG, smokeB)
                smokeR = -1
                smokeG = -1
                smokeB = -1
            }
        });
        */

        mp.events.add("syncVehicleDoor", (vehicle, door, state) => {
            if (vehicle == null) {
                return;
            }
            
            if (state == true) {
                vehicle.setDoorOpen(door, false, false);
            } else {
                vehicle.setDoorShut(door, false);
            }
        });

        mp.events.add("syncVehicleDoors", (vehicle, doors, state) => {
            if (vehicle == null) {
                return;
            }
            
            if (state == true) {
                doors.forEach(door => {
                    vehicle.setDoorOpen(door, false, false);
                });
            } else {
                doors.forEach(door => {
                    vehicle.setDoorShut(door, false);
                });
            }
        });

        mp.events.add('shuffleseat', (shuffleplayer, seatindex) => {
            if (shuffleplayer.isInAnyVehicle(false)) {
                if (shuffleplayer == null || shuffleplayer.vehicle == null || !shuffleplayer.vehicle.isSeatFree(seatindex)) return;
                shuffleplayer.taskShuffleToNextVehicleSeat(shuffleplayer.vehicle.handle);
            }
        })

        
        setInterval(() => {
            if(mp.players.local.vehicle != null && mp.players.local.isInAnyVehicle(false) && 
                (mp.players.local.vehicle.isSirenOn() != this.lastSireneStateCheck || this.lastSireneStateCheck == null))
            {
                this.lastSireneStateCheck = mp.players.local.vehicle.isSirenOn()    
                mp.events.callRemote("syncSireneStatus", mp.players.local.vehicle, mp.players.local.vehicle.isSirenOn(), mp.players.local.vehicle.isSirenSoundOn(), player.remoteHashKey);
            }
        }, 500)

        mp.events.add('refreshSireneState', async (vehicle, state, sound) => {
            if(vehicle == null || !mp.vehicles.exists(vehicle)) return;
            await mp.game.waitAsync(100);
            if(vehicle == null || !mp.vehicles.exists(vehicle)) return;
            vehicle.setSiren(state);
            vehicle.setSirenSound(sound);
        })

        mp.events.add('entityStreamIn', async (entity) => {
            if(entity != null && entity.type == "vehicle") {
                if (!mp.vehicles.exists(entity))
                    return;

                entity.setInvincible(false)
                await mp.game.waitAsync(100);
                if(entity != null && mp.vehicles.exists(entity) && entity.type == "vehicle") {
                    mp.events.callRemote("requestSireneStatus", entity, player.remoteHashKey);
                }
            }
        });

        /*
        mp.events.add("responseVehicleSyncData", (vehicle, tuning, doorStates, liveryindex) => {
            if (vehicle == null) return
            
            let obj = vehicle.getExtraColours(1,1);
            let pearlColor = obj.pearlescentColor;
            let wheelColor = obj.wheelColor;
            let tireSmokeR = -1;
            let tireSmokeG = -1;
            let tireSmokeB = -1;
            const mods = JSON.parse(tuning);
            for (const mod in mods) {

                if(parseInt(mod) == 14 || parseInt(mod) == 16 || parseInt(mod) == 18)
                {
                    vehicle.setMod(parseInt(mod), mods[mod]);
                }
                else if(parseInt(mod) == 22)
                {
                    if(mods[mod] == -1)
                    {
                        vehicle.toggleMod(22, false);
                        mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255);
                    }
                    else
                    {
                        vehicle.toggleMod(22, true);
                    }
                }
                else if(parseInt(mod) == 46)
                {
                    mp.game.invoke("0x57C51E6BAD752696", vehicle.handle, mods[mod])
                }
                else if(parseInt(mod) == 80)
                {
                    mp.game.invoke("0xE41033B25D003A07", vehicle.handle, mods[mod]);
                }
                else if(parseInt(mod) == 81)
                {
                    vehicle.setNumberPlateTextIndex(mods[mod]);
                }
                else if(parseInt(mod) == 95)
                {
                    tireSmokeR = mods[mod];
                }
                else if(parseInt(mod) == 96)
                {
                    tireSmokeG = mods[mod];
                }
                else if(parseInt(mod) == 97)
                {
                    tireSmokeB = mods[mod];
                }
                else if(parseInt(mod) == 98)
                {
                    pearlColor = mods[mod];
                }
                else if(parseInt(mod) == 99)
                {
                    wheelColor = mods[mod];
                }
                else if (parseInt(mod) == 1337) {
                        vehicle.setWheelType(mods[mod]);
                }
                else
                {
                //vehicle.setMod(parseInt(mod), mods[mod]);
                mp.game.invoke("0x6AF0636DDEDCB6DD", vehicle.handle, parseInt(mod), mods[mod], false)
                }
            }
            vehicle.setExtraColours(pearlColor, wheelColor);
            if(tireSmokeR != -1 || tireSmokeG != -1 || tireSmokeB != -1)
            {
                vehicle.toggleMod(20, true)
                if(smokeR == 1 && smokeG == 1 && smokeB == 1)
                {
                    smokeR = 1
                    smokeG = 1
                    smokeB = 1
                }
                vehicle.setTyreSmokeColor(tireSmokeR, tireSmokeG, tireSmokeB)
            }
            
            const doors = JSON.parse(doorStates);
            for (const door in doors) {
                
                if (doors[door] == true) {
                    vehicle.setDoorOpen(parseInt(door), false, false);
                }
            }

            if(liveryindex > 0) {
                mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
            }

        });*/

    }

    getVehicleItems() {
        if(player.isInAnyVehicle(false)) {
            if (player.team == 16 && player.duty) {
                    return this.menuItemsInCarDposFlatbed
            }
            else if(player.team == 1 && player.duty) {
                return this.menuItemsInCarCops
            }
            else if(player.team == 13 && player.duty) {
                return this.menuItemsInCarCops
            }
            else if(player.team == 5 && player.duty) {
                return this.menuItemsInCarCops
            }
            else {
                return this.menuItemsInCar
            }
        }
        else {
            if(player.team == 16 && player.duty) {
                return this.menuItemsOutOfCarDpos
            }
            else if(player.team == 1 && player.duty) {
                return this.menuItemsOutOfCarCops
            }
            else if(player.team == 13 && player.duty) {
                return this.menuItemsOutOfCarCops
            }
            else if(player.team == 5 && player.duty) {
                return this.menuItemsOutOfCarCops
            }
            else {
                return this.menuItemsOutOfCar
            }
        }
    }
}

export default new VehicleModule()