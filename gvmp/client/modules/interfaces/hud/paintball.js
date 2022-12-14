import Component from "../../components/component"
import player from "../../player/player"

class Paintball extends Component {
    constructor() {
        super("Paintball")
        mp.events.add("initializePaintball", () => {
            this.callOnBrowser(`initializePaintball()`)
        })

        mp.events.add("updatePaintballScore", (kills, deaths, ks) => {
            this.callOnBrowser(`updatePaintballScore('${kills}', '${deaths}', '${ks}')`)
        })

        mp.events.add("finishPaintball", () => {
            this.callOnBrowser(`finishPaintball()`)
        })

        mp.events.add("spawnProtection", (ms,alpha=180,notify=true) => {
            if (ms > 0) {
                mp.players.local.setInvincible(true);
                player.invincible = true;
                mp.players.local.setAlpha(alpha);
                notify ? mp.game.graphics.notify('SpawnProtection: ~g~' + (ms / 1000) + " Sekunden") : "";
                var spawnprotect = setInterval(function () {
                    mp.players.local.setInvincible(false);
                    player.invincible = false;
                    notify ? mp.game.graphics.notify('SpawnProtection: ~r~aus') : "";
                    mp.players.local.setAlpha(255);
                    clearInterval(spawnprotect);
                }, ms);
            }
        })
    
    }
}

export default new Paintball()