import Component from "../../components/component"
import player from "../../player/player"

class VehiclePanel extends Component {
    constructor() {
        super("VehiclePanel")

        this.count = 0
        this.currentDistance = 0.0
        this.currentFuelDistance = 0.0
        this.currentInterval = null
        this.speed = 0
        this.engine = false
        this.lock = false
        this.tachoActive = false
        this.isDriver = false
        this.driverInterval = null
        this.svehicle = null;

        mp.events.add("updateVehicleData", (newFuel, newDistance, newHealth, locked, engine) => {
            this.callOnBrowser(`fuel=${newFuel}`)
            this.callOnBrowser(`mileage=${newDistance}`)
            this.callOnBrowser(`health=${newHealth}`)
            this.callOnBrowser(`lock=${locked}`)
            this.callOnBrowser(`engine=${engine}`)
        })

        mp.events.add("initialVehicleData", (fuel, maxFuel, health, maxHealth, maxSpeed, locked, mileage, engine) => {
            this.callOnBrowser(`fuel=${fuel}`)
            this.callOnBrowser(`maxfuel=${maxFuel}`)
            this.callOnBrowser(`health=${health}`)
            this.callOnBrowser(`maxhealth=${maxHealth}`)
            this.callOnBrowser(`maxspeed=${maxSpeed}`)
            this.callOnBrowser(`lock=${locked}`)
            this.callOnBrowser(`mileage=${mileage}`)
            this.callOnBrowser(`engine=${engine}`)
        })

        mp.events.add("setNormalSpeed", (vehicle, speed) => {

            if (vehicle == null) return;
            speed = speed / 3.6;
            if (speed > 0) {
                    vehicle.setMaxSpeed(speed);
                } else {
                    vehicle.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.model) * 1.609);
            }
            this.showTempomat(false);
            this.svehicle = null;
        });

        mp.events.add("playerEnterVehicle", (vehicle, seat) => {
            this.playerEnteredVehicle()
        })

        mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
            this.showTacho(false)

            if (this.currentInterval != null) {
                clearInterval(this.currentInterval)
                this.currentInterval = null
            }
            if (this.driverInterval != null) {
                clearInterval(this.driverInterval)
                this.isDriver = false
                this.driverInterval = null
            }
        })
    }

    playerEnteredVehicle() {
        this.count = 0
        this.currentDistance = 0.0
        this.currentFuelDistance = 0.0

        if (this.currentInterval != null) {
            clearInterval(this.currentInterval)
        }

        if (mp.players.local.__animationData !== undefined && mp.players.local.__animationData != null) {
            if (mp.players.local.__animationData.Active == true) {
                mp.players.local.__animationData.Active = false;
                mp.players.local.stopAnim(mp.players.local.__animationData.AnimationName, mp.players.local.__animationData.AnimationDict, mp.players.local.__animationData.AnimationSpeed);
            }
        }


        this.driverInterval = setInterval(() => {
            let Player = mp.players.local
            let Vehicle = mp.players.local.vehicle
            if (player.isInAnyVehicle(false) && Vehicle !== null && Vehicle.getPedInSeat(-1) == Player.handle) {
                this.isDriver = true
            } else {
                this.isDriver = false
            }
        }, 400)

        this.currentInterval = setInterval(() => {
            let vehicle = mp.players.local.vehicle
            if (vehicle != null) {

                let engineStatus = vehicle.getVariable("engineStatus")
                let lockedStatus = vehicle.getVariable("lockedStatus")

                if (!this.tachoActive) {
                    this.showTacho(true)
                }
                let speed = vehicle.getSpeed();
                speed = speed * 3.6
                
                if (this.speed != speed) {
                    var noDistance = false

                    if (speed == 0) {
                        speed = 0
                        noDistance = true
                    }

                    let currentSpeed = speed
                    currentSpeed /= 60.0
                    currentSpeed /= 60.0
                    currentSpeed /= 4.0

                    this.currentFuelDistance += currentSpeed * (speed / 50.0)

                    let newSpeed = vehicle.getSpeed();

                    if (!noDistance) {
                        this.currentDistance += newSpeed
                    }
                    this.setSpeed(Math.round(speed))
                    this.count++
                }



                this.setEngine(engineStatus)
                this.setLocked(lockedStatus)

                if (this.count >= 100) {
                    this.currentDistance = this.currentDistance / 1000
                    this.currentDistance = (this.currentDistance / 100) * 2
                    this.sendAndReset(vehicle)
                    this.count = 0
                }

            } else {
                if (this.tachoActive) {
                    this.showTacho(false)
                }
            }
        }, 33)
    }

    sendAndReset(veh) {
        if (this.currentDistance > 0.001 && veh != null) {
            mp.events.callRemote("updateVehicleDistance", veh, Number(this.currentDistance.toFixed(3)), Number(this.currentFuelDistance.toFixed(3)), player.remoteHashKey)

            this.currentDistance = 0
            this.currentFuelDistance = 0
        }
    }

    showTacho(activeTacho) {
        this.tachoActive = activeTacho
        this.callOnBrowser(`activeTacho=${activeTacho ? "true" : "false"}`)
    }

    setEngine(engine) {
        this.engine = engine
        this.callOnBrowser(`engine=${engine}`)
    }
    setLocked(lock) {
        this.lock = lock
        this.callOnBrowser(`lock=${lock}`)
    }

    showTempomat(tempo) {
        this.callOnBrowser(`tempomat=${tempo ? "true" : "false"}`)
    }

    requestNormalSpeed(vehicle) {
            mp.events.callRemote("requestNormalSpeed", vehicle, player.remoteHashKey)
    }


    tempomat() {
        var lvehicle = mp.players.local.vehicle;
        if (lvehicle == null) return;
        if (mp.players.local.handle == lvehicle.getPedInSeat(-1)) {
            if (this.svehicle == lvehicle) {
                this.requestNormalSpeed(lvehicle)
            } else {
                if (lvehicle.getSpeed() > 5) {
                    this.svehicle = lvehicle;
                    lvehicle.setMaxSpeed(lvehicle.getSpeed());
                    this.showTempomat(true);
                }
            }
        }
    }

    setSpeed(speed) {
        this.speed = speed
        this.callOnBrowser(`speed=${Math.round(speed*1.20)}`)
        //this.execute(`maxspeed=300`)
        //this.execute(`responseVehicleSpeed(${speed})`)
    }
}

export default new VehiclePanel()
