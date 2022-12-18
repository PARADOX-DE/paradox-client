<template>
    <div id="inventories" class="inventories">
        <div class="inventory card">
            <h4 id="title">Waffen von: {{ weaponData.weaponListObject.PersonToFrisk }}</h4>
            <h6><span class="color-text green">Waffen angelegt:</span></h6>
            <br>
            <div class="inventory-items" id="inventory-items">
                <div
                    class="inventory-item"
                    v-for="weapon in weaponData.weaponListObject.WeaponList"
                    :key="weapon.WeaponName"
                    @mousedown.left="selected(weapon)"
                >
                    <img style="position: relative;" v-bind:src="imagePathFinder(weapon.WeaponIcon)" @error="img/itemImages/sorry.png" />
                    <span class="badge" style="position: absolute; right: 5px; bottom: 5px;">
                        {{ weapon.WeaponCount }}
                    </span>
                </div>
            </div>
            <br>
            <div v-if="usageItem && usageItem.WeaponName">
                <span>Aktuell ausgewählt: </span><span class="color-text green">{{ usageItem.WeaponName }}</span>
            </div>
            <br>
            <button
                v-show="weaponData.weaponListObject.CanForceWeaponDrop"
                style="margin-left: 15px;"
                class="btn negative"
                v-on:click="dropWeapons"
            >
                Drop Weapons
            </button>
            <button class="btn flat neutral" v-on:click="closeWeaponFrisk()">Schließen</button>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Frisk',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            usageItem: [],

            weaponData: JSON.parse(this.data),

            // weaponData: JSON.parse("{ \"weaponListObject\": { \"PersonToFrisk\": \"Peter_Sauer\", \"CanForceWeaponDrop\": false, \"WeaponList\": [{ \"WeaponName\": \"Gusenberg\", \"WeaponCount\": 600, \"WeaponIcon\": \"Gusenberg.png\" }] } }"),
        }
    },

    methods: {
        closeFriskWindow () {
            this.dismiss()
        },

        imagePathFinder (url) {
            return 'img/itemImages/' + url
        },

        selected (weapon) {
            this.usageItem = weapon
        },

        dropWeapons () {
            this.triggerServer('closedWeaponFrisk', this.weaponData.weaponListObject.PersonToFrisk, true)
        },

        closeWeaponFrisk () {
            this.triggerServer('closedWeaponFrisk', this.weaponData.weaponListObject.PersonToFrisk, false)
        },
    },
}
</script>


<style lang="scss" scoped>
@import "../../../stylesheets/components/shadow";
@import "../../../stylesheets/components/color";

.inventories {
    z-index: 2;
    display: grid;
    grid-auto-flow: column dense;
    grid-gap: 0 0.5vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: initial;
    height: initial;
    width: initial;
    margin-left: initial;
    margin-right: initial;

    .card{
        background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7));
        color: #fff;
    }

    .inventory {
        .inventory-items {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 2vh;
            overflow-y: scroll;
            height: 30vh;
            padding-right: 25px;
        }
    }

    .inventory-item {
        width: 4vw;
        height: 4vw;
        background: #ccc;

        &.dragged {
            opacity: 0.5;
        }

        &.cloned {
            pointer-events: none;
        }

        &.placeholder {
            outline: 3px dashed hsla(0, 0%, 0%, 0.5);
            outline-offset: -6px;
            transition: transform 0.2s, outline-color 0.1s, outline-width 0.1s;

            &.active {
                outline-color: $orange-500;
                outline-width: 6px;
            }
        }

        &:not(.placeholder) {
            will-change: transform;
            @include box_shadow(1);
            transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            background-color 0.15s linear;

            &:hover {
                background-color: $grey-300;
                @include box_shadow(2);
            }
        }

        img {
            pointer-events: none;
            width: 100%;
            height: auto;
        }
    }
}

.badge {
    padding: 2px 6px 1px 6px;
    font-size: 11px;
    color: #fff;
    letter-spacing: .1px;
    vertical-align: baseline;
    border-radius: 100px;
    background-color: #6dbe70;
    border-color: #6dbe70;
}
</style>