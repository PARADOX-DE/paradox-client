//pside = rechts
//dside = links
/*
door_pside_f,   //Door right, front  
door_dside_r,   //Door left, back  
door_pside_r,   //Door right, back  */

class VehicleEnter {

    calcDist(v1, v2) 
    {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
    }
    
    getClosestVehicleSeat(vehicle) {
                
        let enableBoneDebugging = false;

        let returnData = [];

        const driverSeatId = -1; // CHANGE THIS AS THE DRIVER INDEX CHANGES
        const playerPos = mp.players.local.position;

        if (mp.game.vehicle.isThisModelABike(vehicle.model)) {
            if (vehicle.isSeatFree(0)) {
                this.teleport = false;
                returnData['seat'] = 0;
                returnData['distance'] = this.calcDist(playerPos, vehicle.position);
                return returnData;
            }
            else {
                returnData['seat'] = -1;
                returnData['distance'] = 100;
                return returnData;
            }
        }
        
        // Seat Bones (connected to the... leg bone)
        // const seatFrontDriver = vehicle.getBoneIndexByName('seat_dside_f');
        const seatRear = vehicle.getBoneIndexByName('seat_r');
        const seatFrontPassenger = vehicle.getBoneIndexByName('seat_pside_f');
        const seatRearDriver = vehicle.getBoneIndexByName('seat_dside_r');
        const seatRearDriver1 = vehicle.getBoneIndexByName('seat_dside_r1');
        const seatRearDriver2 = vehicle.getBoneIndexByName('seat_dside_r2');
        const seatRearDriver3 = vehicle.getBoneIndexByName('seat_dside_r3');
        const seatRearDriver4 = vehicle.getBoneIndexByName('seat_dside_r4');
        const seatRearDriver5 = vehicle.getBoneIndexByName('seat_dside_r5');
        const seatRearDriver6 = vehicle.getBoneIndexByName('seat_dside_r6');
        const seatRearDriver7 = vehicle.getBoneIndexByName('seat_dside_r7');
        const seatRearPassenger = vehicle.getBoneIndexByName('seat_pside_r');
        const seatRearPassenger1 = vehicle.getBoneIndexByName('seat_pside_r1');
        const seatRearPassenger2 = vehicle.getBoneIndexByName('seat_pside_r2');
        const seatRearPassenger3 = vehicle.getBoneIndexByName('seat_pside_r3');
        const seatRearPassenger4 = vehicle.getBoneIndexByName('seat_pside_r4');
        const seatRearPassenger5 = vehicle.getBoneIndexByName('seat_pside_r5');
        const seatRearPassenger6 = vehicle.getBoneIndexByName('seat_pside_r6');
        const seatRearPassenger7 = vehicle.getBoneIndexByName('seat_pside_r7');

        // Positions in world
        // const seatFrontDriverPosition = seatFrontDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontDriver);
        const seatRearPosition = seatRear === -1 ? null : vehicle.getWorldPositionOfBone(seatRear);
        const seatFrontPassengerPosition = seatFrontPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatFrontPassenger);
        const seatRearDriverPosition = seatRearDriver === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver);
        const seatRearDriver1Position = seatRearDriver1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver1);
        const seatRearDriver2Position = seatRearDriver2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver2);
        const seatRearDriver3Position = seatRearDriver3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver3);
        const seatRearDriver4Position = seatRearDriver4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver4);
        const seatRearDriver5Position = seatRearDriver5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver5);
        const seatRearDriver6Position = seatRearDriver6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver6);
        const seatRearDriver7Position = seatRearDriver7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearDriver7);
        const seatRearPassengerPosition = seatRearPassenger === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger);
        const seatRearPassenger1Position = seatRearPassenger1 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger1);
        const seatRearPassenger2Position = seatRearPassenger2 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger2);
        const seatRearPassenger3Position = seatRearPassenger3 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger3);
        const seatRearPassenger4Position = seatRearPassenger4 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger4);
        const seatRearPassenger5Position = seatRearPassenger5 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger5);
        const seatRearPassenger6Position = seatRearPassenger6 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger6);
        const seatRearPassenger7Position = seatRearPassenger7 === -1 ? null : vehicle.getWorldPositionOfBone(seatRearPassenger7);

        // Get closest seat
        let closestFreeSeatNumber = -1;
        let seatIndex = driverSeatId;
        let closestSeatDistance = Number.MAX_SAFE_INTEGER;
        let calculatedDistance = null;

        // Inline Rear
        calculatedDistance = seatRearPosition === null ? null : this.calcDist(playerPos, seatRearPosition);
        seatIndex = seatRear === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_r");
            }
        }

        // Side by Side vehicles
        calculatedDistance = seatFrontPassengerPosition === null ? null : this.calcDist(playerPos, seatFrontPassengerPosition);
        seatIndex = seatFrontPassenger === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_f");
            }
        }

        calculatedDistance = seatRearDriverPosition === null ? null : this.calcDist(playerPos, seatRearDriverPosition);
        seatIndex = seatRearDriver === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r");
            }
        }

        calculatedDistance = seatRearPassengerPosition === null ? null : this.calcDist(playerPos, seatRearPassengerPosition);
        seatIndex = seatRearPassenger === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r");
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearDriver1Position === null ? null : this.calcDist(playerPos, seatRearDriver1Position);
        seatIndex = seatRearDriver1 === -1 ? seatIndex : seatIndex + 1; // 3
        if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if(enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_dside_r1");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearPassenger1Position === null ? null : this.calcDist(playerPos, seatRearPassenger1Position);
        seatIndex = seatRearPassenger1 === -1 ? seatIndex : seatIndex + 1; // 4
        if (!vehicle.isSeatFree(seatIndex - 2) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if(enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_pside_r1");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearDriver2Position === null ? null : this.calcDist(playerPos, seatRearDriver2Position);
        seatIndex = seatRearDriver2 === -1 ? seatIndex : seatIndex + 1; // 5
        if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if(enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_dside_r2");
                }
            }
        }

        // Force inner seats before outer grab holds if shift not pressed
        calculatedDistance = seatRearPassenger2Position === null ? null : this.calcDist(playerPos, seatRearPassenger2Position);
        seatIndex = seatRearPassenger2 === -1 ? seatIndex : seatIndex + 1; // 6
        if (!vehicle.isSeatFree(seatIndex - 4) || mp.keys.isDown(16)) {
            if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
                closestSeatDistance = calculatedDistance;
                closestFreeSeatNumber = seatIndex;
                if(enableBoneDebugging) {
                    mp.game.graphics.notify("boneidx: seat_pside_r2");
                }
            }
        }

        calculatedDistance = seatRearDriver3Position === null ? null : this.calcDist(playerPos, seatRearDriver3Position);
        seatIndex = seatRearDriver3 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r3");
            }
        }

        calculatedDistance = seatRearPassenger3Position === null ? null : this.calcDist(playerPos, seatRearPassenger3Position);
        seatIndex = seatRearPassenger3 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r3");
            }
        }

        calculatedDistance = seatRearDriver4Position === null ? null : this.calcDist(playerPos, seatRearDriver4Position);
        seatIndex = seatRearDriver4 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r4");
            }
        }

        calculatedDistance = seatRearPassenger4Position === null ? null : this.calcDist(playerPos, seatRearPassenger4Position);
        seatIndex = seatRearPassenger4 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r4");
            }
        }

        calculatedDistance = seatRearDriver5Position === null ? null : this.calcDist(playerPos, seatRearDriver5Position);
        seatIndex = seatRearDriver5 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r5");
            }
        }

        calculatedDistance = seatRearPassenger5Position === null ? null : this.calcDist(playerPos, seatRearPassenger5Position);
        seatIndex = seatRearPassenger5 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r5");
            }
        }

        calculatedDistance = seatRearDriver6Position === null ? null : this.calcDist(playerPos, seatRearDriver6Position);
        seatIndex = seatRearDriver6 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r6");
            }
        }

        calculatedDistance = seatRearPassenger6Position === null ? null : this.calcDist(playerPos, seatRearPassenger6Position);
        seatIndex = seatRearPassenger6 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r6");
            }
        }

        calculatedDistance = seatRearDriver7Position === null ? null : this.calcDist(playerPos, seatRearDriver7Position);
        seatIndex = seatRearDriver7 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_dside_r7");
            }
        }

        calculatedDistance = seatRearPassenger7Position === null ? null : this.calcDist(playerPos, seatRearPassenger7Position);
        seatIndex = seatRearPassenger7 === -1 ? seatIndex : seatIndex + 1;
        if (calculatedDistance !== null && vehicle.isSeatFree(seatIndex) && calculatedDistance < closestSeatDistance) {
            closestSeatDistance = calculatedDistance;
            closestFreeSeatNumber = seatIndex;
            if(enableBoneDebugging) {
                mp.game.graphics.notify("boneidx: seat_pside_r7");
            }
        }

        if (closestFreeSeatNumber === -1) {
            returnData['seat'] = -1;
            returnData['distance'] = 100;
            return returnData;
        }

        const lastAnimatableSeatOverrides = {
            [mp.game.joaat('journey')]: driverSeatId + 1,
            [mp.game.joaat('journey2')]: driverSeatId + 1
        };

        let lastAnimatableSeatIndex = driverSeatId + 3;
        if (lastAnimatableSeatOverrides[vehicle.model] !== undefined) {
            lastAnimatableSeatIndex = lastAnimatableSeatOverrides[vehicle.model];
        }

        if (closestFreeSeatNumber <= lastAnimatableSeatIndex) {
            // Normal Enter
            returnData['seat'] = closestFreeSeatNumber;
            returnData['distance'] = closestSeatDistance;
            return returnData;
        } else {
            // Warp Enter
            this.teleport = true;
            returnData['seat'] = closestFreeSeatNumber;
            returnData['distance'] = closestSeatDistance;
            return returnData;
        }
    }

    getClosestVehicle() {
        let closest = null;
        let closestDistance = 5;

        mp.vehicles.forEachInStreamRange(vehicle => {

            this.model = vehicle.getModel();

            this.distance = 5;

            const dist = this.getDistanceToEntity(vehicle, false);

            if (dist > this.distance) {
                return;
            }

            if (closest == null) {
                closest = vehicle;
            }

            if (dist < this.getDistanceToEntity(closest, false)) {
                closest = vehicle;
            }
        });

        return closest;
    }

    getClosestVehiclesInRange(range) {
        let closestVehicles = [];

        mp.vehicles.forEachInStreamRange(vehicle => {
            if (this.getDistanceToEntity(vehicle, false) < range) {
                closestVehicles.push(vehicle);
            }
        });

        return closestVehicles;
    }

    
    getClosestGarbageVehicleInRange(range) {

        let closestVehicle = null;

        mp.vehicles.forEachInStreamRange(vehicle => {

            if (this.getDistanceToEntity(vehicle, false) < range) {
                if (closestVehicle == null) {
                    closestVehicle = vehicle;
                }
                if ((vehicle.model == 0x72435A19 || vehicle.model == 0xB527915C) && 
                    this.getDistanceToEntity(vehicle, false) < this.getDistanceToEntity(closestVehicle, false)) {
                    closestVehicle = vehicle;
                }
            }
        });

        return closestVehicle;
    }

    enter(vehicle, seat) {
        if (this.teleport) {
            if (vehicle.getVariable('lockedStatus')) return;
            mp.players.local.setIntoVehicle(vehicle.handle, seat);
            return;
        }
        mp.players.local.taskEnterVehicle(vehicle.handle, -1, seat, 2, 0, 0);
    }

    getVehicleTeleportLimitSeat() {
        // mp.game.graphics.notify('model 2: ' +  this.model);
       
        switch (this.model) {
            // Einsteigen ab 3 Sitz (Fahrer, Beifahrer, TP...)
            case 0x3412ae2d: // ka
            case 0xfcfcb68b: //Cargobob
            case 0x60a7ea10: //Cargobob
            case 0x53174eef: //Cargobob
            case 0x78bc1a3c: //Cargobob
            case 0x250b0c5e: // Luxor
            case 0xb79c1bf5: // Shamal
            case 0x9c429b6a: // Velum
            case 0x9d80f93: // Miljet
            case 0xb2cf7250: // Nimbus
            case 0x761e2ad3: // Titan
            case 0xf8d48e7a: // journey
                return 1;
            // Einsteigen ab 2 Sitz (Fahrer, TP..)
            case 0xc1ce1183: // Marquis
            case 0xd577c962: // Bus
            case 0x4c80eb0e: // Airbus
            case 0x84718d34: // Coach
            case 0x885f3671: // Pbus
            case 0x73b1c3cb: // Tourbus
            case 0xbe819c63: // Rental
            case 0x56590fe9: // Tropic2
            case 0x1149422f: // Tropic
            case 0x362cac6d: // Toro2
            case 0x3fd5aa2f: // Toro
            case 0xef2295c9: // Suntrap
            case 0xb527915c:
            case 0x72435a19: // Trash
                return 0;
            // Einsteigen ab 5 Sitz (Fahrer, Beifarher, hL, hR, TP...)
            case 0x8b13f083: // Stretch
            case 0xe6e967f8: // Patriot 2
                return 3;
            default:
                return 99;
        }
    }

    getDistanceToEntity(entity, useZ) {
        const pos1 = mp.players.local.position;
        const pos2 = entity.position;
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
    }

    getDistance(pos2) {
        const pos1 = mp.players.local.position;
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, false);
    }
}

export default VehicleEnter;