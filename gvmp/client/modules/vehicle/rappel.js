class Rappel {
    constructor() {
        
        this.localPlayer = mp.players.local;
        this.maxSpeed = 15.0;
        this.minHeight = 15.0;
        this.maxHeight = 45.0;
        this.maxAngle = 15.0;
    }
    startRappel() {
        const vehicle = this.localPlayer.vehicle;
        if (!vehicle) {
            return;
        }

        if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) { // hat kein Seil
            return;
        }

        if (vehicle.getSpeed() > this.maxSpeed) { // zu schnell
            return;
        }

        if (vehicle.getPedInSeat(-1) === this.localPlayer.handle || vehicle.getPedInSeat(0) === this.localPlayer.handle) {
            return;
        }

        const taskStatus = this.localPlayer.getScriptTaskStatus(-275944640);
        if (taskStatus === 0 || taskStatus === 1) {
            return;
        }

        const curHeight = vehicle.getHeightAboveGround();
        if (curHeight < this.minHeight || curHeight > this.maxHeight) {
            return;
        }

        if (!vehicle.isUpright(this.maxAngle) || vehicle.isUpsidedown()) {
            return;
        }

        this.localPlayer.clearTasks();
        this.localPlayer.taskRappelFromHeli(10.0);
    }
}

export default new Rappel()
