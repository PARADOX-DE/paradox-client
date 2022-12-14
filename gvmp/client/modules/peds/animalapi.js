import player from "../player/player"

class AnimalApi {
    constructor() {
        mp.events.add('entityStreamIn', (entity) => {
            if(entity != null && entity.type == 'ped') {
                if (!mp.peds.exists(entity))
                    return;

                mp.events.callRemote("requestPedSync", entity, player.remoteHashKey);
            }
        })

        mp.events.add('pedStreamInSync', (entity, arg) => {
            if(entity == null) return;
            if(entity.type == 'ped' && mp.peds.exists(entity)) {
                entity.setComponentVariation(0, 0, arg, 0);
            }
        })

        //Function to find ball
        function findBall(pet) {
            if(pet){
                if(!mp.peds.exists(pet)) return;
                
                let findballPos = pet.getCoords(false);
                let findBallRange = 100;

                let ball = mp.game.object.getClosestObjectOfType(findballPos.x, findballPos.y, findballPos.z, findBallRange, mp.game.joaat('w_am_baseball'), false, true, true);


                let x = mp.players.local.position.x+1.0;
                let y = mp.players.local.position.y+1.0;
                if(ball) {    

                    // 100, 50, 25, 12.5, 6, 3
                    let newRange = findBallRange;
                    let newX = findballPos.x;
                    let newY = findballPos.y;
                    let found = false;
                    for(let i = 0; i < 6; i++) 
                    {
                        newRange = newRange / 2;
                        let tmpBall1 = mp.game.object.getClosestObjectOfType((newX+newRange), newY, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall2 = mp.game.object.getClosestObjectOfType((newX-newRange), newY, findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall3 = mp.game.object.getClosestObjectOfType(newX, (newY+newRange), findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall4 = mp.game.object.getClosestObjectOfType(newX, (newY-newRange), findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        
                        let tmpBall5 = mp.game.object.getClosestObjectOfType((newX+newRange), (newY+newRange), findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall6 = mp.game.object.getClosestObjectOfType((newX+newRange), (newY-newRange), findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall7 = mp.game.object.getClosestObjectOfType((newX-newRange), (newY+newRange), findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);
                        let tmpBall8 = mp.game.object.getClosestObjectOfType((newX-newRange), (newY-newRange), findballPos.z, newRange, mp.game.joaat('w_am_baseball'), false, true, true);

                        if(tmpBall1) {
                            newX = newX+newRange;
                            found = true;
                        }
                        else if(tmpBall2) {
                            newX = newX-newRange;
                            found = true;
                        }
                        else if(tmpBall3) {
                            newY = newY+newRange;
                            found = true;
                        }
                        else if(tmpBall4) {
                            newY = newY-newRange;
                            found = true;
                        }
                        else if(tmpBall5) {
                            newX = newX+newRange;
                            newY = newY+newRange;
                            found = true;
                        }
                        else if(tmpBall6) {
                            newX = newX+newRange;
                            newY = newY-newRange;
                            found = true;
                        }
                        else if(tmpBall7) {
                            newX = newX-newRange;
                            newY = newY+newRange;
                            found = true;
                        }
                        else if(tmpBall8) {
                            newX = newX-newRange;
                            newY = newY-newRange;
                            found = true;
                        }
                        else break;
                    }

                    if(found === false) return;


                    // trigger to server...                
                    pet.taskGoToCoordAndAimAtHatedEntitiesNearCoord(newX, newY, findballPos.z+0.4, newX, newY, findballPos.z+0.4, 3, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
                    let dist = mp.game.gameplay.getDistanceBetweenCoords(newX, newY, findballPos.z, x, y, mp.players.local.position.z, true);
                    let time = ((dist / 29)*10000)-3000;
                    setTimeout(() => {
                        if(pet == null || !mp.peds.exists(pet)) return;
                        if(ball != null && ball !== undefined) {
                            //mp.game.invoke('0xAD738C3085FE7E11 ', [ball], true, true);
                            //mp.game.invoke('0x539E0AE3E6634B9F', [ball]);
                            //mp.game.graphics.notify(' ' + mp.game.invoke('0x3FEF770D40960D5A', [ball], false));
                            mp.game.entity.createModelHide(newX, newY, findballPos.z, 3, mp.game.joaat('w_am_baseball'), true); // unsichtbar machen...
                            mp.game.entity.setObjectAsNoLongerNeeded(ball);
                        }
                        // maybe attach here
                        pet.taskGoToCoordAnyMeans(x, y, mp.players.local.position.z, 2.5, 0, false, 786603, 1.0);
                        pet.setHeading(mp.players.local.heading);
                    }, time)     
                        
                }
            }
        }

        function rewritePedData(testPed) {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.freezePosition(false);
            testPed.setCanBeDamaged(true);
            testPed.setInvincible(false);
            testPed.CanRagdoll = false;
            testPed.setOnlyDamagedByPlayer(true);
            testPed.setCanRagdollFromPlayerImpact(false);
            testPed.setSweat(100);
            testPed.setRagdollOnCollision(false);
            testPed.setProofs(false, false, false, false, false, false, false, false); 
            testPed.setFleeAttributes(0, false);
            testPed.setCombatAttributes(46, true);
        }
        
        mp.events.add("animal_giveweapon", (testPed, weaponHash, ammo, equipnow) => {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);
            testPed.giveWeapon(weaponHash, ammo, equipnow);
        })

        mp.events.add("animal_attack", async (testPed, target) => {
            rewritePedData(testPed);
            await mp.game.waitAsync(500);
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskCombat(target.handle, 0, 0);
        })

        mp.events.add("animal_playanim", (testPed, a1, a2, dur, flag) => {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed);

            mp.game.streaming.requestAnimDict(a1);//preload the animation
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskPlayAnim(a1, a2, 8.0, 1.0, dur, flag, 1.0, false, false, false);
        })

        mp.events.add("animal_cleartasks", (testPed) => {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            rewritePedData(testPed)
            testPed.clearTasks();
        })

        mp.events.add("animal_setarmour", (testPed, armor) => {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setArmour(armor);
        })

        mp.events.add("animal_sethealth", (testPed, hp) => {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setHealth(hp);
        })

        mp.events.add("animal_gotoCoord", async (testPed, pos_x, pos_y, pos_z, speed) => {
            rewritePedData(testPed);
            await mp.game.waitAsync(500);
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.taskGoToCoordAndAimAtHatedEntitiesNearCoord(pos_x, pos_y, pos_z, pos_x, pos_y, pos_z, speed, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));
        })
        
        mp.events.add("animal_setFollow", (testPed, speed) => {
            rewritePedData(testPed);            
            if(testPed == null || !mp.peds.exists(testPed)) return;
            player.isPetFollowing = testPed;
        })

        mp.events.add("animal_cloth", (testPed, arg1, arg2, arg3) => {
            if(testPed == null || !mp.peds.exists(testPed)) return;
            testPed.setComponentVariation(arg1, arg2, arg3, 0);
        })

        mp.events.add("animal_checkDeath", (testPed, returnEvent) => {
            if(testPed != null && mp.peds.exists(testPed)) {
                mp.events.callRemote(returnEvent, testPed.isDeadOrDying(true), player.remoteHashKey);
            }
        })

        const render = async () => {
            while (true) {
                if(player.isPetFollowing !== undefined && player.isPetFollowing != null && player.isPetFollowing !== undefined && mp.peds.exists(player.isPetFollowing) && !player.isPetFollowing.isDead())
                {
                    if(player.isPetFollowing == null || !mp.peds.exists(player.isPetFollowing)) {
                        await mp.game.waitAsync(50);
                        continue;
                    }

                    let pedPos = new mp.Vector3(player.isPetFollowing.getCoords(false).x, player.isPetFollowing.getCoords(false).y, player.isPetFollowing.getCoords(false).z);
                    if(!isInRangeOfPoint(mp.players.local.position, pedPos, 1.5))
                    {
                        if(player.isPetFollowing == null || player.isPetFollowing == undefined || !mp.peds.exists(player.isPetFollowing)) return
                        const pGround = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, parseFloat(0), false);
                        //We calculate dog's spped depending on the distance between the player
                        let speed;
                        if(player.isPetFollowing == null || player.isPetFollowing == undefined || !mp.peds.exists(player.isPetFollowing)) return
                        if(!isInRangeOfPoint(mp.players.local.position, pedPos, 4)) speed = 3;
                        else speed = 1;

                        if(player.isPetFollowing == null || player.isPetFollowing == undefined || !mp.peds.exists(player.isPetFollowing)) return;
                        player.isPetFollowing.taskGoToCoordAndAimAtHatedEntitiesNearCoord(mp.players.local.position.x, mp.players.local.position.y, pGround+0.4, mp.players.local.position.x, mp.players.local.position.y, pGround+0.4, speed, false, parseFloat(0), parseFloat(0), false, 0, false, mp.game.joaat('a_c_chop'));

                    }
                }

                await mp.game.waitAsync(50);
            }
        }

        render();

        mp.events.add("animal_stopFollow", () => {
            if(player.isPetFollowing == null || !mp.peds.exists(player.isPetFollowing)) return;
            player.isPetFollowing = undefined;
        })

        mp.events.add("animal_findball", (testPed) => {
            rewritePedData(testPed);
            if(testPed == null || !mp.peds.exists(testPed)) return;
            findBall(testPed);
        })

        mp.events.add("testcop", (testPed, Veh, pos_x, pos_y, pos_z) => {

            testPed.freezePosition(false);
            testPed.setCanBeDamaged(true);
            testPed.setInvincible(false);
            testPed.CanRagdoll = true;
            testPed.setOnlyDamagedByPlayer(true);
            testPed.setCanRagdollFromPlayerImpact(true);
            testPed.setSweat(100);
            testPed.setRagdollOnCollision(true);

            testPed.setProofs(false, false, false, false, false, false, false, false); 

            setTimeout(function () {
                if(testPed == null || !mp.peds.exists(testPed)) return;
                testPed.taskEnterVehicle(Veh.handle, 10000, -1, 1, 1, 0);
            }, 1500);

            //player.taskVehicleDriveToCoord(vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10);
            
            setTimeout(function () {
                if(testPed == null || !mp.peds.exists(testPed)) return;
                testPed.taskVehicleDriveToCoord(Veh.handle, 0.52, 0.38, 72.1, 40, 1, 2046537925, 2, 3, true);
            }, 10500);
        })

        function isInRangeOfPoint(pos1, pos2, range)
        {
            return (
                Math.sqrt(
                    Math.pow(pos1.x - pos2.x, 2) +
                    Math.pow(pos1.y - pos2.y, 2) +
                    Math.pow(pos1.z - pos2.z, 2)
                ) <= range
            );
        }
    }
}

export default new AnimalApi()