<template>
    <div id="Gangwar" v-if="gangwarShow">
        <div class="scoreBoard">
            <div class="attackerTeamBox">
                <div class="teamScore" v-bind:class="attackerColor">
                    <div class="teamScoreDetail">
                        <div class="teamScoreDetailText">{{ attackerScore }}</div>
                    </div>
                </div>
                <div class="teamLogo" v-bind:class="attackerColor">
                    <div class="teamLogoDetail">
                        <div class="teamLogoDetailImage"><img v-bind:src="getImageLoader(attackerId)"></div>
                    </div>
                </div>
                <div class="teamName" v-bind:class="attackerColor">
                    <div class="teamNameDetail">
                        {{ attackerTeam }}
                    </div>
                </div>
            </div>
            <div class="gameLogo">
                <svg
                    height="60px"
                    viewBox="0 0 512 512"
                    width="60px"
                    xmlns="http://www.w3.org/2000/svg"
                    v-bind:class="betterTeamColor"
                >
                    <path d="m90 467c0 24.851562-20.148438 45-45 45s-45-20.148438-45-45 20.148438-45 45-45 45 20.148438 45 45zm0 0" />
                    <path d="m120.246094 306.898438 21.214844 21.214843-21.214844 21.214844 42.425781 42.425781 21.214844-21.214844 21.210937 21.214844 21.214844-21.214844-84.851562-84.851562zm0 0" />
                    <path d="m72.324219 397.246094c9.363281 3.65625 18.160156 9.167968 25.707031 16.722656 7.550781 7.546875 13.066406 16.34375 16.71875 25.707031l26.710938-26.707031-42.429688-42.429688zm0 0" />
                    <path d="m181.355469 283.15625 46.980469 46.980469 256.328124-219.441407 27.335938-110.695312-112.1875 25.84375zm0 0" />
                    <path d="m512 467c0 24.851562-20.148438 45-45 45s-45-20.148438-45-45 20.148438-45 45-45 45 20.148438 45 45zm0 0" />
                    <path d="m370.539062 285.6875-84.851562 84.851562 21.214844 21.214844 21.210937-21.214844 21.214844 21.214844 42.425781-42.425781-21.214844-21.214844 21.214844-21.214843zm0 0" />
                    <path d="m412.96875 370.539062-42.429688 42.429688 26.710938 26.707031c3.652344-9.363281 9.167969-18.160156 16.71875-25.707031 7.546875-7.554688 16.34375-13.066406 25.707031-16.722656zm0 0" />
                    <path d="m178.492188 240.160156 57.835937-68.171875-124.140625-146.144531-112.1875-25.84375 27.335938 110.695312zm0 0" />
                </svg>
                <div class="gameTimer">
                    {{ timeConv(gangwarTime) }}
                </div>
            </div>
            <div class="defenderTeamBox">
                <div class="teamName" v-bind:class="defenderColor">
                    <div class="teamNameDetail">
                        {{ defenderTeam }}
                    </div>
                </div>
                <div class="teamLogo" v-bind:class="defenderColor">
                    <div class="teamLogoDetail">
                        <div class="teamLogoDetailImage"><img v-bind:src="getImageLoader(defenderId)"></div>
                    </div>
                </div>
                <div class="teamScore" v-bind:class="defenderColor">
                    <div class="teamScoreDetail">
                        <div class="teamScoreDetailText">{{ defenderScore }}</div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'Gangwar',
    extends: BaseComponent,
    data () {
        return {
            attackerId   : null,
            defenderId   : null,
            attackerTeam : '',
            defenderTeam : '',
            attackerScore: null,
            defenderScore: null,
            gangwarTime  : 0,
            interval     : null,
            gangwarShow  : false,
            winnerTeam   : null,
        }
    },
    methods : {
        finishGangwar () {
            this.gangwarShow = false
            this.stopTimer()
        },
        updateScore (attackerScore, defenderScore) {
            this.attackerScore = attackerScore
            this.defenderScore = defenderScore

            if (attackerScore == defenderScore) {
                this.winnerTeam = 0
            } else if (attackerScore > defenderScore) {
                this.winnerTeam = this.attackerId
            } else if (defenderScore > attackerScore) {
                this.winnerTeam = this.defenderId
            }
        },
        initializeGangwar (attackerTeam, defenderTeam, attackerId, defenderId, gangwarTime) {
            this.gangwarShow   = true
            this.attackerId    = attackerId
            this.defenderId    = defenderId
            this.attackerTeam  = attackerTeam
            this.defenderTeam  = defenderTeam
            this.attackerScore = 0
            this.defenderScore = 0
            this.winnerTeam    = 0
            this.gangwarTime   = parseInt(gangwarTime)
            if (this.interval != null) return
            this.startTimer()
        },
        startTimer () {
            this.interval = setInterval(this.incGangwarTime, 1000)
        },
        stopTimer () {
            clearInterval(this.interval)
            this.interval    = null
            this.gangwarTime = 0
        },
        incGangwarTime () {
            this.gangwarTime -= 1
            if (this.gangwarTime <= 0) {
                this.stopTimer()
            }
        },
        timeConv (time) {
            var sec_num = parseInt(time, 10)
            var hours   = Math.floor(sec_num / 3600)
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
            var seconds = sec_num - (hours * 3600) - (minutes * 60)
            if (hours < 10) { hours = '0' + hours }
            if (minutes < 10) { minutes = '0' + minutes }
            if (seconds < 10) { seconds = '0' + seconds }
            return minutes + ':' + seconds
        },
        getImageLoader (fraktionId) {
            return require('@/assets/fraktionen/' + fraktionId + '.png')
        },
    },
    computed: {
        attackerColor  : function () {
            return {
                'ballas'      : this.attackerId == 2,
                'lost'        : this.attackerId == 6,
                'irishmob'    : this.attackerId == 8,
                'lcn'         : this.attackerId == 9,
                'yakuza'      : this.attackerId == 10,
                'banditos'    : this.attackerId == 11,
                'grove'       : this.attackerId == 12,
                'vagos'       : this.attackerId == 18,
                'madrazo'     : this.attackerId == 27,
                'triaden'     : this.attackerId == 44,
                'org'         : this.attackerId == 47,
                'marabunta'   : this.attackerId == 49,
                'bratwa'      : this.attackerId == 50,
                'balkaneros'  : this.attackerId == 52,
            }
        },
        defenderColor  : function () {
            return {
                'ballas'      : this.defenderId == 2,
                'lost'        : this.defenderId == 6,
                'irishmob'    : this.defenderId == 8,
                'lcn'         : this.defenderId == 9,
                'yakuza'      : this.defenderId == 10,
                'banditos'    : this.defenderId == 11,
                'grove'       : this.defenderId == 12,
                'vagos'       : this.defenderId == 18,
                'madrazo'     : this.defenderId == 27,
                'triaden'     : this.defenderId == 44,
                'org'         : this.defenderId == 47,
                'marabunta'   : this.defenderId == 49,
                'bratwa'      : this.defenderId == 50,
                'balkaneros'  : this.defenderId == 52,
            }
        },
        betterTeamColor: function () {
            return {
                'normalize'       : this.winnerTeam == 0,
                'ballasFill'      : this.winnerTeam == 2,
                'lostFill'        : this.winnerTeam == 6,
                'irishmobFill'    : this.winnerTeam == 8,
                'lcnFill'         : this.winnerTeam == 9,
                'yakuzaFill'      : this.winnerTeam == 10,
                'banditosFill'    : this.winnerTeam == 11,
                'groveFill'       : this.winnerTeam == 12,
                'vagosFill'       : this.winnerTeam == 18,
                'madrazoFill'     : this.winnerTeam == 27,
                'triadenFill'     : this.winnerTeam == 44,
                'orgFill'         : this.winnerTeam == 47,
                'marabuntaFill'   : this.winnerTeam == 49,
                'bratwaFill'      : this.winnerTeam == 50,
                'balkanerosFill'  : this.winnerTeam == 52,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.normalize {
    fill: black;
}

.scoreBoard {
    text-align: center;
    width: 55rem;
    margin-bottom: -5rem;
    font-family: Roboto;
}

.attackerTeamBox {
    float: left;
}

.attackerTeamBox > .teamScore {
    height: 2.5rem;
    width: 5rem;
    transform: skew(-20deg);
    padding: 0.1rem;
    text-align: center;
    float: left;
}

.attackerTeamBox > .teamScore > .teamScoreDetail {
    height: 3rem;
    width: 5rem;
    background-color: #333;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    margin-top: -0.3rem;
    margin-left: 0.5rem;
    padding-right: 2rem;
    text-align: center;
}

.attackerTeamBox > .teamScore > .teamScoreDetail > .teamScoreDetailText {
    transform: skew(20deg);
    color: white;
    font-size: 1.3rem;
    margin-left: 0.8rem;
    margin-top: 0.2rem;
}

.attackerTeamBox > .teamLogo {
    height: 2.5rem;
    width: 5rem;
    transform: skew(-20deg);
    padding: 0.1rem;
    text-align: center;
    float: left;
    margin-left: 1rem;
}

.attackerTeamBox > .teamLogo > .teamLogoDetail {
    height: 3rem;
    width: 5rem;
    background-color: #333;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    margin-top: -0.3rem;
    margin-left: 0.5rem;
    padding-right: 2rem;
    text-align: center;
}

.attackerTeamBox > .teamLogo > .teamLogoDetail > .teamLogoDetailImage {
    transform: skew(20deg);
    color: white;
    font-size: 1.8rem;
    margin-left: 0.3rem;
    margin-top: -0.3rem;
}

.attackerTeamBox > .teamLogo > .teamLogoDetail > .teamLogoDetailImage > img {
    width: 3rem;
    margin-left: 0.5rem;
}

.attackerTeamBox > .teamName {
    transform: skew(-20deg);
    height: 3rem;
    width: 10rem;
    background-color: #333;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    margin-left: 1rem;
    padding-right: 2rem;
    text-align: center;
    float: left;
}

.attackerTeamBox > .teamName > .teamNameDetail {
    transform: skew(20deg);
    color: white;
    font-size: 1.6rem;
    text-align: center;
}

.gameLogo {
    float: left;
    margin-top: -1rem;
    margin-left: 1rem;
    margin-right: 1rem;
}

.gameLogo > img {
    float: left;
}

.defenderTeamBox {
    float: left;
}


.defenderTeamBox > .teamLogo {
    height: 2.5rem;
    width: 5rem;
    transform: skew(20deg);
    padding: 0.1rem;
    text-align: center;
    margin-left: 1rem;
    float: left;
}

.defenderTeamBox > .teamLogo > .teamLogoDetail {
    height: 3rem;
    width: 5rem;
    background-color: #333;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    margin-top: -0.3rem;
    margin-right: 0.5rem;
    margin-left: -0.7rem;
    padding-left: 2rem;
    text-align: center;
}

.defenderTeamBox > .teamLogo > .teamLogoDetail > .teamLogoDetailImage {
    transform: skew(-20deg);
    color: white;
    font-size: 1.8rem;
    margin-left: -2rem;
    margin-top: -0.3rem;
}

.defenderTeamBox > .teamLogo > .teamLogoDetail > .teamLogoDetailImage > img {
    width: 3rem;
}

.defenderTeamBox > .teamScore {
    height: 2.5rem;
    width: 5rem;
    transform: skew(20deg);
    padding: 0.1rem;
    text-align: center;
    margin-left: 1.1rem;
    float: left;
}

.defenderTeamBox > .teamScore > .teamScoreDetail {
    height: 3rem;
    width: 5rem;
    background-color: #333;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    margin-top: -0.3rem;
    margin-right: 0.5rem;
    margin-left: -0.8rem;
    padding-left: 2rem;
    text-align: center;
}

.defenderTeamBox > .teamScore > .teamScoreDetail > .teamScoreDetailText {
    transform: skew(-20deg);
    color: white;
    font-size: 1.3rem;
    margin-left: -2.8rem;
    margin-top: 0.2rem;
}

.defenderTeamBox > .teamName {
    transform: skew(20deg);
    height: 3rem;
    width: 10rem;
    background-color: #333;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    padding-right: 2rem;
    text-align: center;
    float: left;
}

.defenderTeamBox > .teamName > .teamNameDetail {
    transform: skew(-20deg);
    color: white;
    font-size: 1.6rem;
    text-align: center;
    margin-left: 1.5rem;
}

.gameTimer {
    width: 8rem;
    height: 2rem;
    background-color: #333;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-spacing: 0.1rem;
    color: white;
    text-align: center;
    margin-left: -2rem;
    position: absolute;
}

/*
    Team Colors
*/
.clearfix {
    clear: both;
}

.madrazo {
    background-color: rgb(253,240,170);
}

.madrazoFill {
    fill: rgb(253,240,170);
}

.ballas {
    background-color: rgb(102,0,204);
}

.ballasFill {
    fill: rgb(102,0,204);
}


.balkaneros {
    background-color: rgb(73,17,29);
}

.balkanerosFill {
    fill: rgb(73,17,29);
}

.irishmob {
    background-color: #60913d;
}

.irishmobFill {
    fill: #60913d;
}

.grove {
    background-color: rgb(0,204,0);
}

.groveFill {
    fill: rgb(0,204,0);
}

.yakuza {
    background-color: #520000;
}

.yakuzaFill {
    fill: #520000;
}

.lost {
    background-color: rgb(102,51,0);
}

.lostFill {
    fill: rgb(102,51,0);
}

.banditos {
    background-color: rgb(54, 4, 14);
}

.banditosFill {
    fill: rgb(54, 4, 14);
}

.lcn {
    background-color: #080808;
}

.lcnFill {
    fill: #080808;
}

.triaden {
    background-color: #030e2e;
}

.triadenFill {
    fill: #030e2e;
}

.vagos {
    background-color: #FFFF01;
}

.vagosFill {
    fill: #FFFF01;
}

.marabunta {
    background-color: #0055c4;
}

.marabuntaFill {
    fill: #0055c4;
}

.bratwa {
    background-color: #999da0;
}

.bratwaFill {
    fill: #999da0;
}

.org {
    background-color: #fff;
}

.orgFill {
    fill: #fff;
}
</style>

<!--  check -->