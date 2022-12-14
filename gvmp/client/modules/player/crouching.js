
import apps from "../app/apps"
import player from "../player/player"
import windows from "../windows/windows"

const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.25;

const loadClipSet = async (clipSetName) => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName))
        await mp.game.waitAsync(5);
};

// apply/reset clip sets when isCrouched changes for a streamed player
mp.events.add("changeCrouchingState", (entity, value) => {
    if (entity != null && entity.type === "player" && movementClipSet && clipSetSwitchTime && strafeClipSet) {
        if (value) {
            entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
            entity.setStrafeClipset(strafeClipSet);
        } else {
            entity.resetMovementClipset(clipSetSwitchTime);
            entity.resetStrafeClipset();
        }
    }
});

mp.events.add("loadCrouchClipsets", async () => {
    // load clip sets
    await loadClipSet(movementClipSet);
    await loadClipSet(strafeClipSet);
})

// CTRL key to toggle crouching
mp.keys.bind(0x11, false, () => {
    if (windows.visibleWindow != null || apps.componentVisibleApp["Smartphone"] || apps.componentVisibleApp["Computer"] || apps.componentVisibleApp["Ipad"] || player.chatFlag || player.injured) return
    mp.events.callRemote("toggleCrouch", player.remoteHashKey);
});