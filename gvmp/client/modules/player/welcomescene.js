
import playerModule from "../player/player"

const player = mp.players.local;
let jet = false;
let pedplayer = false;
let cutsceneEnded = false;
let CharacterName = false;
let CharacterGender = 0;


mp.events.add("doneCutscene", () => {
    mp.game.audio.triggerMusicEvent("FM_INTRO_DRIVE_END");
    mp.game.invoke("0xD220BDD222AC4A1E");
    mp.gui.cursor.show(false, false);
    player.setAlpha(255);

    // NOTICE
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, false, false);
    // Hide Ped (Deleting Ped crashes Game)

    setTimeout(() => {
        mp.game.cam.doScreenFadeOut(100);
    }, 100);

    setTimeout(() => {
        mp.game.cam.doScreenFadeIn(100);
    }, 2000);
    
    player.setInvincible(false)
    mp.events.callRemote("cutsceneEnded", playerModule.remoteHashKey);
})


mp.events.add("startWelcomeCutscene", async (gender = 0, name = null) => {
    if (name !== null) {
        CharacterName = name;
    }
    if (gender !== 0) {
        CharacterGender = gender;
    }

    player.setInvincible(true)

    mp.game.cam.doScreenFadeOut(0);
    //create hud ready for them to spawn
    mp.gui.cursor.show(false, false);
    mp.game.audio.setAudioFlag("DisableFlightMusic", true);
    player.clearTasksImmediately();
    player.position = new mp.Vector3(-1117.778, -1557.625, 3.3819);
    player.setInvincible(true);


    mp.game.audio.prepareMusicEvent("FM_INTRO_START");
    //Clone Current Ped
    const pedplayer = mp.game.invoke("0xEF29A16337FACADB", player.handle, 0, false, false);

    //Make Player Invisible
    player.setAlpha(0);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);

    mp.game.cutscene.requestCutscene("mp_intro_concat", 1);

    while (!mp.game.cutscene.hasThisCutsceneLoaded("mp_intro_concat"))  {
        await mp.game.waitAsync(5);
    }

    //Render Jet
    const hash = mp.game.joaat("p_cs_mp_jet_01_s");
    jet = mp.game.object.createObject(hash, -1200, -1490, 142.385, false, true, false);

    mp.game.invoke("0x3910051CCECDB00C", jet, false);
    mp.game.invoke("0xEA1C610A04DB6BBB", jet, true, false);

    // Attach Jet to Cutscene
    mp.game.cutscene.registerEntityForCutscene(jet, "MP_Plane", 0, 0, 0);

    if (CharacterGender == 0) {
        // Remove Female NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Female_Character", 3, mp.game.joaat("mp_f_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Male_Character", 0, 0, 0);
    } else {
        // Remove Male NPC from Cutscene
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Male_Character", 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Female_Character", 0, 0, 0);
    }
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, true, false);

    for (let i = 1; i < 8; i++){
        mp.game.cutscene.registerEntityForCutscene(0, "MP_Plane_Passenger_" + i, 3, mp.game.joaat("mp_m_freemode_01"), 0);
        mp.game.invoke("0x4C61C75BEE8184C2", "MP_Plane_Passenger_" + i, 0, 0);
    }


    mp.game.invoke("0xE532F5D78798DAAB", hash);
    setTimeout(() => {
        mp.game.cutscene.startCutscene(4);
        mp.game.invoke("0xBEB2D9A1D9A8F55A", 9, 9, 9, 9);
        mp.game.cam.doScreenFadeIn(500);
        mp.game.audio.triggerMusicEvent("FM_INTRO_START");

    }, 500);
});


mp.events.add("render", () => {
    const time = mp.game.invoke("0xE625BEABBAFFDAB9");
    if (time !== 0 && cutsceneEnded == false) {
        if (time > 26000) {
            cutsceneEnded = true;
            mp.events.call("doneCutscene");
        }
    }
});
