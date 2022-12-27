import peds from "../peds/peds";
import player from "../player/player"

//FadeOutDeath cuz of new Handling
mp.game.gameplay.setFadeOutAfterDeath(false);

let shotPlayer = undefined;

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//Prevent
mp.events.add('projectile', () => {
    return true;
});

mp.events.add('explosion', () => {
    return true;
});

mp.events.add("playerSpawn", (client) => {
    mp.game.gameplay.setFadeOutAfterDeath(false);

    //Helmet DMG reduce does not work..
    //mp.players.local.setConfigFlag(149,false);
    //mp.players.local.setConfigFlag(438, false);

    mp.game.player.setWeaponDamageModifier(player.weaponDmg);
    mp.game.player.setMeleeWeaponDamageModifier(player.meleeDmg);
});


mp.players.local.setSuffersCriticalHits(false);
//Disable sneaking
mp.players.local.setStealthMovement(false, '0');

mp.events.add('triggerRagdoll', () => {
    mp.players.local.setToRagdoll(100, 100, 2, false, false, false);
});

mp.events.add('render', () => {
    //HIDE STREET NAME BOTTOM RIGHT
    mp.game.ui.hideHudComponentThisFrame(9);
    mp.game.ui.hideHudComponentThisFrame(7);

    //DISABLE STEALTH KILL
    if (mp.players.local.isPerformingStealthKill()) {
        mp.players.local.clearTasksImmediately();
    }

    // meele combat
    if (mp.game.invoke('0x475768A975D5AD17', mp.players.local.handle, 6)) { // Is Ped Armed
        mp.game.controls.disableControlAction(0, 140, true); // INPUT_MELEE_ATTACK_LIGHT
        mp.game.controls.disableControlAction(0, 141, true); // INPUT_MELEE_ATTACK_HEAVY
        mp.game.controls.disableControlAction(0, 142, true); // INPUT_MELEE_ATTACK_ALTERNATE
    }

    // generell disablings
    //mp.game.controls.disableControlAction(0, 44, true); // Cover

    // Combat running
    if (mp.players.local.isUsingActionMode()) {
        mp.players.local.setUsingActionMode(false, -1, "DEFAULT_ACTION");
    }

    // Hide Ammo
    mp.game.ui.displayAmmoThisFrame(false);

    // Slowmo Camera Abuses
    mp.game.controls.disableControlAction(0, 7, true); // INPUT_CINEMATIC_SLOWMO
    mp.game.controls.disableControlAction(0, 334, true); // INPUT_VEH_SLOWMO_UD
    mp.game.controls.disableControlAction(0, 335, true); // INPUT_VEH_SLOWMO_UP_ONLY
    mp.game.controls.disableControlAction(0, 336, true); // INPUT_VEH_SLOWMO_DOWN_ONLY

    // disable while freezed
    if (player.cuffed || peds.freezed) {
        // disabling veh attacks
        mp.game.controls.disableControlAction(0, 69, true); //
        mp.game.controls.disableControlAction(0, 70, true); //
        mp.game.controls.disableControlAction(0, 24, true); //
        mp.game.controls.disableControlAction(0, 92, true); //
        mp.game.controls.disableControlAction(0, 106, true); //
        mp.game.controls.disableControlAction(0, 257, true); //
        mp.game.controls.disableControlAction(0, 346, true); //
        mp.game.controls.disableControlAction(0, 25, true); //
        mp.game.controls.disableControlAction(0, 68, true); //
        mp.game.controls.disableControlAction(0, 70, true); //
        mp.game.controls.disableControlAction(0, 91, true); //
    }
})
mp.events.add('incomingDamage', (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {

    mp.players.local.setSuffersCriticalHits(false);
    if (targetEntity.type === 'player' && boneIndex === 20 && !player.invincible) {
        if (damage <= 5) {
            damage = 306;
        }
        mp.players.local.applyDamageTo(Math.floor(damage / 18), true);
        return true;
    }
});


mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (!targetEntity) return true;
    if (!sourcePlayer) return true;
    if (sourcePlayer.isShooting()) {
        if (!shotPlayer || shotPlayer === undefined) return true;
        if (targetEntity.id != shotPlayer.id) return true;
    }

    if (targetEntity.type === 'player' && sourceEntity.type === 'player' && player.dmglg) {
        mp.events.callRemoteUnreliable("aads",
            targetEntity,
            Math.floor(sourceEntity.position.subtract(targetEntity.position).length()),
            (boneIndex === 20) ? Math.floor(damage / 18) : damage,
            boneIndex,
            weapon.toString())
    }

});


mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    shotPlayer = undefined;
    if (targetEntity === undefined || !targetEntity) return;
    shotPlayer = targetEntity;
    if (!targetEntity.vehicle && targetEntity.getHealth() > 0)
        targetEntity.setCanRagdoll(false);
});