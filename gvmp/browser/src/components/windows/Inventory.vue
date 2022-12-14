<template>
    <div>
        <div id="inventories" class="inventories">
            <div class="inventory card" v-for="inventory in inventories" :key="inventory.Id">
                <h4 id="title" style="float:left;">{{ inventory.Name }}</h4>
                <div style="float:right;">
                    <span
                        v-if="inventory.Money != NULL && inventory.Money > 0"
                        class="btn-inventory"
                        style="color:green;"
                    >{{ inventory.Money }} $</span>
                    <button
                        v-if="inventory.Id == inventories[0].Id"
                        class="btn btn-inventory neutral"
                        v-on:click="showKeyWindow"
                    ><i class="fa fa-key fa-fw"></i></button>
                    <button
                        v-if="inventory.Blackmoney > 0"
                        class="btn btn-inventory neutral"
                        v-on:click="packBlackMoney"
                    ><i class="fa fa-hand-holding-usd fa-fw"></i></button>
                    <button class="btn btn-inventory secondary" v-on:click="fillInventorySlots(inventory.Id)">
                        <i class="fa fa-refresh fa-fw"></i></button>
                    <button
                        v-if="inventory.Id == inventories[0].Id"
                        class="btn btn-inventory secondary"
                        v-on:click="packGun"
                    ><img height="16px" width="16px" src="../../assets/icons/pistole.png"></button>
                    <button
                        v-if="inventory.Id == inventories[0].Id"
                        class="btn btn-inventory secondary"
                        v-on:click="packArmor"
                    ><i class="fas fa-shield-alt"></i></button>
                    <button
                        v-if="inventory.Id == inventories[0].Id && !activatedside"
                        class="btn btn-inventory secondary"
                        v-on:click="showSide"
                    ><i class="fas fa-arrow-right sidevisible"></i></button>
                    <button
                        v-if="inventory.Id == inventories[0].Id && activatedside"
                        class="btn btn-inventory secondary"
                        v-on:click="showSide"
                    ><i class="fas fa-arrow-left sidenotvisible"></i></button>
                </div>
                <div style="clear:both;"></div>
                <div class="inventory-content">
                    <h6><span class="color-text green" id="item_weight">{{ inventory.Weight }}</span> / {{
                            inventory.MaxWeight / 1000
                                                                                                      }} KG</h6>
                    <div class="inventory-items" :id="'inventory-items-' + inventory.Id" style="width: 100%">
                        <div
                            class="inventory-item"
                            :slot="item.Slot"
                            v-bind:class="{'placeholder' : !item.Id}"
                            v-for="item in inventory.Slots"
                            :key="item.Id"
                            @mousedown.left="mouseDownLeftInventoryItem($event, item, inventory)"
                            @mousedown.right="mouseDownInventoryItem($event, item, inventory)"
                            v-on:click.left="setUsage(item, inventory)"
                            @contextmenu="handler($event)"
                        >
                            <div v-if="item.Id">
                                <img
                                    width="100px"
                                    height="100px"
                                    align="middle"
                                    v-bind:src="imagePathFinder(item.ImagePath)"
                                />
                                <span class="badge" style="position: absolute; right: 5px; bottom: 5px;">{{
                                        item.Amount
                                                                                                         }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
                <br>
                <div v-if="inventory.Id == inventories[0].Id && usageItem && usageItem.Id" class="usageItemContainer">
                    <span>Aktuell ausgewählt: </span><span class="color-text green">{{ usageItem.Name }}</span><br>
                    <span v-if="usageItem.Data && usageItem.Data.Desc" class="color-text grey">{{
                            usageItem.Data.Desc
                                                                                               }}</span>
                    <br><br>
                    <button class="btn positive" v-on:click="useInvetoryItem">Benutzen</button>
                    <button style="margin-left: 15px;" class="btn negative" v-on:click="dropInventoryItem($event)">
                        Drop
                    </button>
                    <button style="margin-left: 15px;" class="btn neutral" v-on:click="giveInventoryItem($event)">
                        Geben
                    </button>
                    <button class="btn flat neutral" v-on:click="dismiss">Schließen</button>
                </div>
                <div
                    v-else-if="inventories.length == 2 && inventory.Id == inventories[1].Id && usageItem2 && usageItem2.Id"
                    class="usageItemContainer"
                >
                    <span>Aktuell ausgewählt: </span><span class="color-text green">{{ usageItem2.Name }}</span><br>
                    <span v-if="usageItem2.Data && usageItem2.Data.Desc" class="color-text grey">{{
                            usageItem2.Data.Desc
                                                                                                 }}</span>
                </div>
                <div v-else-if="inventory.Id == inventories[0].Id" class="usageItemContainer">
                    <button style="margin-left: -30px;" class="btn flat neutral" v-on:click="dismiss">Schließen</button>

                    <button class="btn btn-inventory secondary" style="float: right; margin: 0" v-on:click="showOwnLicences">
                        <i class="fas fa-id-card"></i>
                    </button>
                </div>
            </div>
            <div v-if="inventories && inventories.length == 1 && activatedside" class="sidecontent">
                <br>
                <button class="btn btn-inventory secondary" v-on:click="packClothesBag()">
                    <i class="fa fa-caret-square-o-down fa-fw"></i> Aktuelle Kleidung packen
                </button>
                <div
                    v-for="invClothCatItem in inventoryClothes"
                    :key="invClothCatItem.Name"
                    class="invClothItemContainer"
                >
                    <div class="headouter"><h4 v-on:click="choose(invClothCatItem.Name)">
                        {{ invClothCatItem.Name }}</h4></div>
                    <div
                        v-if="showClothesCat == invClothCatItem.Name"
                        style="display: inline-block; width: 100%; text-align: center;"
                    >
                        <div
                            v-for="invClothItem in invClothCatItem.Items"
                            :key="invClothItem.Name"
                            class="invClothItem"
                            v-on:click="chooseClothItem(invClothItem)"
                        >
                            {{ invClothItem.Name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <amount-input
            class="giveitem"
            @dismiss="dismissAmountInput"
            v-on:submit="onSubmitAmountInput"
            v-bind:data="amountInput"
        ></amount-input>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'
import AmountInput from './Partials/AmountInput'

class Rect {
    constructor (x, y, width, height) {
        this.x      = x
        this.y      = y
        this.width  = width
        this.height = height
    }

    contains (x, y) {
        return (this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height)
    }
}

export default {
    name: 'Inventory',

    extends: BaseWindow,

    props: {
        data            : String,
        activatedside   : false,
        inventoryClothes: [],
        showClothesCat  : '',
    },

    components: {
        AmountInput,
    },

    data () {
        let inventories = JSON.parse(this.data)
        this.calculatePlaceholders(inventories.inventory)
        this.orderInventoryItems(inventories.inventory)
        this.calculateWeight(inventories.inventory)
        this.activatedside    = false
        this.inventoryClothes = []
        this.showClothesCat   = ''

        return {
            usageItem           : null,
            usageItem2          : null,
            inventories         : inventories.inventory,
            clonedItemElement   : null,
            selectedElement     : null,
            draggedItem         : null,
            draggedItemInventory: null,
            scrollRects         : [],
            fillId              : -1,
            useMouseLeft        : false,
            oldSlot             : -1,
            disableItemMovement : false,
            inventoriesOffset   : {
                x: null,
                y: null,
            },
            mouseOffset         : {
                x: null,
                y: null,
            },
            mousePosition       : {
                x: null,
                y: null,
            },
            amountInput         : {
                show: false,
                max : 0,
                pos : {
                    position: 'absolute',
                    left    : '0px',
                    top     : '0px',
                },
            },
        }
    },
    watch    : {
        inventories: {
            handler: function (val) {
                this.calculateWeight(val)
            },
            deep   : true,
        },
    },
    methods  : {
        showOwnLicences() {
            this.triggerServer('showOwnLicenses')
        },
        choose (catId) {
            if (this.showClothesCat == catId) {
                this.showClothesCat = ''
            } else this.showClothesCat = catId
        },
        showKeyWindow () {
            this.triggerServer('requestPlayerKeys')
            this.dismiss()
        },
        chooseClothItem (item) {
            if (item.Prop) {
                this.triggerServer('inventoryChooseProp', item.Id)
            } else this.triggerServer('inventoryChooseCloth', item.Id)

            this.dismiss()
        },
        packClothesBag () {
            this.triggerServer('packClothesBag')
        },
        responseInventoryClothes (data) {
            this.inventoryClothes = JSON.parse(data)
        },
        packBlackMoney () {
            this.triggerServer('packblackmoney')
            this.dismiss()
        },
        packGun () {
            this.triggerServer('packGun')
            this.dismiss()
        },
        packArmor () {
            this.triggerServer('packArmor')
            this.dismiss()
        },
        fillInventorySlots (inventory) {
            this.triggerServer('fillInventorySlots', inventory)
            this.dismiss()
        },
        imagePathFinder (url) {
            return 'img/itemImages/' + url
        },
        useInvetoryItem () {
            this.triggerServer('useInventoryItem', this.usageItem.Slot)
            this.dismiss()
        },
        dropInventoryItem (event) {
            this.showAmountInput('dropItem', this.usageItem.Slot, null, null, this.usageItem.Amount, event.clientX, event.clientY)
        },
        giveInventoryItem (event) {
            this.showAmountInput('giveItem', this.usageItem.Slot, null, null, this.usageItem.Amount, event.clientX, event.clientY)
        },
        handler: function (e) {
            e.preventDefault()
        },
        showSide () {
            this.activatedside = !this.activatedside
            if (this.activatedside) {
                this.triggerServer('requestPlayerClothes')
            }
        },
        setUsage (item, inventory) {
            // Setze name etc in 2 Inventar
            if (this.inventories.length == 2 && inventory.Id == this.inventories[1].Id) {
                this.usageItem2 = item
                if (this.usageItem != null) this.usageItem = null
            } else {
                this.usageItem = item
                if (this.usageItem2 != null) this.usageItem2 = null
            }
        },
        orderInventoryItems : function (val) {
            for (let inventory of val) {
                inventory.Slots = inventory.Slots.sort(
                    (itemA, itemB) => itemA.Slot - itemB.Slot,
                )
            }
        },
        calculateScrollRects: function (inventories) {
            this.scrollRects = []
            for (let inventory of inventories) {
                let inventoryElement = document.getElementById(`inventory-items-${inventory.Id}`)
                if (inventoryElement == null) continue
                var rect               = inventoryElement.getBoundingClientRect()
                let scrollRectTop      = new Rect(
                    rect.left,
                    rect.top,
                    inventoryElement.offsetWidth,
                    30,
                )
                scrollRectTop.element  = inventoryElement
                scrollRectTop.position = 'top'
                this.scrollRects.push(scrollRectTop)
                let scrollRectBottom      = new Rect(
                    rect.left,
                    rect.top + inventoryElement.offsetHeight - 30,
                    inventoryElement.offsetWidth,
                    30,
                )
                scrollRectBottom.element  = inventoryElement
                scrollRectBottom.position = 'bottom'
                this.scrollRects.push(scrollRectBottom)
            }
        },
        calculatePlaceholders (val) {
            for (let inventory of val) {
                var currentSlot = 0
                var index       = 0
                for (let item of inventory.Slots) {
                    if (item.Slot != currentSlot) {
                        var missingPlaceholders = item.Slot - currentSlot
                        this.addPlaceholders(index, inventory.Slots, currentSlot, missingPlaceholders)
                    }

                    index++
                    currentSlot++
                }
                if (inventory.Slots.length < inventory.MaxSlots) {
                    let missingPlaceholders = inventory.MaxSlots - inventory.Slots.length
                    this.addPlaceholders(index,
                        inventory.Slots,
                        currentSlot,
                        missingPlaceholders,
                    )
                }
            }
        },
        addPlaceholders           : function (index, items, offset, count) {
            for (var i = offset, length = offset + count; i < length; i++) {
                items.splice(index++, 0, {
                    Slot  : i,
                    Weight: 0,
                })
            }
        },
        mouseDownLeftInventoryItem: function (event, item, inventory) {
            if (this.disableItemMovement) return
            this.removeClonedItemElement()
            this.clearSelection()
            let itemElement = event.currentTarget
            if (itemElement.classList.contains('placeholder')) return
            this.cloneItemElement(itemElement)
            this.draggedItem          = item
            this.draggedItemInventory = inventory
            this.useMouseLeft         = true
            this.oldSlot              = item.Slot
        },
        mouseDownInventoryItem    : function (event, item, inventory) {
            if (this.disableItemMovement) return
            this.removeClonedItemElement()
            this.clearSelection()
            let itemElement = event.currentTarget
            if (itemElement.classList.contains('placeholder')) return
            this.cloneItemElement(itemElement)
            this.draggedItem          = item
            this.draggedItemInventory = inventory
            this.oldSlot              = item.Slot
        },
        onMouseUp                 : function (event) {
            let selectedElement = this.clearSelection()
            if (this.draggedItem != null && selectedElement != null) {
                let inventoryId          = selectedElement.parentNode.id.replace('inventory-items-', '')
                let selectedSlot         = selectedElement.getAttribute('slot')
                let placeholderInventory = null

                for (let inventory of this.inventories) {
                    if (inventory.Id == inventoryId) {
                        placeholderInventory = inventory
                        var i                = 0
                        for (let item of inventory.Slots) {
                            if (item.Slot == selectedSlot) {
                                inventory.Slots.splice(i, 1)
                            }
                            i++
                        }
                        break
                    }
                }
                if (placeholderInventory != this.draggedItemInventory) {
                    let index = this.draggedItemInventory.Slots.indexOf(
                        this.draggedItem,
                    )
                    if (index != -1) {
                        this.draggedItemInventory.Slots.splice(index, 1)
                    }

                    this.onMoveItemToInventory(
                        this.oldSlot,
                        selectedSlot,
                        this.draggedItemInventory.Id,
                        this.draggedItem.Amount,
                        event,
                    )

                    this.draggedItem.Id = this.fillId--

                    placeholderInventory.Slots.push(this.draggedItem)
                } else {
                    this.onMoveItemInInventory(
                        this.oldSlot,
                        selectedSlot,
                        this.draggedItemInventory.Id,
                        this.draggedItem.Amount,
                        event,
                    )
                }

                // possible fix to update client data
                this.draggedItemInventory.Slots.push({
                    Slot  : this.draggedItem.Slot,
                    Weight: 0,
                })
                this.draggedItem.Slot = selectedSlot
                this.orderInventoryItems(this.inventories)
            }
            this.removeClonedItemElement()
            this.draggedItem          = null
            this.draggedItemInventory = null
        },
        onScrollCheck () {
            if (this.clonedItemElement == null) return
            for (let scrollRect of this.scrollRects) {
                if (scrollRect.contains(this.mouseClientX, this.mouseClientY)) {
                    if (scrollRect.position == 'top') {
                        scrollRect.element.scrollTop -= 10
                    } else {
                        scrollRect.element.scrollTop += 10
                    }
                    break
                }
            }
        },
        onMouseMove                  : function (event) {
            this.mouseClientX = event.clientX
            this.mouseClientY = event.clientY
            if (this.clonedItemElement == null) {
                this.mouseOffset.x = this.inventoriesOffset.x
                this.mouseOffset.y = this.inventoriesOffset.y
            }
            this.mousePosition.x = event.clientX - this.mouseOffset.x
            this.mousePosition.y = event.clientY - this.mouseOffset.y
            if (this.clonedItemElement != null) {
                this.clonedItemElement.style.transform = `translate3d(${
                    this.mousePosition.x
                }px, ${this.mousePosition.y}px, 0px)`
                this.onDrop(
                    this.getElementBehindClonedElement(
                        event.clientX,
                        event.clientY,
                    ),
                )
            }
        },
        onDrop                       : function (element) {
            if (this.selectedElement != element) {
                this.clearSelection()
            }
            this.selectedElement = element
            if (element == null) return
            if (!element.classList.contains('active')) {
                element.classList.add('active')
            }
        },
        clearSelection               : function () {
            if (this.selectedElement != null) {
                if (this.selectedElement.classList.contains('active')) {
                    this.selectedElement.classList.remove('active')
                }
            }
            let selectedElement  = this.selectedElement
            this.selectedElement = null
            return selectedElement
        },
        getElementBehindClonedElement: function (x, y) {
            for (let el of document.elementsFromPoint(x, y)) {
                if (el.classList.contains('placeholder')) {
                    return el
                }
            }
            return null
        },
        removeClonedItemElement      : function () {
            if (this.clonedItemElement != null) {
                document
                    .getElementById('inventories')
                    .removeChild(this.clonedItemElement)
                this.clonedItemElement = null
            }
            if (this.itemElement != null) {
                this.itemElement.classList.remove('dragged')
                this.itemElement = null
            }
        },
        cloneItemElement             : function (itemElement) {
            this.itemElement = itemElement

            let width          = itemElement.offsetWidth
            let height         = itemElement.offsetHeight
            var e              = document.getElementById('inventories')
            var rect           = e.getBoundingClientRect()
            this.mouseOffset.x = width / 2 + rect.left
            this.mouseOffset.y = height / 2 + rect.top

            this.mousePosition.x = event.clientX - this.mouseOffset.x
            this.mousePosition.y = event.clientY - this.mouseOffset.y

            this.clonedItemElement                 = itemElement.cloneNode(true)
            this.clonedItemElement.className += ' cloned'
            this.clonedItemElement.style.position  = 'absolute'
            this.clonedItemElement.style.transform = `translate3d(
                ${this.mousePosition.x}px,
                ${this.mousePosition.y}px,
                0px
                )`
            this.clonedItemElement.style.width     = width + 'px'
            this.clonedItemElement.style.height    = height + 'px'

            if (!this.itemElement.classList.contains('dragged')) {
                this.itemElement.classList.add('dragged')
            }

            document
                .getElementById('inventories')
                .appendChild(this.clonedItemElement)
        },
        calculateWeight              : function (val) {
            for (let inventory of val) {
                let weight = 0

                for (let item of inventory.Slots) {
                    if (!isNaN(item.Amount) && !isNaN(item.Weight)) {
                        weight += (item.Amount * item.Weight)
                    }
                }

                inventory.Weight = weight / 1000
            }
        },
        onMoveItemToInventory        : function (oldSlot, newSlot, oldInventory, amount, event) {

            if (this.useMouseLeft) {
                this.triggerServer('moveItemToInventory', oldSlot, newSlot, oldInventory, amount)
                this.useMouseLeft = false
                this.usageItem    = null
                this.usageItem2   = null
                return
            }
            this.showAmountInput('splitItem', oldSlot, newSlot, oldInventory, amount, event.clientX, event.clientY)
        },
        onMoveItemInInventory        : function (oldSlot, newSlot, oldInventory, amount, event) {

            if (this.useMouseLeft) {
                this.triggerServer('moveItemInInventory', oldSlot, newSlot, oldInventory, amount)
                this.useMouseLeft = false
                this.usageItem    = null
                this.usageItem2   = null
                return
            }
            this.showAmountInput('splitItemInInv', oldSlot, newSlot, oldInventory, amount, event.clientX, event.clientY)
        },
        onKeyUp                      : function (event) {
            if (event.key == 'Escape') {
                this.dismiss()
            } else if (event.key == 'i') {
                this.dismiss()
            }
        },
        showAmountInput (type, oldSlot, newSlot, oldInventory, max, x, y) {
            this.disableItemMovement = true
            this.amountInput         = {
                show: true,
                type,
                oldSlot,
                newSlot,
                oldInventory,
                max,
                pos : {
                    position: 'relative',
                    left    : x + 'px',
                    top     : y + 'px',
                },
            }
        },
        onSubmitAmountInput (type, oldSlot, newSlot, oldInventory, amount) {
            this.disableItemMovement = false
            if (type == 'splitItem') {
                this.triggerServer('moveItemToInventory', oldSlot, newSlot, oldInventory, amount)
                this.dismiss()
            } else if (type == 'dropItem') {
                this.triggerServer('dropInventoryItem', oldSlot, amount)
                this.dismiss()
            } else if (type == 'giveItem') {
                this.triggerServer('giveInventoryItem', oldSlot, amount)
                this.dismiss()
            } else if (type == 'splitItemInInv') {
                this.triggerServer('moveItemInInventory', oldSlot, newSlot, oldInventory, amount)
                this.dismiss()
            }
        },
        dismissAmountInput () {
            this.disableItemMovement = false
        },
    },
    mounted  : function () {
        this.scrollCheck = setInterval(this.onScrollCheck, 50)

        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('keyup', this.onKeyUp)

        var e                    = document.getElementById('inventories')
        var rect                 = e.getBoundingClientRect()
        this.inventoriesOffset.x = rect.left
        this.inventoriesOffset.y = rect.top

        this.calculateScrollRects(this.inventories)

    },
    destroyed: function () {
        if (this.scrollCheck && this.scrollCheck != null) {
            clearInterval(this.scrollCheck)
        }

        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('keyup', this.onKeyUp)
    },
    /**
     * Get image path.
     *
     * @param img
     */
    getClothSlotImagePath (img) {
        return 'img/clothing/' + img
    },
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/components/shadow";
@import "../../../stylesheets/components/color";

.giveitem {
    background-color: rgba(0, 0, 0, 0.9);
    color: #ccc !important;

    input {
        background-color: rgba(255, 255, 255, 0.3);
    }
}

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

    .sidecontent {
        width: 30vh;
        height: 94%;
        margin: 1.8vh 0 0 -2.5vh;
        background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7));
        color: #ccc;
        overflow-x: scroll;
        overflow-y: hidden;

        .btn {
            font-size: 1.4vh;
        }

        .invClothItemContainer {
            .headouter {
                transform: skewX(-40deg);
                background-color: rgba(218, 114, 0, 0.8);
                text-align: center;
                width: 85%;
                margin: 0 auto;

                h4 {
                    transform: skewX(40deg);
                    font-size: 1.5vh;
                    margin: 1vh;
                }
            }

            .headouter:hover {
                background-color: rgba(218, 114, 0, 1);
                cursor: pointer;
            }

            .invClothItem {
                padding: 0.5vh;
                font-size: 1.5vh;
                width: 23vh;
                display: inline-block;
                margin: auto;
            }

            .invClothItem:hover {
                color: rgba(218, 114, 0, 1);
                cursor: pointer;
            }
        }
    }

    .inventory {
        background: none;
        background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7));
        color: #fff;

        #title {
            text-shadow: 2px 2px 4px #000;
            margin: 0.5rem 0.2rem 0.2rem 0.2rem;
        }

        .inventory-items {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 2vh;

            overflow-y: scroll;
            height: 30vh;
            padding-right: 25px;
            text-align: center;
        }
    }

    .inventory-item {
        width: 4vw;
        height: 4vw;
        background-color: rgba(0, 0, 0, 0.3);

        &.dragged {
            opacity: 0.5;
        }

        &.cloned {
            pointer-events: none;
        }

        &.placeholder {
            outline: rgba(255, 255, 255, 0.3) dashed 3px;
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
                background-color: rgba(255, 255, 255, 0.1);
                @include box_shadow(2);
            }
        }

        img {
            pointer-events: none;
            width: 64px;
            height: 64px;
            margin-top: 7px;
            margin-left: 7px;
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
    background-color: #2c2c2c;
    border-color: #2c2c2c;
}

.btn-inventory {
    padding: 0 .6rem;
    margin: 0.2rem 0.2rem 0.2rem .5rem;
}

.btn-inventory:first-child {
    margin-right: 1rem;
}

.btn:not(.flat).neutral, .btn:not(.flat).secondary {
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn:not(.flat).neutral:hover, .btn:not(.flat).secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}

::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #fff;
    border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
    background: #fff;
}

::-webkit-scrollbar-thumb:active {
    background: #000;
}

::-webkit-scrollbar-track {
    background: #666;
    border: 0px none #fff;
    border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
    background: #666;
}

::-webkit-scrollbar-track:active {
    background: #333;
}

::-webkit-scrollbar-corner {
    background: transparent;
}


</style>