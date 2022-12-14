<template>
    <component :is="window" :data="data"></component>
</template>

<script>
import BaseComponent from './BaseComponent'

import AnimationWheelFavoritesList from './windows/AnimationWheelFavoritesList' // -
import Bank from './windows/Bank.vue' // -
import Bann from './windows/Bann.vue' // -
import Barber from './windows/Barber.vue' // -
import BuyCarShop from './windows/BuyCarShop.vue' // -
import CannabisLabor from './windows/CannabisLabor.vue' // -
import CarColor from './windows/CarColor' // -
import CharacterCreator from './windows/CharacterCreator.vue' // -
import Chat from './windows/Chat.vue' // -
import ClothingShop from './windows/ClothingShop.vue' // -
import Confirmation from './windows/Confirmation.vue' // -
import Death from './windows/Death.vue' // -
import EjectWindow from './windows/EjectWindow.vue' // -
import Equipment from './windows/Equipment.vue' // - Was soll das sein? Eventuell entfernen?
import Flyer from './windows/Flyer' // - Ebenfalls ein Relikt aus alten Zeiten?
import Frisk from './windows/Frisk.vue' // -
import Fullscreen from './windows/Fullscreen.vue' // -
import Garage from './windows/Garage.vue' // -
import GiveMoney from './windows/GiveMoney.vue' // -
import HouseMenue from './windows/HouseMenue.vue' // -
import Insurance from './windows/Insurance.vue' // -
import Inventory from './windows/Inventory.vue' // -
import Keys from './windows/Keys.vue' // -
import Kick from './windows/Kick.vue' // -
import Login from './windows/Login.vue' // -
import MethLabor from './windows/MethLabor.vue' // -
import HeroinLabor from './windows/HeroinLabor.vue' // -
import PetBuy from './windows/PetBuy.vue' // -
import Register from './windows/Register.vue' // - Wird das noch genutzt?
import Rims from './windows/Rims' // -
import RouletteTable from './windows/RouletteTable.vue' // - Wurde glaube noch nie benutzt. Eventuell entfernen?
import Shop from './windows/Shop.vue' // -
import SlotMachine from './windows/SlotMachine.vue' // -
import TattooLicenseShop from './windows/TattooLicenseShop.vue' // -
import TattooShop from './windows/TattooShop.vue' // -
import TextInputBox from './windows/TextInputBox.vue' // -
import VehicleRent from './windows/VehicleRent.vue' // -
import Wardrobe from './windows/Wardrobe' // -
import Workstation from './windows/Workstation.vue' // -
import AdminMenu from './windows/AdminMenu.vue' // AdminMenu
import Tuning from './windows/Tuning.vue' // AdminMenu
import Painting from './windows/Painting.vue' // AdminMenu
import PaymentMethods from './windows/PaymentMethods' // -

export default {
    name: 'Windows',

    extends: BaseComponent,

    data () {
        return {
            window: '',
            data  : {},
        }
    },

    methods: {
        /**
         * Show a specific window with given data.
         *
         * @param name The window name to show.
         * @param data The data to show within the window.
         */
        show (name, data = null) {
            this.data   = data
            this.window = name
        },
    },

    components: {
        AnimationWheelFavoritesList,
        AdminMenu,
        Bank,
        Bann,
        Barber,
        BuyCarShop,
        CannabisLabor,
        CarColor,
        CharacterCreator,
        Chat,
        ClothingShop,
        Confirmation,
        Death,
        EjectWindow,
        Equipment,
        Flyer,
        Frisk,
        Fullscreen,
        Garage,
        GiveMoney,
        HouseMenue,
        Insurance,
        Inventory,
        Keys,
        Kick,
        Login,
        MethLabor,
        PetBuy,
        Register,
        Rims,
        RouletteTable,
        Shop,
        SlotMachine,
        TattooLicenseShop,
        TattooShop,
        TextInputBox,
        VehicleRent,
        Wardrobe,
        Workstation,
        Tuning,
        Painting,
        HeroinLabor,
        PaymentMethods,
    },
}
</script>