<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">E-Mail</div>
        </v-ons-toolbar>
        <div class="app_content">
            <div class="app_content_left">
                <div class="navigation">
                    <ul>
                        <li>Postfach</li>
                        <li v-for="email in emails" v-bind:key="email.id" @click="targetEmailAsRead(email)">
                            <i class="fas fa-caret-right" :style="selectedMail==email ? 'color:green' : ''"></i>
                            <span :style="!email.readed ? 'font-weight:bold' : ''">{{ email.subject }}</span>
                            <button class="deletebtn" @click="deleteMail(email)"><span class="fa fa-trash"></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="app_content_right">
                <div class="flex-container">
                    <div v-if="selectedMail != null" v-html="selectedMail.body"></div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'EmailApp',
    extends: BaseApp,
    data () {
        return {
            emails      : [],
            selectedMail: null,
        }
    },
    methods: {
        responseEmails (response) {
            this.emails       = JSON.parse(response)
            this.selectedMail = this.emails[0]
        },
        targetEmailAsRead (mail) {
            this.selectedMail = mail
            if (!mail.readed) {
                this.triggerServer('markEmailAsRead', mail.id)
                mail.readed = true
            }
        },
        deleteMail (mail) {
            this.emails.splice(this.emails.id, 1)
            this.triggerServer('deleteMail', mail.id)
        },
    },
    mounted () {
        this.triggerServer('requestEmails')
    },
    props: ['pageStack'],
}
</script>

<style>
.app_wrapper {
    height:     100%;
    width:      100%;
    background: #fff;
    font-size:  1.5vh;
}

.app_header {
    height:      6vh;
    line-height: 6vh;
    box-shadow:  0px 0px 14px 0px rgba(0, 0, 0, 0.75);
}

.app_header_left {
    float:     left;
    width:     50%;
    font-size: 2vh;
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

.app_content {
    height: 100%;
    /*background-color: white;*/
}

.app_content_left {
    float:       left;
    width:       22%;
    height:      100%;
    position:    relative;
    padding-top: 1vh;
    box-shadow:  5px 6px 19px 0px rgba(0, 0, 0, 0.37);
    overflow:    auto;
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
    border-bottom: 0.1vh solid #3c3c3c;
    padding-left:  1vh;
    transition:    500ms all;
}

.navigation ul li:hover {
    padding-left: 1.5vh;
    transition:   500ms all;
    cursor:       pointer;
}

.navigation ul li .fas {opacity: 0.5;}


.app_content_right {
    float:      right;
    height:     100%;
    width:      78%;
    padding:    1vh;
    overflow-x: hidden;
    overflow-y: scroll;
}

.clear {clear: both}


.checkboxes {bottom: 0vh; position: absolute; width: 100%;}

.checkboxes ul {
    margin:  0;
    padding: 0;
}

.checkboxes ul li {
    height:        4vh;
    line-height:   4vh;
    border-bottom: 0.1vh solid #3c3c3c;
    padding-left:  1vh;
    position:      relative;
    transition:    500ms all;
}

.checkboxes ul li label {
    position: absolute;
    left:     3vh;
    top:      -0.2vh;
}

.checkboxes ul li input {height: 1.5vh;width: 1.5vh;}

.btn:hover {
    transform:  scale(1.1);
    transition: 500ms all;
}

.search {
    padding:    1vh;
    margin-top: 1vh;
    position:   relative;
}

.search .searchbtn {
    position:      absolute;
    right:         1vh;
    top:           1.15vh;
    font-size:     1vh;
    width:         4vh;
    height:        4vh;
    line-height:   4vh;
    font-size:     1.6vh;
    text-align:    center;
    color:         white;
    border:        0.2vh solid #3c3c3c;
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
    width:       78%;
    font-family: 'Helvetica', FontAwesome, sans-serif;
}

.switch2 {
    position: relative;
    display:  inline-block;
    width:    5vh;
    height:   3vh;
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
    width:      32%;
    margin:     1.5vh 0.5vh;
    border:     0.1vh solid #3c3c3c;
    min-height: 15vh;
    position:   relative;
    /*background: #fff;*/
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
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

.deletebtn {
    width:       2vh;
    margin-left: 1vh;
}

.deletebtn:hover {
    cursor: pointer;
}

.deletebtn span {
    color:     red;
    font-size: 2vh;
}


</style>