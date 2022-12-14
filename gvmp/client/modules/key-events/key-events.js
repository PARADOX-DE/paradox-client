//Keycodes: https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731

import apps from "../app/apps"
import player from "../player/player"
import windows from "../windows/windows"
import xMenu from "../interfaces/hud/x-menu"
import VehicleEnter from "../vehicle/VehicleEnter"
import playerPanel from "../interfaces/hud/player-panel"
import nMenu from "../interfaces/hud/n-menu"
import antiAFK from "../interfaces/hud/antiafk"
import menu from "../interfaces/hud/menu"
import antiafk from "../interfaces/hud/antiafk"
import vehiclePanel from "../interfaces/hud/vehicle-panel"
import raycast from "../raycast/raycast"
import rappel from "../vehicle/rappel"

mp.events.add("VisibleWindowBug", () => {
    windows.visibleWindow = null;
    if (player.chatFlag) player.setPlayerChatFlag(false);
})

let airArrowDown = false

// Push to talk
let arrowDown = false

let switchSeatTimer = 0;

// Key Events
mp.keys.bind(0x45, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.chatFlag || player.injured) return
    //if (new Date(player.lastInteractE.getTime() + 2500) > new Date()) return
    
    const vehicleEnter = new VehicleEnter()

    let garbagevehicle = vehicleEnter.getClosestGarbageVehicleInRange(10);

    if (garbagevehicle !== null) {
        if(vehicleEnter.calcDist(mp.players.local.position, garbagevehicle.getWorldPositionOfBone(garbagevehicle.getBoneIndexByName('seat_dside_r1'))) < 2 ||
        vehicleEnter.calcDist(mp.players.local.position, garbagevehicle.getWorldPositionOfBone(garbagevehicle.getBoneIndexByName('seat_pside_r1'))) < 2) 
        {
            mp.events.callRemote("Pressed_E_Garbage_Vehicle", garbagevehicle, player.remoteHashKey);
        }
    }

    mp.events.callRemoteUnreliable("Pressed_E", player.remoteHashKey)
    mp.gui.chat.push("Pressed_E")
    //player.lastInteractE = new Date()
    checkInterval()
})

// Pressed L
mp.keys.bind(0x4c, false, () => {
    if (windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_L", player.remoteHashKey)
    mp.gui.chat.push("Pressed_L")
    checkInterval()
})

// F2 handy
mp.keys.bind(0x71, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed || player.isInAir() || !player.allowHandy || player.isCarrying || player.HasRagdall) return

    //Bug beim Einsteigen und Handy zücken
    const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
    if (vehHandle) {
        return;
    }
    
    if (apps.componentVisibleApp["Smartphone"] != null) {
        mp.events.callRemoteUnreliable("Keks", false, player.remoteHashKey)
    } else {
        mp.events.callRemoteUnreliable("Keks", true, player.remoteHashKey)
    }
    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
    checkInterval()
})


// F3 Computer
mp.keys.bind(0x72, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed || player.isInAir() || player.isCarrying || player.HasRagdall) return

    //Bug beim Einsteigen und Laptop zücken
    const vehHandle = mp.players.local.getVehicleIsTryingToEnter();
    if (vehHandle) {
        return;
    }

    if (apps.componentVisibleApp["Computer"] === "ComputerMainScreen") {
        mp.events.callRemoteUnreliable("closeComputer", 1, player.remoteHashKey)
    } else {
        mp.events.callRemoteUnreliable("computerCheck", 1, player.remoteHashKey)
    }
    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
    checkInterval()
})

// F5 Animations Menü
mp.keys.bind(0x74, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed || player.isCarrying || player.HasRagdall) return

    mp.events.callRemoteUnreliable("openAnimationMenu", player.remoteHashKey)
    checkInterval()

    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
});
// F6
mp.keys.bind(0x75, false, () => {
    mp.events.callRemote("showNutrition", player.remoteHashKey)
    playerPanel.displayChange();
});

// F9 Ipad
mp.keys.bind(0x78, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || !player.allowHandy) return

    if (apps.componentVisibleApp["Ipad"] === "IpadMainScreen") {
        mp.events.callRemote("closeComputer", 2, player.remoteHashKey)
    }
    else {
        mp.events.callRemote("computerCheck", 2, player.remoteHashKey)
    }
    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
    checkInterval()
})

// F12 0x7B
mp.keys.bind(0x7B, false, () => {
    if (player.chatFlag) return

    if (windows.visibleWindow == "AdminMenu"){
        mp.events.callRemoteUnreliable("closeAdminMenu", player.remoteHashKey)
    } else {
        mp.events.callRemoteUnreliable("openAdminMenu", player.remoteHashKey)
    }
     
    checkInterval()
})


// F7 Screenshot
mp.keys.bind(0x76, false, () => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hours = today.getHours();
    var currentDay = 'gvmp-' + day + '-' + month + '-' + year + '-' + hours + '-' + minutes + '-' + seconds;
    mp.gui.takeScreenshot(currentDay + '.png', 1, 100, 0);
    mp.game.graphics.notify("Screenshot erstellt.");
    checkInterval()
})

// I Inventory show
mp.keys.bind(0x49, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || player.chatFlag ||
        player.injured || player.tied || player.cuffed || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"]) return
    mp.events.callRemoteUnreliable("requestInventory", player.remoteHashKey)
    checkInterval()
    
    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
})

// Y Key
mp.keys.bind(0x59, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || player.chatFlag ||
        player.injured || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"]) return
    mp.events.callRemote("changeVoiceRange", player.remoteHashKey)
    checkInterval()
})

// T Key
mp.keys.bind(0x54, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || player.chatFlag || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"]) return
    windows.show('Chat')
    mp.gui.cursor.visible = true
    checkInterval()
    
    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
})

// X-Menu
let xDown = false

mp.keys.bind(0x58, true, () => {
    if (player.chatFlag || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || windows.visibleWindow != null) return
    if (!xDown) {
        xDown = true
        let xMenuItems = xMenu.getItems()
        xMenu.setItems(xMenuItems)
    }
    checkInterval()
    
    if(arrowDown) {
        arrowDown = false
        playerPanel.setVoiceRadioActiveType(1)
        mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
        clearAFK()
    }
    if(airArrowDown) {
        airArrowDown = false
        mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
        clearAFK()
    }
})

mp.keys.bind(0x58, false, () => {
    if (player.chatFlag || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || windows.visibleWindow != null) return
    xMenu.setItems([])
    xDown = false
    clearAFK()
})

// Pfeil Rechts/Links
mp.keys.bind(0x27, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || player.chatFlag || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"]) return
    mp.events.callRemote("nextInteractionAnim", 1, player.remoteHashKey)
})
mp.keys.bind(0x25, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || player.chatFlag || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"]) return
    mp.events.callRemote("prevInteractionAnim", 1, player.remoteHashKey)
})

// Push to Talk
mp.keys.bind(0x28, true, () => {
    if (windows.visibleWindow != null || menu.visible == true || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || player.state !== 1) return
    if (!arrowDown) {
        arrowDown = true
        setTimeout(function () { playerPanel.playPPTSound() }, 1000)
        playerPanel.setVoiceRadioActive(true)
        playerPanel.setVoiceRadioActiveType(2)
        mp.events.callRemote("changeSettings", 2, player.remoteHashKey)
    }
    checkInterval()
})

mp.keys.bind(0x28, false, () => {
    if (windows.visibleWindow != null || menu.visible == true || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || !arrowDown) return
    arrowDown = false
    playerPanel.setVoiceRadioActiveType(1)
    mp.events.callRemote("changeSettings", 1, player.remoteHashKey)
    clearAFK()
})


// Push to Talk AIR
mp.keys.bind(0x26, true, () => {
    if (windows.visibleWindow != null || menu.visible == true || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"]) return
    if (!airArrowDown) {
        airArrowDown = true
        mp.events.callRemote("changeAirFunk", 2, player.remoteHashKey)
    }
    checkInterval()
})

mp.keys.bind(0x26, false, () => {
    if (windows.visibleWindow != null || menu.visible == true || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || !airArrowDown) return
    airArrowDown = false
    mp.events.callRemote("changeAirFunk", 1, player.remoteHashKey)
    clearAFK()
})


// Object editor

// 6 (RIGHT)
mp.keys.bind(0x66, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.pos.x += player.buildingspeed
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 4 (LINKS)
mp.keys.bind(0x64, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.pos.x -= player.buildingspeed
        
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 8 (VOR)
mp.keys.bind(0x68, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.pos.y += player.buildingspeed
        
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 2 (ZURÜCK)
mp.keys.bind(0x62, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.pos.y -= player.buildingspeed
        
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 7 (DREHEN+)
mp.keys.bind(0x67, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.rot.z += player.buildingspeed*5

        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 9 (DREHEN-)
mp.keys.bind(0x69, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.rot.z -= player.buildingspeed*5
        
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 1 (hoch)
mp.keys.bind(0x61, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.pos.z += player.buildingspeed
        
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 3 (runter)
mp.keys.bind(0x63, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        player.buildingobject.pos.z -= player.buildingspeed
        
        player.buildingobject.obj = mp.objects.new(player.buildingobject.hash, player.buildingobject.pos,
        {
            rotation: player.buildingobject.rot,
            alpha: 255,
            dimension: mp.players.local.dimension
        });
    }
});

// 0 Bestätigen
mp.keys.bind(0x60, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        mp.events.callRemote("objed_saveobject", player.buildingobject.hash, player.buildingobject.pos.x, player.buildingobject.pos.y, player.buildingobject.pos.z, player.buildingobject.rot.x, player.buildingobject.rot.y, player.buildingobject.rot.z, player.remoteHashKey);
    }
});

// 0 close
mp.keys.bind(0x2E, true, () => {
    if(player.buildingmode === true) {

        player.buildingobject.obj.destroy();

        mp.events.callRemote("objed_close", player.remoteHashKey);
    }
});


// - speed 
mp.keys.bind(0x6D, true, () => {
    if(player.buildingmode === true) {
        player.buildingspeed -= 0.1
        mp.game.graphics.notify("Building Speed verringert. (Aktuell " + player.buildingspeed + ")");
    }
});

// + speed 
mp.keys.bind(0x6B, true, () => {
    if(player.buildingmode === true) {
        player.buildingspeed += 0.1
        mp.game.graphics.notify("Building Speed erhöht. (Aktuell " + player.buildingspeed + ")");
    }
});

// Pressed K
mp.keys.bind(0x4b, false, () => {
    if (windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed) return
    mp.events.callRemote("Pressed_K", player.remoteHashKey)
    mp.gui.chat.push("Pressed_K")
    checkInterval()
})

// U
mp.keys.bind(0x55, false, () => {
    if (mp.players.local.vehicle == null || windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.injured || player.tied || player.cuffed) return
    vehiclePanel.tempomat();
})

//G key
mp.keys.bind(0x47, true, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"]  || player.injured || player.cuffed || player.chatFlag ||
        windows.visibleWindow != null) return

    const vehicleEnter = new VehicleEnter()

    if (mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle) {
        //For further USE SWITCH SEATS need to push Seat to server
        /*
        if (switchSeatTimer == 0 || (Date.now() - switchSeatTimer) >= 3000)
        for (let seat = -1; seat < 10; seat++) {
            if (mp.players.local.vehicle.getPedInSeat(seat) === mp.players.local.handle) {
                if (seat % 2 == 0) {
                    if (mp.players.local.vehicle.isSeatFree(seat - 1)) {
                        mp.players.local.taskShuffleToNextVehicleSeat(mp.players.local.vehicle.handle);
                        switchSeatTimer = Date.now();
                    }
                } else {
                    mp.players.local.taskShuffleToNextVehicleSeat(mp.players.local.vehicle.handle);
                    switchSeatTimer = Date.now();
                }
                break;
            }
        }
        */

    } else {

        const vehicleList = vehicleEnter.getClosestVehiclesInRange(10);

        if (vehicleList.length <= 0) {
            return;
        }

        let lowestDistanceToSeat = 100;
        let closest = null;
        let closestSeat = -1;

        for (var i = 0; i < vehicleList.length; i++) {
            const seatData = vehicleEnter.getClosestVehicleSeat(vehicleList[i]);


            if (seatData["distance"] == null) {
                continue;
            }
            if (seatData["seat"] == null || seatData["seat"] === -1) {
                continue;
            }

            if (seatData["distance"] < lowestDistanceToSeat) {
                closest = vehicleList[i];
                closestSeat = seatData["seat"];
                lowestDistanceToSeat = seatData['distance'];
            }
        }

        if (closest == null || closestSeat == -1 || lowestDistanceToSeat > 4) return;

        vehicleEnter.enter(closest, closestSeat)
    }
    checkInterval()
})

//F
mp.keys.bind(0x46, true, () => {
    checkInterval()
})


// H handsup
mp.keys.bind(0x48, false, () => {
    if (apps.componentVisibleApp["Smartphone"] || player.injured || player.cuffed || player.chatFlag || apps.componentVisibleApp["Ipad"] || 
        apps.componentVisibleApp["Computer"] || windows.visibleWindow != null || player.isInAir() || player.isCarrying || player.HasRagdall) return
    mp.events.callRemoteUnreliable("Pressed_H", player.remoteHashKey)
    checkInterval()
})

// J salute
mp.keys.bind(0x4A, false, () => {
    if (apps.componentVisibleApp["Smartphone"] || player.injured || player.cuffed || player.chatFlag || apps.componentVisibleApp["Ipad"] ||
        apps.componentVisibleApp["Computer"] || windows.visibleWindow != null || player.isInAir() || player.isCarrying || player.HasRagdall) return
    if (mp.players.local.vehicle != null && mp.players.local.isInAnyVehicle(false) && mp.players.local.vehicle.isSirenOn()) {
        mp.events.callRemoteUnreliable("Silent_Sirene", mp.players.local.vehicle, player.remoteHashKey)
    }
    else {
        mp.events.callRemoteUnreliable("Pressed_J", player.remoteHashKey)
    }

    checkInterval()
})

//B key
let fingerDown = false

mp.keys.bind(0x42, true, () => {
    if (windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || windows.visibleWindow != null || player.injured || player.tied || player.cuffed || player.isInAir() || player.isCarrying ) return
        
    if(!player.isInAnyVehicle() && mp.players.local.weapon !== mp.game.joaat('weapon_unarmed')) {
        let obj = raycast.createRaycast()
        if(obj != null) {
            if(obj != null && obj.entity.isAPed()) {
                mp.events.callRemoteUnreliable("Pessed_B_Aiming", obj.entity, player.remoteHashKey)
            }
        }
    }
    else if (!fingerDown) {
        fingerDown = true
        fingerPointing.start()
    }
    checkInterval()
})

mp.keys.bind(0x42, false, () => {
    if (windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || windows.visibleWindow != null || player.injured || player.tied || player.cuffed || player.isInAir() || player.isCarrying ) return
    fingerDown = false
    fingerPointing.stop()
    clearAFK()
})


// F6 - Voice Settings
mp.keys.bind(0x75, false, () => {
    if (player.chatFlag || windows.visibleWindow != null) return
    player.openVoiceSettings = true
    mp.events.callRemote("openVoiceSettings", player.remoteHashKey);
})

mp.keys.bind(0x2D, false, () => {
    if (!checkShortCut(2000)) return;
    mp.events.callRemoteUnreliable("aains", player.remoteHashKey);
    player.shortCutBeingUsed = Date.now();
})

// Num 0
mp.keys.bind(0x60, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_0", player.remoteHashKey)
    checkInterval()
})

// Num 1
mp.keys.bind(0x61, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_1", player.remoteHashKey)
    checkInterval()
})


// Num 2
mp.keys.bind(0x62, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_2", player.remoteHashKey)
    checkInterval()
})

// Num 3
mp.keys.bind(0x63, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_3", player.remoteHashKey)
    checkInterval()
})

// Num 4
mp.keys.bind(0x64, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_4", player.remoteHashKey)
    checkInterval()
})

// Num 6
mp.keys.bind(0x66, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_6", player.remoteHashKey)
    checkInterval()
})

// Num 7
mp.keys.bind(0x67, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_7", player.remoteHashKey)
    checkInterval()
})

// Num 8
mp.keys.bind(0x68, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_8", player.remoteHashKey)
    checkInterval()
})

// Num 9
mp.keys.bind(0x69, false, () => {
    if (player.chatFlag || windows.visibleWindow != null || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_Num_9", player.remoteHashKey)
    checkInterval()
})

//M key
mp.keys.bind(0x4D, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.chatFlag || player.injured || player.tied || player.cuffed) return
    mp.events.callRemoteUnreliable("Pressed_M", player.remoteHashKey)
    mp.gui.chat.push("Pressed_M")
    checkInterval()
})

let nDown = false

// N Menu
mp.keys.bind(0x4E, true, () => {
    if (windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || windows.visibleWindow != null || player.injured || player.tied || player.cuffed || player.isInAir() || player.isCarrying || player.HasRagdall) return
    if (!nDown) {
        nDown = true
        const nMenuItems = nMenu.getItems()
        nMenu.setItems(nMenuItems)
        checkInterval()
    }
})

mp.keys.bind(0x4E, false, () => {
    if (windows.visibleWindow != null || player.chatFlag || apps.componentVisibleApp["Smartphone"] || player.injured || apps.componentVisibleApp["Ipad"] || apps.componentVisibleApp["Computer"] || player.injured || player.tied || player.cuffed || player.isInAir()) return
    nMenu.setItems([])
    nDown = false
    clearAFK()
})

// F8
let cursorVisible = false

mp.keys.bind(0x77, false, () => {
    cursorVisible = !cursorVisible
    mp.gui.cursor.visible = cursorVisible
    clearAFK()
})

// W
mp.keys.bind(0x57, true, () => {
    checkInterval()
})

mp.keys.bind(0x57, false, () => {
    clearAFK()
})

// A
mp.keys.bind(0x41, true, () => {
    checkInterval()
})

mp.keys.bind(0x41, false, () => {
    clearAFK()
})

// S
mp.keys.bind(0x53, true, () => {
    checkInterval()
})

mp.keys.bind(0x53, false, () => {
    clearAFK()
})

// D
mp.keys.bind(0x44, true, () => {
    checkInterval()
})

mp.keys.bind(0x44, false, () => {
    clearAFK()
})

// LeftMouse
mp.keys.bind(0x01, true, () => {
    checkInterval()
})

mp.keys.bind(0x01, false, () => {
    clearAFK()
})

// SpaceBar
mp.keys.bind(0x20, true, () => {
    checkInterval()
})

mp.keys.bind(0x20, false, () => {
    clearAFK()
})

// Shift
mp.keys.bind(0x10, true, () => {
    checkInterval()
})

mp.keys.bind(0x10, false, () => {
    clearAFK()
})


mp.keys.bind(0x46, false, () => {
    clearAFK()
})

// Feature AFK-Tool
var timer;
var checkholdTimer;
var intervalTimer;
let holdtime;
let interval;
let oldinterval;

let x;
let y;
let z;

let min = 120000; //600000
let max = 180000; //1200000
let holdmax = 30000; //1800000

function clearAFK(){
    if(1==2/*!player.gvmpTeamRank*/){
        clearInterval(timer)
        const playerPos = mp.players.local.position;
        x = Math.round(playerPos.x)
        y = Math.round(playerPos.y)
        z = Math.round(playerPos.z)
        let random = min + Math.floor(Math.random() * (max - min + 1))
        clearInterval(timer)
        timer = setInterval(checkAFK,random)
        clearInterval(checkholdTimer)
        holdtime = 0
        checkholdTimer = setInterval(checkHold,1000)
    }
}

function checkHold(){
    holdtime++
}

function checkAFK(){
    if(1==2/*!player.gvmpTeamRank*/){
        if (player.injured || player.cuffed) return
        const playerPos = mp.players.local.position;
        if(Math.round(playerPos.x) != x && holdtime < holdmax || Math.round(playerPos.y) != y && holdtime < holdmax  || Math.round(playerPos.z) != z && holdtime < holdmax ){
            x = Math.round(playerPos.x)
            y = Math.round(playerPos.y)
            z = Math.round(playerPos.z)
        }else{
            let random = min + Math.floor(Math.random() * (max - min + 1))
            clearInterval(timer)
            timer = setInterval(checkAFK,random)
            antiAFK.setVisible()
        }
    }
}

function checkInterval(){
    if(1==2/*!player.gvmpTeamRank*/){
        clearInterval(intervalTimer)
        if(oldinterval == 0 || interval == 0){
            clearAFK()
        }else{
            if(oldinterval != interval){
                oldinterval = interval
                interval = 0
                clearAFK()
            }
        }
        intervalTimer = setInterval(addInterval,500)
    }
}

function addInterval(){
    interval++
}

//KOMMA key
mp.keys.bind(0xBC, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.chatFlag || player.injured || player.tied || player.cuffed || player.isInAir()) return
    if (!checkShortCut()) return;
    mp.events.callRemote("Pressed_KOMMA", player.remoteHashKey)
    player.shortCutBeingUsed = Date.now();
})

//PUNKT key
mp.keys.bind(0xBE, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.chatFlag || player.injured || player.tied || player.cuffed || player.isInAir()) return
    if (!checkShortCut()) return;
    mp.events.callRemote("Pressed_PUNKT", player.remoteHashKey)
    player.shortCutBeingUsed = Date.now();
})

//Q (for heli Rappel) key
mp.keys.bind(0x51, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.chatFlag || player.injured || player.tied || player.cuffed) return
    if (!checkShortCut()) return;
    
    rappel.startRappel();
})

function checkShortCut(time = 4000) {
    if (player.shortCutBeingUsed && (player.shortCutBeingUsed + time) > Date.now()) {
        return false;
    } 
    return true;
}


