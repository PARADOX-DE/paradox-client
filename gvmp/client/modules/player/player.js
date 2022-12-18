import Contacts from './contacts/contacts'
import Historys from './telefonHistory/historys'
import hud from '../interfaces/hud/hud'
import utils from '../utils/utils'
import playerPanel from '../interfaces/hud/player-panel'
import playerInfo from '../interfaces/hud/playerinfo'
import playernotification from '../interfaces/hud/playernotification'
import attachments from '../attachments/attachments'
import playerinfo from '../interfaces/hud/playerinfo'

class Player {
    constructor() {
        this.firstName = undefined
        this.lastName = undefined
        this.superjump = undefined
        this.playerId = undefined
        this.academicPoints = undefined
        this.business = undefined
        this.gwdNote = undefined
        this.zwdNote = undefined
        this.money = undefined
        this.blackmoney = undefined
        this.wanteds = undefined
        this.house = undefined
        this.team = undefined
        this.teamRank = undefined
        this.gvmpTeamRank = undefined
        this.level = undefined
        this.injured = undefined
        this.duty = undefined
        this.cuffed = undefined
        this.tied = undefined
        this.aduty = false
        this.inventory = undefined
        this.lastMusicEvent = undefined
        this.weaponDmg = 0;
        this.meleeDmg = 0;
        this.dmglg = 0;
        this.invincible = false
        this.chatFlag = false
        this.voiceHash = ''
        this.state = 0
        this.rank = 0
        this.phone = undefined
        this.phonelautlos = false
        this.contacts = new Contacts()
        this.historys = new Historys()
        this.weaponAmmo = []
        this.cduty = false
        this.currentWeapon = undefined
        this.job = undefined
        this.jobsSkill = undefined
        this.isPetFollowing = undefined
        this.Krankenversicherung = undefined
        this.activeRingtone = 0
        this.gui
        this.natives = {
            SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
            SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
            IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F',
        }
        this.animations = []
        this.marker = null
            //this.lastInteractE = new Date()
        this.playerSync = true
        this.vehicleSync = true
        this.shortCutBeingUsed = false
        this.isCarrying = false
        this.allowHandy = true
        this.spawnedDrugPed = null
        this.progressbar = false
        this.health = 100
        this.ready = false
        this.wasRagdoll = {}
        this.collided = {}
        this.HasCollided = false
        this.HasRagdall = false
        this.isOpeningDoor = false
        this.isInWater = false
        this.acMark1 = undefined
        this.acMark2 = undefined
        this.custommarkers = []
        this.customObjects = []
        this.weaponSwitchAmmo = []
        this.currentCheckpoint = null
        this.buildingmode = false
        this.buildingspeed = 0.1
        this.buildingobject = undefined
        this.attachmentsync = false
        this.openVoiceSettings = false
        this.shotPlayer = undefined;
        this.remoteHashKey = ""
        const props = ['Set_Pent_Tint_Shell', 'Set_Pent_Pattern_01', 'Set_Pent_Spa_Bar_Open', 'Set_Pent_Media_Bar_Open', 'Set_Pent_Dealer', 'Set_Pent_Arcade_Modern', 'Set_Pent_Bar_Clutter', 'Set_Pent_Clutter_01', 'set_pent_bar_light_01', 'set_pent_bar_party_0', 'hei_dlc_windows_casino', 'vw_dlc_casino_door', 'hei_dlc_casino_door']
        this.bigDataChunkBucket = {}

        setInterval(function() {
                if (mp.game.gameplay.getProfileSetting(0) == 0) {
                    mp.game.cam.shakeGameplayCam('MEDIUM_EXPLOSION_SHAKE', 0.4)
                }
            }, 150)
            // disable automatic cam lookup
        setInterval(() => {
            mp.game.invoke('0x9E4CFFF989258472');
            mp.game.invoke('0xF4F2C0D4EE209E20');
        }, 25000);

        const methlaboratory = {
            interiorName: 'bkr_biker_interior_placement_interior_2_biker_dlc_int_ware01_milo',
            interiorID: 247041,
            props: {
                table: ['meth_lab_empty', 'meth_lab_setup'],
                boiler: ['', 'meth_lab_basic', 'meth_lab_upgrade'],
                security: ['', 'meth_lab_security_high'],
            },
        }

        const planningroom = {
            arcade: {
                interiorName: 'ch_DLC_Arcade',
                Id: 278273,
                props: {
                    grundraum: [
                        [
                            'entity_set_arcade_set_derelict',
                            'entity_set_arcade_set_derelict_carpet',
                            'entity_set_arcade_set_derelict_clean_up',
                        ],
                        [
                            'entity_set_arcade_set_derelict',
                        ],
                        [
                            'entity_set_arcade_set_ceiling_flat',
                            'entity_set_ret_light_no_neon',
                        ],
                        [
                            'entity_set_arcade_set_ceiling_beams',
                            'entity_set_hip_light_no_neon',
                        ],
                    ],
                    spiegel: [
                        [
                            '',
                        ],
                        [
                            'entity_set_arcade_set_ceiling_mirror',
                        ],
                    ],
                    einrichtungsstyle: [
                        [
                            '',
                        ],
                        [
                            'entity_set_floor_option_01',
                            'entity_set_mural_neon_option_01',
                            'entity_set_mural_option_01',
                        ],
                        [
                            'entity_set_floor_option_02',
                            'entity_set_mural_neon_option_02',
                            'entity_set_mural_option_02',
                        ],
                        [
                            'entity_set_floor_option_03',
                            'entity_set_mural_neon_option_03',
                            'entity_set_mural_option_03',
                        ],
                        [
                            'entity_set_floor_option_04',
                            'entity_set_mural_neon_option_04',
                            'entity_set_mural_option_04',
                        ],
                        [
                            'entity_set_floor_option_05',
                            'entity_set_mural_neon_option_05',
                            'entity_set_mural_option_05',
                        ],
                        [
                            'entity_set_floor_option_06',
                            'entity_set_mural_neon_option_06',
                            'entity_set_mural_option_06',
                        ],
                        [
                            'entity_set_floor_option_07',
                            'entity_set_mural_neon_option_07',
                            'entity_set_mural_option_07',
                        ],
                        [
                            'entity_set_floor_option_08',
                            'entity_set_mural_neon_option_08',
                            'entity_set_mural_option_08',
                        ],
                    ],
                    inneneinrichtung: [
                        [
                            '',
                        ],
                        [
                            'entity_set_big_screen',
                            'entity_set_screens',
                            'entity_set_constant_geometry',
                        ],
                    ],
                    spielautomaten: [
                        [
                            '',
                        ],
                        [
                            'entity_set_arcade_set_streetx4',
                        ],
                    ],
                    rewards: [
                        '',
                        'entity_set_arcade_set_trophy_brawler',
                        'entity_set_arcade_set_trophy_cabs',
                        'entity_set_arcade_set_trophy_claw',
                        'entity_set_arcade_set_trophy_gunner',
                        'entity_set_arcade_set_trophy_king',
                        'entity_set_arcade_set_trophy_love',
                        'entity_set_arcade_set_trophy_monkey',
                        'entity_set_arcade_set_trophy_patriot',
                        'entity_set_arcade_set_trophy_racer',
                        'entity_set_arcade_set_trophy_retro',
                        'entity_set_arcade_set_trophy_strife',
                        'entity_set_arcade_set_trophy_teller',
                    ],
                },
                allprops: [
                    'entity_set_arcade_set_ceiling_beams',
                    'entity_set_arcade_set_ceiling_flat',
                    'entity_set_arcade_set_ceiling_mirror',
                    'entity_set_arcade_set_derelict',
                    'entity_set_arcade_set_derelict_carpet',
                    'entity_set_arcade_set_derelict_clean_up',
                    'entity_set_arcade_set_streetx4',
                    'entity_set_arcade_set_trophy_brawler',
                    'entity_set_arcade_set_trophy_cabs',
                    'entity_set_arcade_set_trophy_claw',
                    'entity_set_arcade_set_trophy_gunner',
                    'entity_set_arcade_set_trophy_king',
                    'entity_set_arcade_set_trophy_love',
                    'entity_set_arcade_set_trophy_monkey',
                    'entity_set_arcade_set_trophy_patriot',
                    'entity_set_arcade_set_trophy_racer',
                    'entity_set_arcade_set_trophy_retro',
                    'entity_set_arcade_set_trophy_strife',
                    'entity_set_arcade_set_trophy_teller',
                    'entity_set_big_screen',
                    'entity_set_constant_geometry',
                    'entity_set_floor_option_01',
                    'entity_set_floor_option_02',
                    'entity_set_floor_option_03',
                    'entity_set_floor_option_04',
                    'entity_set_floor_option_05',
                    'entity_set_floor_option_06',
                    'entity_set_floor_option_07',
                    'entity_set_floor_option_08',
                    'entity_set_hip_light_no_neon',
                    'entity_set_mural_neon_option_01',
                    'entity_set_mural_neon_option_02',
                    'entity_set_mural_neon_option_03',
                    'entity_set_mural_neon_option_04',
                    'entity_set_mural_neon_option_05',
                    'entity_set_mural_neon_option_06',
                    'entity_set_mural_neon_option_07',
                    'entity_set_mural_neon_option_08',
                    'entity_set_mural_option_01',
                    'entity_set_mural_option_02',
                    'entity_set_mural_option_03',
                    'entity_set_mural_option_04',
                    'entity_set_mural_option_05',
                    'entity_set_mural_option_06',
                    'entity_set_mural_option_07',
                    'entity_set_mural_option_08',
                    'entity_set_ret_light_no_neon',
                    'entity_set_screens',
                ],
            },
            plan: {
                interiorName: 'ch_DLC_Plan',
                Id: 278529,
                props: {
                    kellerraum: [
                        [
                            'set_plan_pre_setup',
                            'set_plan_wall',
                        ],
                        [
                            'set_plan_wall',
                        ],
                        [
                            'set_plan_garage',
                            'set_plan_setup',
                            'set_plan_computer',
                        ],
                    ],
                    Mechanic: [
                        [
                            '',
                        ],
                        [
                            'set_plan_mechanic',
                        ],
                    ],
                    Hacker: [
                        [
                            '',
                        ],
                        [
                            'set_plan_hacker',
                        ],
                    ],
                    Weapons: [
                        [
                            '',
                        ],
                        [
                            'set_plan_weapons',
                        ],
                    ],
                    Wardrobe: [
                        [
                            '',
                        ],
                        [
                            'set_plan_bed',
                        ],
                    ],
                    CasinoPlan: [
                        [
                            '',
                        ],
                        [
                            'set_plan_casino',
                        ],
                    ],
                    CasinoDoor: [
                        [
                            '',
                        ],
                        [
                            'set_plan_vault',
                        ],
                    ],
                },
                allprops: [
                    'set_plan_pre_setup',
                    'set_plan_wall',
                    'set_plan_setup',
                    'set_plan_computer',
                    'set_plan_mechanic',
                    'set_plan_hacker',
                    'set_plan_weapons',
                    'set_plan_bed',
                    'set_plan_garage',
                    'set_plan_casino',
                    'set_plan_vault',
                ],
            },
        }

        const nightclub = {
            interiorName: 'ba_int_placement_ba_interior_0_dlc_int_01_ba_milo_',
            interiorID: 271617,
            props: {
                interrior: [
                    [
                        '',
                    ],
                    [
                        'Int01_ba_Style01',
                    ],
                    [
                        'Int01_ba_Style02',
                    ],
                    [
                        'Int01_ba_Style03',
                    ],
                ],
                drinks: [
                    [
                        '',
                    ],
                    [
                        '',
                    ],
                    [
                        'Int01_ba_booze_01',
                    ],
                    [
                        'Int01_ba_booze_02',
                    ],
                    [
                        'Int01_ba_booze_03',
                    ],
                ],
                lights: [
                    [
                        '',
                    ],
                    [
                        '',
                    ],
                    [
                        'dj_01_lights_01',
                    ],
                    [
                        'dj_01_lights_02',
                    ],
                    [
                        'dj_01_lights_03',
                    ],
                    [
                        'dj_02_lights_01',
                    ],
                    [
                        'dj_02_lights_02',
                    ],
                    [
                        'dj_02_lights_03',
                    ],
                    [
                        'dj_03_lights_01',
                    ],
                    [
                        'dj_03_lights_02',
                    ],
                    [
                        'dj_03_lights_03',
                    ],
                    [
                        'dj_04_lights_01',
                    ],
                    [
                        'dj_04_lights_02',
                    ],
                    [
                        'dj_04_lights_03',
                    ],
                ],
                effects: [
                    [
                        '',
                    ],
                    [
                        '',
                    ],
                    [
                        'dj_01_lights_04',
                    ],
                    [
                        'dj_02_lights_04',
                    ],
                    [
                        'dj_03_lights_04',
                    ],
                    [
                        'dj_04_lights_04',
                    ],
                ],
                clubname: [
                    [
                        '',
                    ],
                    [
                        '',
                    ],
                    [
                        'Int01_ba_clubname_01',
                    ],
                    [
                        'Int01_ba_clubname_02',
                    ],
                    [
                        'Int01_ba_clubname_03',
                    ],
                    [
                        'Int01_ba_clubname_04',
                    ],
                    [
                        'Int01_ba_clubname_05',
                    ],
                    [
                        'Int01_ba_clubname_06',
                    ],
                    [
                        'Int01_ba_clubname_07',
                    ],
                    [
                        'Int01_ba_clubname_08',
                    ],
                    [
                        'Int01_ba_clubname_09',
                    ],
                ],
                entrylights: [
                    [
                        '',
                    ],
                    [
                        '',
                    ],
                    [
                        'Int01_ba_trad_lights',
                    ],
                ],
                security: [
                    [
                        '',
                    ],
                    [
                        '',
                    ],
                    [
                        'Int01_ba_security_upgrade',
                    ],
                ],
            },
            allprops: [
                'Int01_ba_Style01',
                'Int01_ba_Style02',
                'Int01_ba_Style03',
                'Int01_ba_booze_01',
                'Int01_ba_booze_02',
                'Int01_ba_booze_03',
                'dj_01_lights_01',
                'dj_01_lights_02',
                'dj_01_lights_03',
                'dj_02_lights_01',
                'dj_02_lights_02',
                'dj_02_lights_03',
                'dj_03_lights_01',
                'dj_03_lights_02',
                'dj_03_lights_03',
                'dj_04_lights_01',
                'dj_04_lights_02',
                'dj_04_lights_03',
                'dj_01_lights_04',
                'dj_02_lights_04',
                'dj_03_lights_04',
                'dj_04_lights_04',
                'Int01_ba_clubname_01',
                'Int01_ba_clubname_02',
                'Int01_ba_clubname_03',
                'Int01_ba_clubname_04',
                'Int01_ba_clubname_05',
                'Int01_ba_clubname_06',
                'Int01_ba_clubname_07',
                'Int01_ba_clubname_08',
                'Int01_ba_clubname_09',
                'Int01_ba_trad_lights',
                'Int01_ba_security_upgrade',
            ],
        }

        const doomsday = {
            interiorID: 269313,

            ipls: [
                'sm_smugdlc_interior_placement',
                'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_',
                'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_',
                'xm_x17dlc_int_placement',
                'xm_x17dlc_int_placement_interior_0_x17dlc_int_base_ent_milo_',
                'xm_x17dlc_int_placement_interior_10_x17dlc_int_tun_straight_milo_',
                'xm_x17dlc_int_placement_interior_11_x17dlc_int_tun_slope_flat_milo_',
                'xm_x17dlc_int_placement_interior_12_x17dlc_int_tun_flat_slope_milo_',
                'xm_x17dlc_int_placement_interior_13_x17dlc_int_tun_30d_r_milo_',
                'xm_x17dlc_int_placement_interior_14_x17dlc_int_tun_30d_l_milo_',
                'xm_x17dlc_int_placement_interior_15_x17dlc_int_tun_straight_milo_',
                'xm_x17dlc_int_placement_interior_16_x17dlc_int_tun_straight_milo_',
                'xm_x17dlc_int_placement_interior_17_x17dlc_int_tun_slope_flat_milo_',
                'xm_x17dlc_int_placement_interior_18_x17dlc_int_tun_slope_flat_milo_',
                'xm_x17dlc_int_placement_interior_19_x17dlc_int_tun_flat_slope_milo_',
                'xm_x17dlc_int_placement_interior_1_x17dlc_int_base_loop_milo_',
                'xm_x17dlc_int_placement_interior_20_x17dlc_int_tun_flat_slope_milo_',
                'xm_x17dlc_int_placement_interior_21_x17dlc_int_tun_30d_r_milo_',
                'xm_x17dlc_int_placement_interior_22_x17dlc_int_tun_30d_r_milo_',
                'xm_x17dlc_int_placement_interior_23_x17dlc_int_tun_30d_r_milo_',
                'xm_x17dlc_int_placement_interior_24_x17dlc_int_tun_30d_r_milo_',
                'xm_x17dlc_int_placement_interior_25_x17dlc_int_tun_30d_l_milo_',
                'xm_x17dlc_int_placement_interior_26_x17dlc_int_tun_30d_l_milo_',
                'xm_x17dlc_int_placement_interior_27_x17dlc_int_tun_30d_l_milo_',
                'xm_x17dlc_int_placement_interior_28_x17dlc_int_tun_30d_l_milo_',
                'xm_x17dlc_int_placement_interior_29_x17dlc_int_tun_30d_l_milo_',
                'xm_x17dlc_int_placement_interior_2_x17dlc_int_bse_tun_milo_',
                'xm_x17dlc_int_placement_interior_30_v_apart_midspaz_milo_',
                'xm_x17dlc_int_placement_interior_31_v_studio_lo_milo_',
                'xm_x17dlc_int_placement_interior_32_v_garagem_milo_',
                'xm_x17dlc_int_placement_interior_33_x17dlc_int_02_milo_',
                'xm_x17dlc_int_placement_interior_34_x17dlc_int_lab_milo_',
                'xm_x17dlc_int_placement_interior_35_x17dlc_int_tun_entry_milo_',
                'xm_x17dlc_int_placement_interior_3_x17dlc_int_base_milo_',
                'xm_x17dlc_int_placement_interior_4_x17dlc_int_facility_milo_',
                'xm_x17dlc_int_placement_interior_5_x17dlc_int_facility2_milo_',
                'xm_x17dlc_int_placement_interior_6_x17dlc_int_silo_01_milo_',
                'xm_x17dlc_int_placement_interior_7_x17dlc_int_silo_02_milo_',
                'xm_x17dlc_int_placement_interior_8_x17dlc_int_sub_milo_',
                'xm_x17dlc_int_placement_interior_9_x17dlc_int_01_milo_',
                'xm_x17dlc_int_placement_strm_0',
                'xm_prop_x17_tem_control_01',
                'xm_prop_x17_l_door_glass_01',
                'xm_prop_x17_l_door_frame_01',
                'xm_prop_x17_l_glass_01',
                'xm_prop_x17_l_glass_02',
                'xm_prop_x17_l_glass_03',
                'xm_prop_x17_l_frame_01',
                'xm_prop_x17_l_frame_02',
                'xm_prop_x17_l_frame_03',
                'xm_bunkerentrance_door',
                'xm_hatch_01_cutscene',
                'xm_hatch_02_cutscene',
                'xm_hatch_03_cutscene',
                'xm_hatch_04_cutscene',
                'xm_hatch_06_cutscene',
                'xm_hatch_07_cutscene',
                'xm_hatch_08_cutscene',
                'xm_hatch_09_cutscene',
                'xm_hatch_10_cutscene',
                'xm_hatch_closed',
                'xm_hatches_terrain',
                'xm_hatches_terrain_lod',
                'xm_mpchristmasadditions',
                'xm_siloentranceclosed_x17',
            ],

            // Commented are switchable props.
            props: [
                'set_int_02_shell',
                'set_int_02_lounge1',
                // 'set_int_02_lounge2',
                // 'set_int_02_lounge3',
                // 'set_int_02_no_sleep',
                'set_int_02_sleep',
                // 'set_int_02_sleep2',
                // 'set_int_02_sleep3',
                // 'set_int_02_no_security',
                'set_int_02_security',
                // 'set_int_02_no_cannon',
                'set_int_02_cannon',
                'set_int_02_decal_01',
                // 'set_int_02_decal_02',
                // 'set_int_02_decal_03',
                // 'set_int_02_decal_04',
                // 'set_int_02_decal_05',
                // 'set_int_02_decal_06',
                // 'set_int_02_decal_07',
                // 'set_int_02_decal_08',
                // 'set_int_02_decal_09',
                'set_int_02_trophy1',
                // 'set_int_02_trophy_iaa',
                // 'set_int_02_trophy_sub',
                'Set_Int_02_Parts_Panther1',
                // 'Set_Int_02_Parts_Panther2',
                // 'Set_Int_02_Parts_Panther3',
                'Set_Int_02_Parts_Riot1',
                // 'Set_Int_02_Parts_Riot2',
                // 'Set_Int_02_Parts_Riot3',
                'Set_Int_02_Parts_Cheno1',
                // 'Set_Int_02_Parts_Cheno2',
                // 'Set_Int_02_Parts_Cheno3',
                'Set_Int_02_Parts_Thruster1',
                // 'Set_Int_02_Parts_Thruster2',
                // 'Set_Int_02_Parts_Thruster3',
                'Set_Int_02_Parts_Avenger1',
                // 'Set_Int_02_Parts_Avenger2',
                // 'Set_Int_02_Parts_Avenger3',
                'set_int_02_clutter1',
                'set_int_02_clutter2',
                'set_int_02_clutter3',
                'set_int_02_clutter4',
                'set_int_02_clutter5',
                'set_int_02_crewemblem',
                'set_int_02_paramedic_complete',
                'set_int_02_forcedentry_complete',
                'set_int_02_aqualungs_complete',
                'set_int_02_daylightrob_complete',
                'set_int_02_burglary_complete',
                'set_int_02_flightrecord_complete',
                'Set_Int_02_outfit_serverfarm',
            ],
        }
        mp.events.add("setRemoteHashKey", (key) => {
            this.remoteHashKey = key;
        })
        mp.events.add('loadDoomsDayBunker', () => {
            doomsday.props.forEach(p => {
                mp.game.interior.enableInteriorProp(doomsday.interiorID, p)
                mp.game.invoke('0xC1F1920BAF281317', doomsday.interiorID, p, 1)
            })

            doomsday.ipls.forEach(ipl => {
                mp.game.streaming.requestIpl(ipl)
            })

            mp.game.interior.refreshInterior(doomsday.interiorID)
        })

        mp.events.add('unloadDoomsDayBunker', () => {
            doomsday.props.forEach(p => {
                mp.game.interior.disableInteriorProp(doomsday.interiorID, p)
            })
        })

        mp.events.add('unloadNightclubInterrior', () => {
            nightclub.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(nightclub.interiorID, prop)
            })

            mp.game.interior.refreshInterior(nightclub.interiorID)
        })

        mp.events.add('loadNightclubInterrior', (style, drinks, lights, effects, clubName, entryLight, security) => {
            mp.game.streaming.requestIpl(nightclub.interiorName)

            nightclub.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(nightclub.interiorID, prop)
            })

            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.interrior[parseInt(style)][0])
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.drinks[parseInt(drinks)][0])
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.lights[parseInt(lights)][0])
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.effects[parseInt(effects)][0])
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.clubname[parseInt(clubName)][0])
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.entrylights[parseInt(entryLight)][0])
            mp.game.interior.enableInteriorProp(nightclub.interiorID, nightclub.props.security[parseInt(security)][0])

            mp.game.interior.refreshInterior(nightclub.interiorID)
        })

        const blackmoneyCleanInterior = {
            interiorName: 'bkr_biker_interior_placement_interior_6_biker_dlc_int_ware05_milo',
            interiorID: 247809,
            props: ['counterfeit_setup', 'counterfeit_upgrade_equip', 'counterfeit_security', 'money_cutter', 'counterfeit_cashpile100a', 'counterfeit_cashpile100b', 'counterfeit_cashpile100c', 'counterfeit_cashpile100d'],
        }

        const guenther = {
            interiorName: 'imp_sm_13_cargarage_a',
            interiorID: 255489,
            props: {
                room: ['garage_decor_04', 'numbering_style03_n1', 'lighting_option08'],
            },
        }

        const lsc_hangar = {
            interiorName: 'sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_',
            interiorID: 260353,
            props: ['set_tint_shell', 'set_floor_1', 'set_floor_decal_3', 'set_modarea', 'set_office_modern', 'set_bedroom_modern', 'set_bedroom_tint', 'set_lightning_hangar_c', 'set_lightning_wall_tint01'],
        }

        //IPLs hei_dlc_casino_door, hei_dlc_windows_casino

        mp.game.streaming.requestIpl('hei_dlc_casino_door')
        mp.game.streaming.requestIpl('hei_dlc_windows_casino')

        const intId = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164)
        props.forEach(p => {
            mp.game.interior.enableInteriorProp(intId, p)
            mp.game.invoke('0xC1F1920BAF281317', intId, p, 1)
        })
        mp.game.interior.refreshInterior(intId)

        mp.game.streaming.requestIpl(guenther.interiorName)
        mp.game.interior.refreshInterior(guenther.interiorID)

        mp.events.add('OnPlayerReady', player => {
            mp.gui.chat.show(false)
            mp.gui.chat.activate(false)
        })

        mp.events.add('updateAduty', aduty => {
            this.aduty = aduty
            this.invincible = aduty;
            playerPanel.setAduty(aduty)
        })

        mp.events.add('setActiveRingtone', (id) => {
            this.activeRingtone = id
        })

        mp.events.add('nagelband', () => {
            if (this.isInAnyVehicle(true)) {
                let vehicle = mp.players.local.vehicle;

                if (vehicle != null) {
                    vehicle.setTyreBurst(0, false, 1000);
                    vehicle.setTyreBurst(1, false, 1000);
                    vehicle.setTyreBurst(4, false, 1000);
                    vehicle.setTyreBurst(5, false, 1000);
                }
            }
        })

        mp.events.add('createObject', object => {

            this.buildingmode = true;

            this.buildingobject = []
            this.buildingobject.hash = object
            this.buildingobject.pos = mp.players.local.position;
            this.buildingobject.rot = new mp.Vector3(0, 0, mp.players.local.heading);
            this.buildingobject.obj = mp.objects.new(object, this.buildingobject.pos, {
                rotation: this.buildingobject.rot,
                alpha: 255,
                dimension: mp.players.local.dimension
            });
            mp.game.graphics.notify("object created.");

        })


        mp.events.add('closeObjectEditor', object => {
            this.buildingmode = false;

            this.buildingobject = []
        })

        mp.events.add('responsePushToTalkSound', bool => {
            playerPanel.responsePPTSound(bool)
        })

        mp.events.add('isPlayerSwimming', () => {
            if (mp.players.local.isSwimmingUnderWater() || mp.players.local.isSwimming()) {
                mp.events.callRemote('swimmingOrDivingResponse', true, this.remoteHashKey)
            } else {
                mp.events.callRemote('swimmingOrDivingResponse', false, this.remoteHashKey)
            }
        })

        mp.events.add('updateWanteds', wanteds => {
            this.wanteds = wanteds
            playerPanel.setWanteds(wanteds)
        })

        mp.events.add('updateMoney', money => {
            this.money = money
            playerPanel.setMoney(money)
        })

        mp.events.add('updateAirRadio', state => {
            playerPanel.setAirRadio(state)
        })

        mp.events.add('setAirRadio', state => {
            playerPanel.setAirRadioState(state)
        })

        mp.events.add('setNutrition', (eating, drinking) => {
            playerPanel.setNutritionEating(eating)
            playerPanel.setNutritionDrinking(drinking)
        })

        mp.events.add('setNutritionEating', state => {
            playerPanel.setNutritionEating(state)
        })

        mp.events.add('setNutritionDrinking', state => {
            playerPanel.setNutritionDrinking(state)
        })

        mp.events.add('updateBlackMoney', money => {
            this.blackmoney = money
            playerPanel.setBlackmoney(money)
        })

        mp.events.add('updateTeamId', teamId => {
            this.team = teamId
        })

        mp.events.add('updateTeamRank', teamRank => {
            this.teamRank = teamRank
        })

        mp.events.add('loadisland', status => {
            mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", status);
            mp.game.invoke("0x5E1460624D194A38", status);
        })

        mp.events.add('updateGvmpTeamRank', gvmpTeamRank => {
            this.gvmpTeamRank = gvmpTeamRank
        })

        mp.events.add('updateInjured', injured => {
            this.injured = injured
        })

        mp.events.add('updateDuty', duty => {
            this.duty = duty
        })

        mp.events.add('setcustommarks', (key, shtrange, data) => {

            if (this.custommarkers[key] == null) {
                this.custommarkers[key] = [];
            }

            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark.destroy();

                })
            }
            this.custommarkers[key] = JSON.parse(data);

            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark = mp.blips.new(customMarker.id, customMarker.pos, {
                        name: customMarker.name,
                        color: customMarker.color,
                        shortRange: shtrange,
                    });
                })
            }
        })

        mp.events.add('clearcustommarks', (key) => {

            if (this.custommarkers[key] == null) {
                this.custommarkers[key] = [];
                return;
            }
            if (this.custommarkers[key].length > 0) {
                this.custommarkers[key].forEach(customMarker => {
                    customMarker.mark.destroy();

                })
            }
            this.custommarkers[key] = [];
        })


        mp.events.add('setCheckpoint', (x, y, z) => {

            if (this.currentCheckpoint != null) {
                this.currentCheckpoint.destroy();
                this.currentCheckpoint = null;
            }

            this.currentCheckpoint = mp.markers.new(1, new mp.Vector3(x, y, z - 1.0), 1.2, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 255],
                visible: true,
                dimension: 0,
            });
        })

        mp.events.add('clearCheckpoint', () => {

            if (this.currentCheckpoint != null) {
                this.currentCheckpoint.destroy();
                this.currentCheckpoint = null;
                return;
            }
        })

        mp.events.add('createCustomObjects', (key, data) => {

            if (this.customObjects[key] == null) {
                this.customObjects[key] = [];
            }

            if (this.customObjects[key].length > 0) {
                this.customObjects[key].forEach(customObj => {
                    customObj.destroy();

                })
            }
            let objectsData = JSON.parse(data);
            let objects = [];

            if (objectsData !== undefined && objectsData.length > 0) {
                objectsData.forEach(objData => {
                    objects.push(mp.objects.new(objData.objectid, objData.pos, {
                        rotation: objData.rot,
                        alpha: 255,
                        dimension: 0
                    }));
                })

                this.customObjects[key] = objects;
            }
        })

        mp.events.add('removeCustomObjects', (key) => {

            if (this.customObjects[key] == null) {
                this.customObjects[key] = [];
                return;
            }
            if (this.customObjects[key].length > 0) {
                this.customObjects[key].forEach(customObj => {
                    customObj.destroy();

                })
            }
            this.customObjects[key] = [];
        })

        mp.events.add('removeAcMark', () => {
            if (this.acMark1 !== undefined) {
                this.acMark1.destroy();
                this.acMark1 = undefined;
            }
            if (this.acMark2 !== undefined) {
                this.acMark2.destroy();
                this.acMark2 = undefined;
            }
        })

        mp.events.add('setAcMark', (pos1, pos2) => {
            this.acMark1 = mp.blips.new(682, pos1, {
                name: "AC1",
                color: 2,
                shortRange: false,
            });
            this.acMark2 = mp.blips.new(682, pos2, {
                name: "AC2",
                color: 1,
                shortRange: false,
            });
        })

        mp.events.add('updateCuffed', cuffed => {
            this.cuffed = cuffed
        })

        mp.events.add('updateTied', tied => {
            this.tied = tied
        })

        mp.events.add('updateVoiceState', state => {
            this.state = state
        })

        mp.events.add('setCurrentWeapon', id => {
            this.currentWeapon = id
        })

        mp.events.add('emptyWeaponAmmo', id => {
            this.currentWeapon = 0
            this.weaponAmmo = []
            for (var x in this.weaponAmmo) {
                let ammo = this.weaponAmmo[x].ammo
            }
        })

        mp.events.add('setPlayerGpsMarker', (x, y) => {
            mp.game.ui.setNewWaypoint(x, y)
        })

        mp.events.add('getWeaponAmmo', () => {
            mp.events.callRemote('getWeaponAmmoAnswer', JSON.stringify(this.weaponAmmo), this.remoteHashKey)
        })

        mp.events.add('fillWeaponAmmo', (id, ammo) => {
            this.weaponAmmo.push({
                id: id,
                ammo: ammo
            })
        })

        mp.events.add('updateWeaponAmmo', (id, ammo) => {
            for (var x in this.weaponAmmo) {
                if (this.weaponAmmo[x].id != id) {
                    continue
                }

                this.weaponAmmo[x].ammo = ammo
            }
        })


        mp.events.add('onPlayerLoaded', (firstName, lastName, playerId, academicPoints, business, gwdNote, money, wanteds, house, team, teamRank, level, injured, duty, tied, cuffed, voiceHash, state, phone, job, jobsSkill, animations, gvmpTeamRank, weaponDmg, playerSync, vehicleSync, blackmoney, ringtone, insurance1, zwdNote, meleeDmg, dmglg) => {
            this.firstName = firstName
            this.lastName = lastName
            this.playerId = playerId
            this.academicPoints = academicPoints
            this.business = business
            this.gwdNote = gwdNote
            this.zwdNote = zwdNote
            this.money = money
            this.wanteds = wanteds
            this.superjump = false
            this.house = house
            this.team = team
            this.teamRank = teamRank
            this.level = level
            this.injured = injured
            this.duty = duty
            this.tied = tied
            this.cuffed = cuffed
            this.voiceHash = voiceHash
            this.state = state
            this.phone = phone
            this.job = job
            this.jobsSkill = jobsSkill
            this.insurance = insurance1
            this.animations = JSON.parse(animations)
            this.gvmpTeamRank = gvmpTeamRank
            this.playerSync = playerSync
            this.vehicleSync = vehicleSync
            this.blackmoney = blackmoney
            this.attachmentsync = true
            this.activeRingtone = ringtone
            this.weaponDmg = weaponDmg;
            this.meleeDmg = meleeDmg;
            this.dmglg = dmglg;

            hud.setVisible(true);
            playerPanel.setMoney(money);
            playerPanel.setBlackmoney(blackmoney);
            playerPanel.setWanteds(wanteds);
            playerInfo.setPlayerId(playerId);
            playerInfo.setVoiceHash(voiceHash);

            mp.game.controls.useDefaultVehicleEntering = false

            mp.game.player.setWeaponDamageModifier(this.weaponDmg);
            mp.game.player.setMeleeWeaponDamageModifier(this.meleeDmg);

            this.ready = true
            render();
        })

        mp.events.add('loadClientIpl', (ipl) => {
            mp.game.streaming.requestIpl(ipl)
        })

        mp.events.add('setVoiceHash', (voiceHash) => {
            this.voiceHash = voiceHash;
        })

        mp.events.add('unloadClientIpl', (ipl) => {
            mp.game.streaming.removeIpl(ipl)
        })

        mp.events.add('updateWeather', (weatherString) => {
            mp.game.gameplay.setWeatherTypeNowPersist(weatherString)
        })

        mp.events.add('setWeatherTransition', (weatherString, transitionTime) => {
            mp.game.gameplay.setWeatherTypeOverTime(weatherString, transitionTime)
        })

        const render = async() => {
            while (true) {
                if (this.ready === false) {
                    await mp.game.waitAsync(50);
                    continue;
                }

                if (mp.game.invoke('0x26AF0E8E30BD2A2C', mp.players.local.handle, true)) {
                    this.isOpeningDoor = true
                } else {
                    if (this.isOpeningDoor) {
                        this.isOpeningDoor = false
                        await this.checkAnimations(mp.players.local)
                    }
                }

                if (mp.players.local.isInWater() && this.isInWater === false) {
                    this.isInWater = true
                    mp.events.callRemote('UpdatePlayerWaterState', true, this.remoteHashKey)
                } else {
                    if (mp.players.local.isInWater() === false && this.isInWater === true) {
                        this.isInWater = false
                        mp.events.callRemote('UpdatePlayerWaterState', true, this.remoteHashKey)
                    }
                }

                if (mp.players.local.hasCollidedWithAnything()) {
                    this.HasCollided = true
                } else {
                    if (this.HasCollided === true) {
                        this.HasCollided = false
                        await this.checkAnimations(mp.players.local)
                    }
                }

                if (mp.players.local.isRagdoll()) {
                    this.HasRagdall = true
                } else {
                    if (this.HasRagdall === true) {
                        this.HasRagdall = false
                        let that = this
                        setTimeout(async function() {
                            await that.checkAnimations(mp.players.local)
                        }, 2000)
                    }
                }

                await mp.game.waitAsync(50);
            }
        }

        mp.events.add('setPlayerDamageMultiplier', (weaponDmg) => {
            this.weaponDmg = weaponDmg;
            mp.game.player.setWeaponDamageModifier(weaponDmg);
        })

        mp.events.add('setPlayerMeleeDamageMultiplier', (weaponDmg) => {
            this.meleeDmg = weaponDmg;
            mp.game.player.setMeleeWeaponDamageModifier(this.meleeDmg);
        })

        mp.events.add('setDmgLg', (state) => {
            this.dmglg = state;
        })

        mp.events.add('setNMenuItems', data => {
            this.animations = JSON.parse(data)
        })

        mp.events.add('onPlayerContactsLoaded', contacts => {
            this.contacts.parseContacts(contacts)
        })

        mp.events.add('setPlayerAduty', state => {
            mp.players.local.setInvincible(state)
            mp.nametags.enabled = state
            playerPanel.setAduty(state)
            this.invincible = state;
        })

        mp.events.add('loadMethInterior', (table, boiler, security) => {
            mp.game.streaming.requestIpl(methlaboratory.interiorName)
            methlaboratory.props.table.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop)
            })
            methlaboratory.props.boiler.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop)
            })
            methlaboratory.props.security.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop)
            })
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.table[table])
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.boiler[boiler])
            mp.game.interior.enableInteriorProp(methlaboratory.interiorID, methlaboratory.props.security[security])
            mp.game.interior.refreshInterior(methlaboratory.interiorID)
        })

        mp.events.add('carmod', (vehicle, slot, tuning) => {
            if (vehicle == null) {
                return
            }
            vehicle.setMod(parseInt(slot), parseInt(tuning))
        })

        mp.events.add('livery', (vehicle, liveryindex) => {
            mp.game.invoke("0x60BF608F1B8CD1B6", vehicle.handle, liveryindex);
        })

        mp.events.add('unloadMethInterior', () => {
            methlaboratory.props.table.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop)
            })
            methlaboratory.props.boiler.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop)
            })
            methlaboratory.props.security.forEach(prop => {
                mp.game.interior.disableInteriorProp(methlaboratory.interiorID, prop)
            })
            mp.game.streaming.requestIpl(methlaboratory.interiorName)
            mp.game.interior.refreshInterior(methlaboratory.interiorID)
        })

        mp.events.add('loadblackmoneyInterior', () => {
            mp.game.streaming.requestIpl(blackmoneyCleanInterior.interiorName)
            blackmoneyCleanInterior.props.forEach(prop => {
                mp.game.interior.enableInteriorProp(blackmoneyCleanInterior.interiorID, prop)
            })
            mp.game.interior.refreshInterior(blackmoneyCleanInterior.interiorID)
        })

        mp.events.add('unloadblackmoneyInterior', () => {
            blackmoneyCleanInterior.props.forEach(prop => {
                mp.game.interior.disableInteriorProp(blackmoneyCleanInterior.interiorID, prop)
            })
            mp.game.interior.refreshInterior(blackmoneyCleanInterior.interiorID)
        })

        mp.events.add('loadguenther', () => {
            mp.game.streaming.requestIpl(guenther.interiorName)
            guenther.props.room.forEach(prop => {
                mp.game.interior.enableInteriorProp(guenther.interiorID, prop)
            })
            mp.game.interior.refreshInterior(guenther.interiorID)
        })

        mp.events.add('unloadguenther', () => {
            mp.game.streaming.requestIpl(guenther.interiorName)
            guenther.props.room.forEach(prop => {
                mp.game.interior.disableInteriorProp(guenther.interiorID, prop)
            })
            mp.game.interior.refreshInterior(guenther.interiorID)
        })

        mp.events.add('loadlschangar', () => {
            mp.game.streaming.requestIpl(lsc_hangar.interiorName)
            lsc_hangar.props.forEach(prop => {
                mp.game.interior.enableInteriorProp(lsc_hangar.interiorID, prop)
                mp.game.invoke('0xC1F1920BAF281317', lsc_hangar.interiorID, prop, 2)
            })
            mp.game.interior.refreshInterior(lsc_hangar.interiorID)
        })

        mp.events.add('unloadlschangar', () => {
            lsc_hangar.props.forEach(prop => {
                mp.game.interior.disableInteriorProp(lsc_hangar.interiorID, prop)
            })
            mp.game.streaming.requestIpl(lsc_hangar.interiorName)
            mp.game.interior.refreshInterior(lsc_hangar.interiorID)
        })

        mp.events.add("updatesuperjump", sj => {
            this.superjump = sj
        })

        mp.events.add('loadplanningroom', (grundraum, spiegel, einrichtungsstyle, inneneinrichtung, spielautomaten, rewards, keller, mechanic, hacker, weapons, wardrobe, casinoplan, casinodoor) => {
            // Request both ipls
            mp.game.streaming.requestIpl(planningroom.arcade.interiorName)
            mp.game.streaming.requestIpl(planningroom.plan.interiorName)

            // Dissable all props
            planningroom.arcade.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop)
            })
            planningroom.plan.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.plan.Id, prop)
            })

            // Load propertys arcade
            planningroom.arcade.props.grundraum[parseInt(grundraum)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop)
            })
            planningroom.arcade.props.spiegel[parseInt(spiegel)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop)
            })
            planningroom.arcade.props.einrichtungsstyle[parseInt(einrichtungsstyle)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop)
            })
            planningroom.arcade.props.inneneinrichtung[parseInt(inneneinrichtung)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop)
            })
            planningroom.arcade.props.spielautomaten[parseInt(spielautomaten)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, prop)
            })
            var rewardIds = JSON.parse(rewards)
            rewardIds.forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.arcade.Id, planningroom.arcade.props.rewards[parseInt(prop)])
            })

            // Load propertys plan
            planningroom.plan.props.kellerraum[parseInt(keller)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            planningroom.plan.props.Mechanic[parseInt(mechanic)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            planningroom.plan.props.Hacker[parseInt(hacker)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            planningroom.plan.props.Weapons[parseInt(weapons)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            planningroom.plan.props.Wardrobe[parseInt(wardrobe)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            planningroom.plan.props.CasinoPlan[parseInt(casinoplan)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            planningroom.plan.props.CasinoDoor[parseInt(casinodoor)].forEach(prop => {
                mp.game.interior.enableInteriorProp(planningroom.plan.Id, prop)
            })

            // Reload
            mp.game.interior.refreshInterior(planningroom.arcade.Id)
            mp.game.interior.refreshInterior(planningroom.plan.Id)
        })

        mp.events.add('attachmeto', (target) => {
            mp.players.local.attachTo(target.handle, target.getBoneIndex(28422), 0, 0, 0, 0, 0, 0, false, false, false, false, 2, true);
        })

        mp.events.add('unloadplanningroom', () => {
            planningroom.arcade.allprops.forEach(prop => {
                mp.game.interior.disableInteriorProp(planningroom.arcade.Id, prop)
            })
            mp.game.streaming.requestIpl(planningroom.arcade.interiorName)
            mp.game.interior.refreshInterior(planningroom.arcade.Id)
        })

        mp.events.add('destroydrugped', () => {
            if (this.spawnedDrugPed != null) {
                this.spawnedDrugPed.destroy()
                this.spawnedDrugPed = null
            }
        })

        mp.events.add('loadprop', (propname, color, x, y, z) => {
            var myInteriorId = mp.game.interior.getInteriorAtCoords(parseFloat(x), parseFloat(y), parseFloat(z))
            mp.game.interior.enableInteriorProp(parseInt(myInteriorId), String(propname))
            mp.game.invoke('0xC1F1920BAF281317', parseInt(myInteriorId), String(propname), parseInt(color))
            mp.game.interior.refreshInterior(parseInt(myInteriorId))
        })

        mp.events.add('removeprop', (propname, x, y, z) => {
            var myInteriorId = mp.game.interior.getInteriorAtCoords(parseFloat(x), parseFloat(y), parseFloat(z))
            mp.game.interior.disableInteriorProp(parseInt(myInteriorId), String(propname))
            mp.game.interior.refreshInterior(parseInt(myInteriorId))
        })

        var checkpoints = []

        mp.events.add('loadcheckpoint', () => {
            for (let i = 0; i < 10; i++) {
                let checkpoint = mp.checkpoints.new(1, new mp.Vector3(20 * i, 20 * i, 100), 10, {
                    direction: new mp.Vector3(0, 0, 75),
                    color: [255, 255, 255, 255],
                    visible: true,
                    dimension: 0,
                })
                checkpoint.destination = new mp.Vector3(20 * (i + 1), 20 * (i + 1), 100)
                checkpoints.push(checkpoint)
            }
        })

        mp.events.add('unloadcheckpoint', () => {
            checkpoints.forEach(element => {
                element.destroy()
            })
        })

        var raceMarker

        mp.events.add('startRace', (x, y, z, dim) => {
            mp.game.ui.setNewWaypoint(x, y)
            raceMarker = mp.markers.new(4, new mp.Vector3(x, y, z), 5.0, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [0, 255, 0, 255],
                visible: true,
                dimension: dim,
            })
        })

        mp.events.add('endRace', () => {
            if (raceMarker != null)
                raceMarker.destroy()
        })

        var setMarkMarker

        mp.events.add('setmark', (x, y, z, dim) => {
            if (setMarkMarker != null) {
                setMarkMarker.destroy()
                setMarkMarker = null
            }
            setMarkMarker = mp.markers.new(0, new mp.Vector3(x, y, z), 1.0, {
                direction: new mp.Vector3(0, 0, 0),
                rotation: new mp.Vector3(0, 0, 0),
                color: [255, 0, 0, 255],
                visible: true,
                dimension: dim,
            })
        })

        //Explosion
        mp.events.add('boom', (x, y, z, exploType) => {
            mp.game.invoke('0xE3AD2BDBAEE269AC', x, y, z, parseInt(exploType), 1, 1, 0, 1065353216, 0)
        })

        //Vehicle Explosion
        mp.events.add('boom2', () => {
            if (!mp.players.local.vehicle) return
            mp.game.invoke('0xBA71116ADF5B514C', mp.players.local.vehicle.handle, true, true)
        })

        mp.events.add('setPlayerCduty', state => {
            this.cduty = state
        })

        mp.events.add('setPlayerNametags', state => {
            mp.nametags.enabled = state
        })

        mp.events.add('setPlayerVehicleMultiplier', value => {
            if (!mp.players.local.vehicle) return
            mp.players.local.vehicle.setEnginePowerMultiplier(value)
            mp.players.local.vehicle.setInvincible(false)
        })

        mp.events.add('createPlayerMarker', destroyLocation => {
            this.marker = mp.markers.new(22, destroyLocation, 2, {
                color: [255, 255, 255, 100],
                visible: true,
            })
        })

        mp.events.add('destroyPlayerMarker', () => {
            this.marker.destroy()
            this.marker = null
        })

        mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
            for (var x in this.weaponAmmo) {
                if (this.weaponAmmo[x].id != this.currentWeapon) {
                    continue
                }
                this.weaponAmmo[x].ammo = this.weaponAmmo[x].ammo - 1
            }
        })

        mp.events.add('setSpawnProtection', state => {
            mp.players.local.setInvincible(state)
            this.invincible = state;
        })

        mp.events.add('setInvincible', state => {
            mp.players.local.setInvincible(state)
            this.invincible = state;
        })

        mp.events.add('setBlackout', state => {
            for (let i = 0; i <= 16; i++) {
                mp.game.graphics.setLightsState(i, state)
            }
        })

        mp.events.add('enableInteriorProp', (id, name) => {
            mp.game.interior.enableInteriorProp(id, name)
        })


        mp.events.add('startsoundplay', (soundName, soundSetName) => {
            mp.game.audio.playSoundFrontend(-1, soundName, soundSetName, true);
        })

        mp.events.add('startmusicevent', async(soundName) => {
            mp.events.call("stopmusicevent");
            mp.game.audio.prepareMusicEvent(soundName);
            await mp.game.waitAsync(1000);
            mp.game.audio.triggerMusicEvent(soundName);
            this.lastMusicEvent = soundName;
        })

        mp.events.add('stopmusicevent', () => {
            if (this.lastMusicEvent !== undefined) {
                mp.game.audio.cancelMusicEvent(this.lastMusicEvent);
                this.lastMusicEvent = undefined;
            }
        })

        mp.events.add('startScreenEffect', (effectName, duration, looped) => {
            mp.game.graphics.startScreenEffect(effectName, duration, looped)
            if (effectName == 'DefaultFlash') {
                mp.game.graphics.transitionToBlurred(250)
            }
        })

        mp.events.add('stopScreenEffect', effectName => {
            mp.game.graphics.stopScreenEffect(effectName)
            if (effectName == 'DefaultFlash') {
                mp.game.graphics.transitionFromBlurred(250)
            }
        })

        mp.events.add('refreshinterior', id => {
            mp.game.interior.refreshInterior(id)
        })


        mp.events.add('setTM', state => {
            mp.game.graphics.setSeethrough(state);
        })

        mp.events.add('setNS', state => {
            mp.game.graphics.setNightvision(state);
        })

        mp.events.add('getInteriorId', () => {
            playernotification.callOnBrowser(`pushPlayerNotification('${mp.game.interior.getInteriorAtCoords(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z)}', '5000')`)
        })

        mp.events.add('disableInteriorProp', (id, name) => {
            mp.game.interior.disableInteriorProp(id, name)
        })

        mp.events.add('entityStreamIn', (entity) => {
            if (entity != null && entity.type == "player") {
                if (!mp.players.exists(entity))
                    return;

                mp.events.callRemote("requestPlayerSyncData", entity, this.remoteHashKey)
            }
        })

        mp.events.add('responsePlayerSyncData', async(player, isDrunk, animationData, crouchState, props, clothes) => {
            try {
                props = JSON.parse(props)
                if (props !== null) {
                    for (const i in props) {
                        player.setPropIndex(parseInt(i), parseInt(props[i][0]), parseInt(props[i][1]), false)
                    }
                }

                await this.setPlayerDrunk(player, isDrunk)

                clothes = JSON.parse(clothes)
                if (clothes !== null) {
                    for (const i in clothes) {
                        player.setComponentVariation(parseInt(i), parseInt(clothes[i][0]), parseInt(clothes[i][1]), 0)
                    }
                }

                animationData = JSON.parse(animationData)
                player.__animationData = animationData
                if (player.__animationData.Active == true) {
                    await this.checkAnimations(player)
                    player.setHeading(player.__animationData.Heading)
                }

                if (crouchState) {
                    player.setMovementClipset("move_ped_crouched", 0.25);
                    player.setStrafeClipset("move_ped_crouched_strafing");
                }
            } catch (e) {
                // Ignore
            }
        })

        mp.events.add('SetOwnAnimData', animationData => {
            try {
                animationData = JSON.parse(animationData)
                mp.players.local.__animationData = animationData
            } catch (e) {
                // Ignore
            }
        })

        mp.events.add('SetAnimDataNear', (player, animationData) => {
            try {
                animationData = JSON.parse(animationData)
                player.__animationData = animationData
            } catch (e) {
                // Ignore
            }
        })

        mp.events.add('setPlayerDrunk', async(player, state) => {
            await this.setPlayerDrunk(player, state)
        })

        mp.events.add('setCloth', (player, slot, drawable, texture) => {
            if (player == null) return;
            player.setComponentVariation(slot, drawable, texture, 0);
        });

        mp.events.add('moveSkyCamera', (player, moveTo, switchType, showGui) => {
            switch (moveTo) {
                case 'up':
                    if (showGui == false) {
                        mp.gui.chat.show(showGui)
                        this.gui = 'false'
                    }

                    mp.game.invoke(this.natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType))

                    break
                case 'down':
                    if (this.gui == 'false') {
                        this.checkCamInAir()
                    }

                    mp.game.invoke(this.natives.SWITCH_IN_PLAYER, player.handle)
                    break
                default:
                    break
            }
        })

        mp.events.add('setSyncDataState', (playerSync, vehicleSync) => {
            this.playerSync = playerSync
            this.vehicleSync = vehicleSync
        })

        mp.discord.update('German V Roleplay', 'GVMP.de')
    }

    async checkAnimations(entity) {
        try {
            if (entity.__animationData != undefined && entity.__animationData != null) {
                if (entity.__animationData.Active == true && !entity.vehicle) {
                    mp.game.streaming.requestAnimDict(entity.__animationData.AnimationDict)
                    while (!mp.game.streaming.hasAnimDictLoaded(entity.__animationData.AnimationDict)) {
                        await mp.game.waitAsync(5)
                    }

                    entity.taskPlayAnim(entity.__animationData.AnimationDict, entity.__animationData.AnimationName, entity.__animationData.AnimationSpeed, 1.0, -1, entity.__animationData.AnimationFlags, 1.0, false, false, false)
                } else {

                }
            } else {

            }
        } catch (e) {
            mp.game.graphics.notify("Exception - Animations: Falls bestehen bleibt, bitte reloggen!")
        }
    }

    checkCamInAir() {
        if (mp.game.invoke(this.natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
            setTimeout(() => {
                this.checkCamInAir()
            }, 400)
        }
    }

    async setPlayerDrunk(player, state) {
        if (state) {
            mp.game.streaming.requestAnimSet('move_m@drunk@verydrunk')

            while (!mp.game.streaming.hasAnimSetLoaded('move_m@drunk@verydrunk')) {
                await mp.game.waitAsync(5)
            }

            player.setMovementClipset('move_m@drunk@verydrunk', 1)
        } else {
            player.resetMovementClipset(0)
        }
    }

    setPlayerChatFlag(flag) {
        this.chatFlag = flag
    }

    getPlayer() {
        return mp.players.local
    }

    calculateVectorDistance(position) {
        return utils.calculateVectorDistance(this.getPlayer().position, position)
    }

    getDistance(position) {
        return utils.getDistance(this.getPlayer().position, position, true)
    }

    isInAnyVehicle() {
        return this.getPlayer().isInAnyVehicle(true)
    }

    isInAir() {
        return this.getPlayer().isInAir()
    }
}

export default new Player()