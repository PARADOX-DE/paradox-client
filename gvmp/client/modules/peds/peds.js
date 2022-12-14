import player from "../player/player"

class Peds {
    constructor() {
        this.freezed = false
        this.disabled = false
        this.disabledAll = false

        this.menuItemsPedsCduty = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" },
            { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" },
            { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" },
            { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" },
            { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" },
            { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" },
            { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" },
            { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" },
            { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" },
            { label: 'Casino Einlass', description: 'Dieser Person Einlass gewähren / entziehen.', icon: 'img/icons/player/diamond.png', id: 'REQUEST_PEDS_PLAYER_CASINO', arg: "" },
        ]
        this.menuItemsPedsPlayer = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" },
            { label: 'Fesseln', description: 'Dieser Person fesseln.', icon: 'img/icons/player/rope.png', id: 'REQUEST_PEDS_PLAYER_TIE', arg: "" },
            { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" },
            { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" },
            { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" },
            { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" },
            { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" },
            { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" },
            { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" },
            { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" },
        ]
        this.menuItemsPedsMedic = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" },
            { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" },
            { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" },
            { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" },
            { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" },
            { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" },
            { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" },
            { label: 'Behandeln', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/medicate.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" },
            { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" },
            { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" },
        ]
        this.menuItemsPedsCop = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" },
            { label: 'Geld geben', description: 'Dieser Person Geld geben.', icon: 'img/icons/player/wallet.png', id: 'REQUEST_PEDS_PLAYER_GIVEMONEY_DIALOG', arg: "" },
            { label: 'Handschellen', description: 'Dieser Person Handschellen anlegen/abnehmen.', icon: 'img/icons/cop/cuff.png', id: 'REQUEST_PEDS_PLAYER_CUFF', arg: "" },
            { label: 'Person nehmen/loslassen', description: 'Diese Person mitschleifen/loslassen.', icon: 'img/icons/cop/takeperson.png', id: 'REQUEST_PEDS_PLAYER_TAKEPERSON', arg: "" },
            { label: 'Personalausweis nehmen', description: 'Den Personalausweis des Spielers nehmen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_GETPERSO', arg: "" },
            { label: 'Person durchsuchen', description: 'Diese Person durchsuchen.', icon: 'img/icons/player/search.png', id: 'REQUEST_PEDS_PLAYER_FRISK', arg: "" },
            { label: 'Lizenzen', description: 'Dieser Person deine Lizenzen zeigen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_SHOW_LIC', arg: "" },
            { label: 'Lizenzen nehmen', description: 'Die Lizensen des Spielers nehmen.', icon: 'img/icons/player/lic.png', id: 'REQUEST_PEDS_PLAYER_TAKE_LIC', arg: "" },
            { label: 'Personalausweis', description: 'Dieser Person deinen Personalausweis zeigen.', icon: 'img/icons/player/perso.png', id: 'REQUEST_PEDS_PLAYER_SHOW_PERSO', arg: "" },
            { label: 'Stabilisieren', description: 'Diese Person stabilisieren.', icon: 'img/icons/medic/stabilize.png', id: 'REQUEST_PEDS_PLAYER_STABALIZE', arg: "" },
            { label: 'Schlüssel geben', description: 'Dieser Person einen Schlüssel geben.', icon: 'img/icons/inventory/key.png', id: 'REQUEST_PEDS_PLAYER_GIVEKEY', arg: "" },
            { label: 'Item geben', description: 'Dieser Person ein Item geben.', icon: 'img/icons/player/item.png', id: 'REQUEST_PEDS_PLAYER_GIVEITEM', arg: "" },
        ]
        this.menuItemsPedsPlayerInjured = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }
        ]
        this.menuItemsTiedOrCuffed = [
            { label: 'Exit', description: 'Schließt das Menü', icon: 'img/icons/exit.png', id: 'donothing', arg: "" }
        ]

        this.l_Mods = [
            {id:0, name:"spoiler"},
            {id:1, name:"front_bumper"},
            {id:2, name:"rear_bumper"},
            {id:3, name:"side_skirt"},
            {id:4, name:"exhaust"},
            {id:5, name:"frame"},
            {id:6, name:"grille"},
            {id:7, name:"hood"},
            {id:8, name:"fender"},
            {id:9, name:"right_fender"},
            {id:10, name:"roof"},
            {id:11, name:"engine"},
            {id:12, name:"brakes"},
            {id:13, name:"transmission"},
            {id:14, name:"horns"},
            {id:15, name:"suspension"},
            {id:16, name:"armor"},
            {id:18, name:"turbo"},
            {id:22, name:"xenon"},
            {id:23, name:"front_wheels"},
            {id:20, name:"util_shadow_silver"},
            {id:24, name:"back_wheels"},
            {id:25, name:"plate_holders"},
            {id:27, name:"trim_design"},
            {id:28, name:"ornaments"},
            {id:30, name:"dial_design"},
            {id:33, name:"steering_wheel"},
            {id:34, name:"shift_lever"},
            {id:35, name:"plaques"},
            {id:38, name:"hydraulics"},
            {id:40, name:"boost"},
            {id:46, name:"window_tint"},
            {id:48, name:"livery"},
            {id:62, name:"plate"}
        ]

        mp.events.add("freezePlayer", (state) => {

            if(state === undefined || typeof state !== "boolean") return;

            player.cuffed = state;
            mp.players.local.freezePosition(state);
            mp.players.local.setCanSwitchWeapon(!state);

            this.disabled = state
        })

        mp.events.add("disableAllControls", (state) => {
            this.disabledAll = state
        })

        mp.events.add("disableAllPlayerActions", (state) => {
            this.disabled = state
        })

        mp.events.add("toggleShooting", (state) => {
            this.freezed = state
        })

        mp.events.add("render", () => {

            if (this.freezed) {
                this.disableControls()
            }
            else if(this.disabled) {
                this.disableControls()
                mp.game.controls.disableControlAction(0, 30, true) //Move LR
                mp.game.controls.disableControlAction(0, 31, true) //Move UD
            }

            if (player.superjump) {
                mp.game.invoke("0x57FFF03E423A4C0B", mp.players.local);
            }

            if (this.disabledAll) {
                mp.game.controls.disableAllControlActions(0)
            }
        })

        mp.events.add("playerDeath", () => {
            setTimeout(() => this.disabled = true, 5000)
        })

        mp.events.add("playerEnterVehicle", (pl, vehicle, seat) => {
            if (player.injured || player.tied || player.cuffed) {
                mp.players.local.clearTasks()
            }
        })

        mp.events.add("loadNpc", (ped, x, y, z, heading, dimension) => {
            mp.peds.new(ped, new mp.Vector3(x, y, z), heading, (streamPed) => {
                streamPed.setAlpha(0);
                streamPed.setRotation(0, 0, heading, 2, true);
                streamPed.freezePosition(true);
            }, dimension);
        })
    }

    disableAllControls(state) {
        this.disabledAll = state
    }

    // Get menu items for the player
    getPlayerMenuItems() {
        if(player.injured) {
            return this.menuItemsPedsPlayerInjured
        }
        // Check if the player is tied or cuffed
        else if(player.tied || player.cuffed) {
            return this.menuItemsTiedOrCuffed
        }
        else {
            // Check if the player is on duty
            if(player.duty) {
                // Check if the player is a cop, fib, army, gov, swat
                if(player.cduty == true) {
                    return this.menuItemsPedsCduty
                }
                else if(player.team == 1 || player.team == 5 || player.team == 13 || player.team == 14 || player.team == 21 || player.team == 23) {
                    return this.menuItemsPedsCop
                }
                // Check if the player is a medic
                else if(player.team == 7) {
                    return this.menuItemsPedsMedic
                }
                else {
                    return this.menuItemsPedsPlayer
                }
            }
            else {
                if(player.cduty == true) {
                    return this.menuItemsPedsCduty
                }
                else{
                    return this.menuItemsPedsPlayer
                }
            }
        }
    }

    disableControls() {
        mp.game.player.disableFiring(true)
        mp.game.controls.disableControlAction(0, 22, true) //Space
        mp.game.controls.disableControlAction(0, 23, true) //Veh Enter
        mp.game.controls.disableControlAction(0, 25, true) //Right Mouse
        mp.game.controls.disableControlAction(0, 44, true) //Q
        mp.game.controls.disableControlAction(2, 75, true) //Exit Vehicle
        mp.game.controls.disableControlAction(2, 140, true) //R
        mp.game.controls.disableControlAction(2, 141, true) //Left Mouse
    }
}

export default new Peds()