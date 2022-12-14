<template>
    <div id="perso" class="perso" v-bind:class="[persocolor]" v-if="perso">
        <div class="lslogo"></div>
        <div class="head-text">Los Santos</div>
        <div class="infos">
            <div class="info-block">
                <div class="info-desc">Vorname</div>
                <div class="info-text">{{ perso.firstName }}</div>
            </div>
            <div class="info-block">
                <div class="info-desc">Nachname</div>
                <div class="info-text">{{ perso.lastName }}</div>
            </div>
            <div class="info-block">
                <div class="info-desc">Wohnort</div>
                <div class="info-text">{{ perso.address }}</div>
            </div>
            <div class="info-block">
                <div class="info-desc">Geburtsdatum</div>
                <div class="info-text">{{ perso.birthday }}</div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="code-block">
            <div class="crc">{{ perso.identity }}</div>
            <div class="level">{{ perso.level }} {{ perso.govLevel }}</div>
        </div>
        <div class="newbie" v-if="perso.level <= 3 && perso.casino == 0">
            <i class="fa fa-star"></i>
        </div>
        <div class="newbie" v-if="perso.casino >= 1">
            <i v-if="perso.casino == 1" style="color: #000;" class="far fa-gem"></i>
            <i v-else-if="perso.casino == 2" style="color: #00ced1;" class="far fa-gem"></i>
            <i v-else-if="perso.casino == 3" style="color: #ff1493;" class="far fa-gem"></i>
            <i v-else-if="perso.casino == 4" style="color: #daa520;" class="far fa-gem"></i>
        </div>
    </div>
    <div id="dutymarke" class="perso" v-bind:class="[dutycolor]" v-else-if="dutyCard">
        <div class="lslogo"></div>
        <div class="head-text">Dienstausweis</div>
        <div class="infos dutycard">
            <div class="info-block">
                <div class="info-desc">Behoerde:</div>
                <div v-if="dutyCard.cduty != 1" class="info-text">{{ dutyCard.behoerde }}</div>
                <div v-else class="info-text">Diamond Casino</div>
            </div>
            <div class="info-block">
                <div class="info-desc">Rang:</div>
                <div v-if="dutyCard.cduty != 1" class="info-text">{{ dutyCard.dienstnummer }}</div>
                <div v-else-if="dutyCard.cduty == 1" class="info-text">Manager</div>
                <div v-else class="info-text">Security</div>
            </div>
            <div class="info-block" v-if="dutyCard.casino <= 0">
                <div class="info-desc">Dienstbeschreibung</div>
                <div class="info-text">{{ dutyCard.govLevel }}</div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="newbie" v-if="dutyCard.casino >= 1">
            <i v-if="dutyCard.casino == 1" style="color: #000;" class="far fa-gem"></i>
            <i v-else-if="dutyCard.casino == 2" style="color: #00ced1;" class="far fa-gem"></i>
            <i v-else-if="dutyCard.casino == 3" style="color: #ff1493;" class="far fa-gem"></i>
            <i v-else-if="dutyCard.casino == 4" style="color: #daa520;" class="far fa-gem"></i>
        </div>
    </div>
</template>
<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'IdCard',
    extends: BaseComponent,
    data () {
        return {
            perso     : null,
            dutyCard  : null,
            persocolor: 'perso1',
            dutycolor : '',
        }
    },
    methods: {
        updatePerso   : function (firstName, lastName, birthday, address, level, playerId, casino, govLevel) {
            if (level >= 0 && level <= 3) {
                this.persocolor = 'perso1'
            } else if (level >= 4 && level <= 5) {
                this.persocolor = 'perso2'
            } else if (level >= 6 && level <= 9) {
                this.persocolor = 'perso3'
            } else if (level >= 10 && level <= 19) {
                this.persocolor = 'perso4'
            } else if (level >= 20 && level <= 29) {
                this.persocolor = 'perso5'
            } else if (level >= 30 && level <= 39) {
                this.persocolor = 'perso6'
            } else if (level >= 40 && level <= 49) {
                this.persocolor = 'perso7'
            } else if (level >= 50 && level <= 59) {
                this.persocolor = 'perso8'
            } else if (level >= 60 && level <= 69) {
                this.persocolor = 'perso9'
            } else if (level >= 70) {
                this.persocolor = 'perso10'
            }
            this.perso = {
                firstName: firstName,
                lastName : lastName,
                birthday : birthday,
                address  : address,
                level    : level,
                casino   : casino,
                govLevel : govLevel,
                identity : this.crc32(playerId),
            }
            setTimeout(this.resetPerso, 6000)
        },
        updateDutyCard: function (behoerde, dienstnummer, casino, firstname, lastname, cduty, govLevel) {
            if (cduty == 1) {
                this.dutycolor = 'casinoduty'
            } else {
                this.dutycolor = ''
            }
            this.dutyCard = {
                behoerde    : behoerde,
                dienstnummer: dienstnummer,
                casino      : casino,
                firstname   : firstname,
                lastname    : lastname,
                cduty       : cduty,
                govLevel    : govLevel,
            }
            setTimeout(this.resetDutyCard, 6000)
        },
        crc32         : function (s) {
            s                 = String(s)
            var polynomial    = arguments.length < 2 ? 0x04c11db7 : arguments[1] >>> 0
            var initialValue  = arguments.length < 3 ? 0xffffffff : arguments[2] >>> 0
            var finalXORValue = arguments.length < 4 ? 0xffffffff : arguments[3] >>> 0
            var table         = new Array(256)
            var reverse       = function (x, n) {
                var b = 0
                while (--n >= 0) {
                    b <<= 1
                    b |= x & 1
                    x >>>= 1
                }
                return b
            }

            var i = -1
            while (++i < 256) {
                var g = reverse(i, 32)
                var j = -1
                while (++j < 8) {
                    g = ((g << 1) ^ (((g >>> 31) & 1) * polynomial)) >>> 0
                }
                table[i] = reverse(g, 32)
            }

            var crc    = initialValue
            var length = s.length
            var k      = -1
            while (++k < length) {
                var c = s.charCodeAt(k)
                if (c > 255) {
                    throw new RangeError()
                }
                var index = (crc & 255) ^ c
                crc       = ((crc >>> 8) ^ table[index]) >>> 0
            }
            return (crc ^ finalXORValue) >>> 0
        },
        resetPerso    : function () {
            this.perso = null
        },
        resetDutyCard : function () {
            this.dutyCard = null
        },
    },
}
</script>
<style scoped>
.perso {
    width:           25rem;
    height:          10rem;
    display:         block;
    border:          1px solid rgba(0, 0, 0, 0.15);
    border-radius:   1rem;
    background:      url(../../assets/id_card_bg.jpg) no-repeat;
    background-size: 35rem;
    z-index:         -2;
    position:        relative;
    font-family:     'Poppins', sans-serif;
}

.perso1::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgba(255, 255, 255, 0.25);
}

.perso2::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgb(223, 113, 254, 0.25);
}

.perso3::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgba(7, 138, 28, 0.25);
}

.perso4::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgba(34, 65, 254, 0.25);
}

.perso5::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgba(245, 249, 18, 0.25);
}

.perso6::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgba(132, 7, 132, 0.25);
}

.perso7::after {
    position:         absolute;
    content:          " ";
    top:              0;
    left:             0;
    width:            100%;
    height:           100%;
    z-index:          -1;
    border:           1px solid rgba(0, 0, 0, 0.15);
    border-radius:    1rem;
    background-color: rgba(165, 17, 30, 0.35);
}

.perso8::after {
    position:      absolute;
    content:       " ";
    top:           0;
    left:          0;
    width:         100%;
    height:        100%;
    z-index:       -1;
    border:        1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    background:    radial-gradient(ellipse farthest-corner at right bottom, #fedb37 0%, #fdb931 8%, #9f7928 30%, #8a6e2f 40%, transparent 80%),
                   radial-gradient(ellipse farthest-corner at left top, #fff 0%, #ffffac 8%, #d1b464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
}

.perso9::after {
    position:      absolute;
    content:       " ";
    top:           0;
    left:          0;
    width:         100%;
    height:        100%;
    z-index:       -1;
    border:        1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    background:    radial-gradient(ellipse farthest-corner at right bottom, #37fefe 0%, #31cdfd 8%, #289f9f 30%, #2f5e8a 40%, transparent 80%),
                   radial-gradient(ellipse farthest-corner at left top, #fff 0%, #acd7ff 8%, #64d1cc 25%, #1f5b5d 62.5%, #1f515d 100%);
}

.perso10::after {
    position:      absolute;
    content:       " ";
    top:           0;
    left:          0;
    width:         100%;
    height:        100%;
    z-index:       -1;
    border:        1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    background:    radial-gradient(ellipse farthest-corner at right bottom, #fe3737 0%, #fd3131 8%, #9f2828 30%, #8a2f2f 40%, transparent 80%),
                   radial-gradient(ellipse farthest-corner at left top, #fff 0%, #ffacac 8%, #d16464 25%, #5d1f1f 62.5%, #5d1f1f 100%);
}

.casinoduty::after {
    position:      absolute;
    content:       " ";
    top:           0;
    left:          0;
    width:         100%;
    height:        100%;
    z-index:       -1;
    border:        1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    background:    radial-gradient(ellipse farthest-corner at right bottom, #e7feff 0%, #80daeb 8%, #93ccea 30%, #8cbed6 40%, transparent 80%),
                   radial-gradient(ellipse farthest-corner at left top, #fff 0%, #f0f8ff 8%, #f0ffff 25%, #87d3f8 62.5%, #8cbed6 100%);
}

.perso > .lslogo {
    width:               10rem;
    height:              10rem;
    display:             block;
    background:          url(../../assets/id_card_icon2.png) no-repeat center center;
    background-size:     10rem;
    background-position: -4rem;
    opacity:             0.2;
    text-align:          center;
}

.perso > .head-text {
    position:    absolute;
    color:       black;
    top:         0.3em;
    left:        0.5em;
    font-size:   1.4em;
    font-weight: bold;
}

.perso > .infos {
    position:  absolute;
    top:       2em;
    left:      4em;
    font-size: 0.9em;
}

.perso > .dutycard {
    position:  absolute;
    top:       3.2em;
    left:      4em;
    font-size: 0.9em;
}

.perso > .infos > .info-block {
    float:       left;
    margin-left: 3.5em;
    margin-top:  1em;
}

.perso > .infos > .info-block > .info-text {
    font-weight: bold;
    margin-top:  0.2em;
}

.perso > .infos > .clearfix {
    clear: both;
}

.perso > .code-block {
    position:  absolute;
    right:     -2.5em;
    top:       4.2em;
    font-size: 0.8em;
    transform: rotate(90deg);
}

.perso > .code-block > .crc {
    float: left;
}

.perso > .code-block > .level {
    margin-left: 0.6em;
    float:       right;
}

.perso > .newbie {
    position:  absolute;
    right:     0.3em;
    bottom:    0.3em;
    font-size: 0.9em;
    opacity:   0.45;
}
</style>
<!-- components.get("IdCard").update(1, "bla", "bla", "bla", "bla", 1, "") components.get("IdCard").update(2, "bla", "bla", "bla", "bla", 4, "") -->