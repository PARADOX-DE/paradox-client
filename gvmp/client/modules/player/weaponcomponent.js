const Natives = {
    GIVE_WEAPON_COMPONENT_TO_PED: "0xD966D51AA5B28BB9",
    REMOVE_WEAPON_COMPONENT_FROM_PED: "0x1E8BE90C74FB4C09",
    SET_CURRENT_PED_WEAPON: "0xADF692B254977C0C",
    GIVE_WEAPON_TO_PED: "0xBF0FD6E56C964FCB",
};

function addComponentToPlayer(player, weaponHash, componentHash) {
    if(!player) return

    if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

    player.__weaponComponentData[weaponHash].add(componentHash);
    mp.game.invoke(Natives.GIVE_WEAPON_COMPONENT_TO_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

function removeComponentFromPlayer(player, weaponHash, componentHash) {
    if(!player) return

    if (!player.hasOwnProperty("__weaponComponentData")) player.__weaponComponentData = {};
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) player.__weaponComponentData[weaponHash] = new Set();

    player.__weaponComponentData[weaponHash].delete(componentHash);
    mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, componentHash >> 0);
}

mp.events.add("updatePlayerWeaponComponent", (player, weaponHash, componentHash, removeComponent) => {
    if (removeComponent) {
        removeComponentFromPlayer(player, weaponHash, componentHash);
    } else {
        addComponentToPlayer(player, weaponHash, componentHash);
    }
});

mp.events.add("resetPlayerWeaponComponents", (player, weaponHash) => {
    if(!player) return

    if (!player.hasOwnProperty("__weaponComponentData")) return;
    if (!player.__weaponComponentData.hasOwnProperty(weaponHash)) return;

    for (let component of player.__weaponComponentData[weaponHash]) {
        if (!component) continue;
        mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weaponHash >> 0, component >> 0);
    }
    player.__weaponComponentData[weaponHash].clear();
});

mp.events.add("nukePlayerWeaponComponents", (player) => {
    if (!player || !player.hasOwnProperty("__weaponComponentData")) return;

    for (let weapon in player.__weaponComponentData) {
        for (let component of player.__weaponComponentData[weapon]) {
            if (!component) continue;
            mp.game.invoke(Natives.REMOVE_WEAPON_COMPONENT_FROM_PED, player.handle, weapon >> 0, component >> 0);
        }
    }

    player.__weaponComponentData = {};
});

mp.events.add("entityStreamIn", (entity) => {
    if (entity != null && entity.type === "player") {
        if (!mp.players.exists(entity))
            return;

        let data = entity.getVariable("currentWeaponComponents");

        if (data) {
            let [weaponHash, components] = data.split(".");
            let componentsArray = (components && components.length > 0) ? components.split('|') : [];

            // don't touch this or you will have a bad time
            mp.game.invoke(Natives.GIVE_WEAPON_TO_PED, entity.handle, weaponHash >> 0, -1, false, true);
            for (let component of componentsArray) addComponentToPlayer(entity, weaponHash, component);
            mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);
        }
    }
});

mp.events.add("entityStreamOut", (entity) => {
    if (entity.type === "player" && entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};
});

mp.events.addDataHandler("currentWeaponComponents", (entity, value) => {
    if (entity.type === "player" && entity.handle !== 0) {
        if (!entity.hasOwnProperty("__weaponComponentData")) entity.__weaponComponentData = {};

        let [weaponHash, components] = value.split(".");

        if (!entity.__weaponComponentData.hasOwnProperty(weaponHash)) entity.__weaponComponentData[weaponHash] = new Set();

        let currentComponents = entity.__weaponComponentData[weaponHash];
        let newComponents = (components && components.length > 0) ? components.split('|') : [];

        for (let component of currentComponents) {
            if (!component) continue;
            if (!newComponents.includes(component)) removeComponentFromPlayer(entity, weaponHash, component);
        }

        for (let component of newComponents) addComponentToPlayer(entity, weaponHash, component);
        mp.game.invoke(Natives.SET_CURRENT_PED_WEAPON, entity.handle, weaponHash >> 0, true);

        entity.__weaponComponentData[weaponHash] = new Set(newComponents);
    }
});