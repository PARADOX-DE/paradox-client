<template id="main">
    <div
        id="keys"
        class="jumbotron card center keywindow"
        v-bind:class="{ 'keysPlayer': !isInventory(), 'keysInv': isInventory() }"
    >
        <div v-for="(value, type) in keys" :key="value" v-if="type != 'Spielername'">
            <div v-for="(list, typ) in value" :key="typ">
                <button class="accordionskeywindow">{{ typ }}</button>
                <div class="panel">
                    <div v-for="key in list" :key="key.id" @click="setActive($event, key.id, typ);">
                        {{ key.name }} ( {{ key.id }} )
                    </div>
                </div>
            </div>

        </div>
        <div class="bottom">
            <div v-if="isInventory()">
                <button class="btn positive pad5" @click="giveKey">Ins Business</button>
                <button class="btn negative" @click="dropKey">Entfernen</button>
                <button class="btn flat neutral" @click="dismiss">Schließen</button>
            </div>
            <div v-else>
                <button class="btn positive" @click="giveKey">Geben</button>
                <button class="btn flat neutral" @click="dismiss">Schließen</button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Keys',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            currentId  : null,
            keys       : JSON.parse(this.data),
            currentType: null,
        }
    },
    methods: {
        setActive (event, id, typ) {
            document.querySelectorAll('.keywindow .panel div').forEach((element) => element.classList = '')
            event.target.classList += 'item-active'
            this.currentId   = id
            this.currentType = typ
        },
        giveKey () {
            if (this.currentId == null) return
            this.triggerServer('GivePlayerKey', this.keys.Spielername, this.currentId, this.currentType)
            this.dismiss()
            this.currentId   = null
            this.currentType = null
        },
        dropKey () {
            if (this.currentId == null) return
            this.triggerServer('DropPlayerKey', this.currentId, this.currentType)
            this.dismiss()
            this.currentId   = null
            this.currentType = null
        },
        isInventory () {
            return this.keys.Spielername == null
        },
        loadAccords: function () {
            var accordiWindow = document.getElementsByClassName('accordionskeywindow')
            var i
            for (i = 0; i < accordiWindow.length; i++) {
                accordiWindow[i].addEventListener('click', function () {
                    this.classList.toggle('active')
                    var panel = this.nextElementSibling
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null
                    } else {
                        panel.style.maxHeight = i * 2 + 5 + 'rem'
                    }
                })
            }
        },
    },
    mounted: function () {
        this.loadAccords()
    },
}
</script>

<style scoped>
.keywindow .accordionskeywindow {
    background-color: rgba(0, 0, 0, 0.5);
    color:            #ccc;
    cursor:           pointer;
    padding:          0.8rem;
    width:            100%;
    border:           none;
    text-align:       left;
    outline:          none;
    font-size:        1.2rem;
    transition:       0.4s;
}

.keywindow .active, .keywindow .accordionskeywindow:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.keywindow .accordionskeywindow:after {
    content:     '\002B';
    color:       #777;
    font-weight: bold;
    float:       right;
    margin-left: 5px;
}

.keywindow .active:after {
    content: "\2212";
}

.keywindow .panel {
    background-color: rgba(0, 0, 0, 0.3);
    max-height:       0;
    overflow-y:       scroll;
    transition:       max-height 0.2s ease-out;
    display:          block;
    height:           100%;
    color:            #ccc;
}

.keywindow .panel > div {
    padding: 0.5rem;
    display: block;
}

.keywindow ::-webkit-scrollbar {
    width:            0.3rem;
    background-color: #f5f5f5;
}

.keywindow ::-webkit-scrollbar-track {
    box-shadow:       inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
}

.keywindow ::-webkit-scrollbar-thumb {
    background-color: #ff9800;
    border:           2px solid #ff9800;
}

.keywindow .bottom {
    margin-top: 2rem;
}

.keywindow li {
    line-height:      4rem;
    border-bottom:    0.1rem solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    margin:           1rem;
}

.keywindow li:hover {
    color: green;
}

#keys {
    background-color: rgba(0, 0, 0, 0.8);
    height:           auto;
    min-height:       60vh;
    min-width:        45vw;
    padding:          2rem;
    text-align:       center;
    border-top:       1rem solid #ff9800;
    border-bottom:    0.5vh solid #ff9800;
}

.keywindow .item-active {
    color:            #ccc;
    border-left:      0.2rem solid #ff9800;
    background-color: rgba(255, 255, 255, 0.1);
}

</style>
<!-- components.Windows.show('Keys', '{"Spielername": "Hans Juergen","Haeuser":[{"name":"117","id":117}],"Fahrzeuge":[{"name":"Zentorno","id":14},{"name":"burrito3","id":8694},{"name":"Mule","id":627002}]}') -->