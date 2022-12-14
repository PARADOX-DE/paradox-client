<template id="main-page">
    <v-ons-page>
        <div class="app_wrapper">
            <div class="app_header color-background dark-top">
                <div class="app_header_left">
                    <div class="back" @click="pageStack.pop()"><i class="fas fa-chevron-left"></i></div>
                    <div class="title">Gebay Marktplatz</div>
                </div>
                <div class="clear"></div>
            </div>

            <div class="gebay_content">
                <div class="gebay_content_left color-background dark-top">
                    <div class="search">
                        <input type="text" id="site-search" name="q" placeholder="Suchbegriff" v-model="filter">
                    </div>
                    <div class="navigation">
                        <ul>
                            <li>Navigation</li>
                            <li @click="getOffers(999)">
                                <i class="fas fa-caret-right" :style="myOffers ? 'color:#0099ff' : ''"></i> Meine
                                                                                                            Anzeigen
                            </li>
                            <li v-for="category in categories" v-bind:key="category.id" @click="getOffers(category.id)">
                                <i
                                    class="fas fa-caret-right"
                                    :style="selectedCategory==category.id ? 'color:#0099ff' : ''"
                                ></i> {{ category.name }}
                            </li>
                        </ul>
                    </div>
                    <br>
                    <div class="checkboxes">
                        <ul>
                            <li>
                                Filtereinstellung
                            </li>
                            <li v-for="(item,index) in filterOpt" v-bind:key="index">
                                <input type="radio" name="filterItems" :value="item" v-model="selectedFilterOpt">
                                <label> {{ item }}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="gebay_content_right color-background heading">
                    <div class="flex-container">

                        <div class="flex-box color-background dark-secondary" v-show="myOffers" @click="showModal=true">
                            <div class="flex-box-inner box-center">
                                <div><i class="fas fa-plus-circle" style="font-size:5vh;"></i></div>
                            </div>
                            <div class="offercontact">
                            </div>
                        </div>

                        <div
                            class="flex-box color-background dark-secondary"
                            v-for="result in displayResults"
                            v-bind:key="result.id"
                        >
                            <div
                                :class="[!result.search ? 'offer offer-angebot' : 'offer offer-suche']"
                                v-on:click="openOffer(result)"
                            >
                                <div class="shape">
                                    <div :class="!result.search ? 'shape-text-angebot' : 'shape-text-suche'">
                                        {{ result.search ? 'Suche' : 'Angebot' }}
                                    </div>
                                </div>
                                <div class="offer-content">
                                    <h3 class="lead">
                                        {{ result.name.substring(0, 27) }}
                                    </h3>
                                    <p>
                                        {{ result.description.substring(0, 60) }}...
                                    </p>
                                </div>
                                <div class="offerprice">
                                    <span>{{ formatPrice(result.price) }} $</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Modal v-if="showModal" @close="showModal = false">
                        <h3 slot="header">Neue Anzeige</h3>
                        <div slot="body" class="form">
                            <form ref="offerForm" style="color:white">
                                <input style="color:white;" type="text" name="title" placeholder="Titel">
                                <textarea
                                    placeholder="Beschreibung"
                                    class="descriptionarea"
                                    name="description"
                                    id=""
                                    cols="30"
                                    rows="10"
                                ></textarea>
                                <input style="color:white;" type="text" name="price" placeholder="Preis">
                                <br /><br />
                                <div class="dropdown">
                                    <a
                                        class="dropbtn"
                                        id="moc"
                                        href="#"
                                    >{{ myOfferCategory ? categories[myOfferCategory - 1].name : 'Kategorie' }}</a>
                                    <div class="dropdown-content">
                                        <a
                                            href="#"
                                            v-for="category in categories"
                                            v-bind:key="category.id"
                                            v-on:click="myOfferCategory=category.id"
                                        >{{ category.name }}</a>
                                    </div>
                                </div>
                                <div class="dropdown" style="margin-left:1vh">
                                    <a
                                        class="dropbtn"
                                        id="mos"
                                        href="#"
                                    >{{ (!myOfferSearch) ? 'Angebot' : 'Suche' }}</a>
                                    <div class="dropdown-content">
                                        <a href="#" @click="myOfferSearch=false">Angebot</a>
                                        <a href="#" @click="myOfferSearch=true">Suche</a>
                                    </div>
                                </div>
                                <!--<select name='search' class="color-background dark-top" style="color:white;border:1px solid white"><option value="Angebot">Angebot</option><option value="Suche">Suche</option></select>-->
                            </form>
                        </div>
                        <div class="btn" style="color:white" slot="footer" @click="createOffer()">Anzeige erstellen
                        </div>
                    </Modal>

                    <Modal v-if="showOffer" @close="showOffer = false">
                        <h3 slot="header"></h3>
                        <div slot="body" class="form" style="color:white;">
                            <div :class="[!showOfferResult.search ? 'offer offer-angebot' : 'offer offer-suche']">
                                <div class="shape">
                                    <div :class="!showOfferResult.search ? 'shape-text-angebot' : 'shape-text-suche'">
                                        {{ showOfferResult.search ? 'Suche' : 'Angebot' }}
                                    </div>
                                </div>
                                <div class="offer-content">
                                    <h3 class="lead">
                                        {{ showOfferResult.name }}
                                    </h3>
                                    <p>
                                        {{ showOfferResult.description }}...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div slot="footer">
                            <div style="float:left;color:white;font-size:1.5vh">
                                Preis: {{ formatPrice(showOfferResult.price) }} $
                            </div>
                            <div style="text-align:right;">
                                <span v-if="!myOffers"><i
                                    style="color:white;font-size:2.5vh"
                                    class="clrhover fas fa-phone"
                                    @click="callUser(showOfferResult.phone)"
                                ></i></span>
                                <span v-if="!myOffers" style="margin-left:3vh"><i
                                    style="color:white;font-size:2.5vh"
                                    class="clrhover fas fa-comment-alt"
                                    @click="messageUser(showOfferResult.phone)"
                                ></i></span>
                                <span
                                    v-if="myOffers||admin"
                                    style="margin-left:3vh"
                                ><i
                                    style="color:red;font-size:2.5vh"
                                    v-on:click="deleteOffer($ons,showOfferResult);"
                                    class="clrhover fas fa-trash-alt"
                                ></i></span>
                            </div>
                        </div>
                    </Modal>

                </div>
                <div class="clear"></div>
            </div>
            <div class="loader_marketplace" v-show="dataLoader">
                <div class="lds-dual-ring_marketplace"></div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import Modal from './modalComp'
import MessengerMessageApp from '../Smartphone/Messenger/MessengerMessageApp'

export default {
    name      : 'MarketplaceApp',
    extends   : BaseApp,
    components: { Modal },
    data () {
        return {
            categories       : [],
            results          : [],
            selectedCategory : 999,
            filter           : '',
            myOffers         : false,
            selectedFilterOpt: 'Alles',
            filterOpt        : ['Alles', 'Suche', 'Angebot'],
            showModal        : false,
            showOffer        : false,
            showOfferResult  : [],
            myOfferCategory  : 0,
            myOfferSearch    : false,
            dataLoader       : false,
            admin            : false,
        }
    },
    methods : {
        createOffer () {
            var check = true
            var input = this.$refs.offerForm.elements;
            [...input].forEach((x) => {
                if (!x.value || (x.name == 'price' && !Number.isInteger(parseInt(x.value)))) {
                    x.style.borderBottomColor = 'red'
                    check                     = false
                }

            })

            if (!this.myOfferCategory) {
                document.getElementById('moc').style.color = 'red'
                check                                      = false
            }

            if (check) {
                this.results.unshift({
                    id         : this.results.length + 1,
                    name       : this.sanitizeInput(input.title.value),
                    phone      : '00000',
                    price      : input.price.value,
                    description: this.sanitizeInput(input.description.value),
                    search     : this.myOfferSearch,
                })

                this.triggerServer('addOffer', this.myOfferCategory, this.sanitizeInput(input.title.value), input.price.value, this.sanitizeInput(input.description.value), this.myOfferSearch)
                this.showModal       = false
                this.myOfferSearch   = false
                this.myOfferCategory = 0

            }
        },
        getOffers (categoryid) {
            this.results          = [] //Clear b4
            this.dataLoader       = true
            this.selectedCategory = categoryid
            if (categoryid == 999) {
                this.triggerServer('requestMyOffers')
                this.myOffers = true
            } else {
                this.triggerServer('requestMarketPlaceOffers', categoryid)
                this.myOffers = false
            }
        },
        responseMyOffers (offers) {
            this.results    = JSON.parse(offers)
            this.dataLoader = false
        },
        responseMarketPlaceOffers (response, arg = '[]') {
            var admin = JSON.parse(arg)
            if (admin) { this.admin = true } else { this.admin = false }
            this.results    = JSON.parse(response)
            this.dataLoader = false
        },
        responseMarketPlaceCategories (categories) {
            this.dataLoader = false
            this.categories = JSON.parse(categories)
            this.getOffers(this.selectedCategory)
        },
        resultsSearchFilter () {
            var tmp_result = this.results
            // Search Filter
            if (this.filter.length >= 3) {
                tmp_result = tmp_result.filter((x) => {
                    return (
                        x.description.toLowerCase().includes(this.filter.toLowerCase()) ||
                        x.name.toLowerCase().includes(this.filter.toLowerCase())
                    )
                })
            }
            //FilterOpts
            var s      = this.selectedFilterOpt == 'Suche' ? true : false
            tmp_result = tmp_result.filter((x) => {
                if (this.selectedFilterOpt != 'Alles') {
                    return (x.search === s)
                }
                return x
            })

            return tmp_result
        },
        formatPrice (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        openOffer (data) {
            this.showOfferResult = data
            this.showOffer       = true
        },
        deleteOffer ($ons, data) {
            var that = this
            $ons.notification.confirm({
                messageHTML: 'Möchtest du dieses Angebot wirklich löschen?',
                callback   : function (answer) {
                    if (answer) {
                        that.triggerServer('deleteOffer', data.id)
                        that.showOffer = false
                        that.getOffers(999)
                    }
                },
            })
        },
        callUser (number) {
            if (number == null) return
            this.triggerServer('callUserPhone', number)
        },
        messageUser (number) {
            if (number == null) return
            this.pageStack.push({ extends: MessengerMessageApp, data () { return { receiver: number } } })
        },
    },
    computed: {
        displayResults () {
            return this.resultsSearchFilter()
        },
    },
    mounted () {
        this.triggerServer('requestMarketplaceCategories')
        this.dataLoader = true
    },
    props: ['pageStack'],
}
</script>

<style>

.loader_marketplace {
    position:         absolute;
    z-index:          999;
    background-color: rgba(0, 0, 0, .5);
    width:            100%;
    height:           100%;
    top:              0px;
}

.lds-dual-ring_marketplace {
    display:  inline-block;
    width:    8vh;
    height:   8vh;
    position: relative;
    left:     44%;
    top:      41%;
}

.lds-dual-ring_marketplace:after {
    content:       " ";
    display:       block;
    width:         7vh;
    height:        7vh;
    margin:        1vh;
    border:        6px solid #fff;
    border-radius: 50%;
    border-color:  #fff transparent #fff transparent;
    animation:     lds-dual-ring 1.2s linear infinite;
}

/**DROPDOWN**/

/* Dropdown Button */
.dropbtn {
    color:     white;
    padding:   16px;
    font-size: 16px;
    border:    none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display:  inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display:          none;
    position:         absolute;
    background-color: #181818;
    box-shadow:       0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index:          1;
    padding:          0.2vh;
    border-radius:    0.35em;
}

.modal-wrapper {
    display:        table-cell;
    padding-top:    2vh;
    vertical-align: top !important;
}

.descriptionarea {width: 100%; height: 10vh; margin: 1vh 0vh; background: #313131; color: #fff; border: 0; border-bottom: 2px solid #fff;}

/* Links inside the dropdown */
.dropdown-content a {
    padding-left:    0.5vh;
    background:      #181818;
    text-decoration: none;
    display:         block;
    color:           #fff;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
    background-color: #262626;
}

.form a, .form button, form a, form button {
    margin-top: 0rem !important;
    padding:    0.55vh 0.5vh;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */


.app_wrapper {
    height:     100%;
    width:      100%;
    background: #fff;
    font-size:  1.5vh;
}

.app_header {
    position:    relative;
    height:      6vh;
    line-height: 6vh;
    box-shadow:  5px 6px 6px -5px rgba(0, 0, 0, 0.75);
}

.app_header_left {
    float:     left;
    width:     50%;
    font-size: 2vh;
    color:     white;
}

.app_header_left .back {
    font-size:  2vh;
    float:      left;
    width:      6vh;
    text-align: center;
}

.app_header_left .back:hover {
    cursor: pointer;
}

.app_header_left .title {
    float:        left;
    padding-left: 1vh;
}

.app_header_right {
    float:         right;
    width:         50%;
    padding-top:   1.4vh;
    text-align:    right;
    padding-right: 2vh;
}

.gebay_content {
    height: 91%;
}

.gebay_content_left {
    float:      left;
    width:      22%;
    height:     100%;
    position:   relative;
    padding:    0;
    box-shadow: 10px -1px 5px -6px rgba(0, 0, 0, 0.37);
    overflow-y: auto;
    color:      #fff;
}

.navigation ul {
    margin:  0;
    padding: 0;
}

.navigation ul li:first-child, .checkboxes ul li:first-child {
    border:    0;
    font-size: 1.4vh;
}

.navigation ul li:first-child:hover {
    padding-left: 1vh;
}

.navigation ul li {
    height:        4vh;
    line-height:   4vh;
    border-bottom: 0.1vh solid #202020 !important;
    padding-left:  1vh;
    transition:    500ms all;
}

.navigation ul li:hover {
    padding-left: 1.5vh;
    transition:   500ms all;
    cursor:       pointer;
}

.navigation ul li .fas {
    opacity: 0.5;
}

.gebay_content_right {
    float:      right;
    height:     100%;
    width:      78%;
    padding:    1vh 1vh 2vh 1vh;
    overflow-x: hidden;
    overflow-y: auto;
}

.clear {
    clear: both
}


.checkboxes {
    bottom:   0vh;
    position: relative;
    width:    100%;
}

.checkboxes ul {
    margin:  0;
    padding: 0;
}

.checkboxes ul li {
    height:        4vh;
    line-height:   4vh;
    border-bottom: 0.1vh solid #202020 !important;
    padding-left:  1vh;
    position:      relative;
    transition:    500ms all;
}

.checkboxes ul li label {
    position: absolute;
    left:     3vh;
    top:      -0.2vh;
}

.checkboxes ul li input {
    height: 1.5vh;
    width:  1.5vh;
}

.btn:hover {
    transform:  scale(1.1);
    transition: 500ms all;
}

.clrhover:hover {
    transform:  scale(1.5);
    transition: 500ms all;
}

.search {
    padding:    1vh;
    margin-top: 0;
    position:   relative;
}

.search .searchbtn {
    position:      absolute;
    right:         1vh;
    top:           1.15vh;
    width:         4vh;
    height:        4vh;
    line-height:   4vh;
    font-size:     1.6vh;
    text-align:    center;
    color:         grey;
    border:        0.2vh solid #ccc;
    border-radius: 0.3vh;
}

.search .searchbtn:hover {
    transform:  scale(1.1);
    transition: 500ms all;
}

.search .sidebar_title {
    font-size: 1.4vh;
}

.search input {
    width:       100%;
    font-family: 'Helvetica', FontAwesome, sans-serif;
}

input {
    margin: .4rem;
}

/* Angebot design*/
.flex-container {
    display:   flex;
    flex-wrap: wrap;
}

.flex-container > .flex-box {
    width:         32%;
    margin:        1.5vh 0.5vh;
    border:        0.1vh solid #242424 !important;
    min-height:    15vh;
    position:      relative;
    box-shadow:    0px 0px 5px 0px rgba(0, 0, 0, 0.25);
    color:         white;
    border-radius: 0px;
}

.flex-box:hover {
    opacity: 0.7;
    cursor:  pointer;
}

.flex-box-inner {
    padding: 1vh;
}

.box-center {
    height:          100%;
    display:         flex;
    align-items:     center;
    justify-content: center;
}

.form input {
    width: 100%
}

.offertitel {
    font-size:   1.8vh;
    font-weight: 800;
    color:       #fff;
}

.offertitel span {
    padding: 0.5vh;
}

.offerdescription {
    font-size:     1.4vh;
    margin-bottom: 1.5vh;
    color:         #fff;
}

.offerprice {
    position:         absolute;
    bottom:           -1.5vh;
    right:            1vh;
    padding-left:     .6vh;
    padding-right:    .6vh;
    border:           1px solid #242424;
    border-radius:    10%;
    background-color: #414141;
    box-shadow:       0px 0px 5px 0px rgba(0, 0, 0, 0.25);
}

.offerprice span {
    color:       white;
    font-weight: bold;
    font-size:   1.4vh;
    padding:     2vh;
}

#site-search {
    width: 100%;
    color: white;
}

.shape {
    border-style:      solid;
    border-width:      0 70px 40px 0;
    float:             right;
    height:            0px;
    width:             0px;
    -ms-transform:     rotate(360deg); /* IE 9 */
    -o-transform:      rotate(360deg); /* Opera 10.5 */
    -webkit-transform: rotate(360deg); /* Safari and Chrome */
    transform:         rotate(360deg);
}

.offer {
    box-shadow:    0 10px 20px rgba(0, 0, 0, 0.2);
    overflow:      hidden;
    border-radius: 2%;
    height:        100%;
}


.offer-angebot {
    border-color: #5cb85c;
}

.offer-angebot .shape {
    border-color: transparent #5cb85c transparent transparent;
    border-color: rgba(255, 255, 255, 0) #5cb85c rgba(255, 255, 255, 0) rgba(255, 255, 255, 0);
}

.offer-suche {
    border-color: #5bc0de;
}

.offer-suche .shape {
    border-color: transparent #5bc0de transparent transparent;
    border-color: rgba(255, 255, 255, 0) #5bc0de rgba(255, 255, 255, 0) rgba(255, 255, 255, 0);
}

.shape-text-angebot {
    color:             #fff;
    font-size:         1.067vh;
    font-weight:       bold;
    position:          relative;
    right:             -2.5vh;
    top:               -0.213vh;
    white-space:       nowrap;
    -ms-transform:     rotate(30deg); /* IE 9 */
    -o-transform:      rotate(360deg); /* Opera 10.5 */
    -webkit-transform: rotate(30deg); /* Safari and Chrome */
    transform:         rotate(30deg);
}

.shape-text-suche {
    color:             #fff;
    font-size:         1.067vh;
    font-weight:       bold;
    position:          relative;
    right:             -3.6vh;
    top:               0vh;
    white-space:       nowrap;
    -ms-transform:     rotate(30deg); /* IE 9 */
    -o-transform:      rotate(360deg); /* Opera 10.5 */
    -webkit-transform: rotate(30deg); /* Safari and Chrome */
    transform:         rotate(30deg);
}

.offer-content {
    padding: 0 20px 10px;
}

.lead {
    font-size: 2vh;
}


/*
components.Hud.visible = true
components.Computer.app = "ComputerMainScreen"
components.DesktopApp.responseComputerApps('[{"id":1,"appName":"MarketplaceApp","name":"gebay","icon":"gebay.png"}]')
*/
</style>






