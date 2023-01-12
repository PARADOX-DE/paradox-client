<template>
    <div class="playerInfo" style="text-align: right;">
        <div class="playerContainer">
          <div class="playerInfoLogo">
            <img class="logo-img" src="../../assets/logo.svg" />

            <div class="playerInfoLogoText">
              <div class="title">
                <p class="logo-title">PARADOX</p>
                <p class="logo-desc">ROLEPLAY</p>
              </div>

              <div class="online">
                <p class="logo-desc">ONLINE <span class="white">0</span> &#183; <span class="white">1000</span></p>
              </div>
            </div>

          </div>

        </div>

        <span style="margin-right: 5px">{{ timestamp }} -  {{ playerId }}</span>
    </div>
</template>

<script>
    import BaseComponent from '../BaseComponent'

    export default {
        name: "PlayerInfo",
        extends: BaseComponent,
        data() {
            return {
                timestamp: '',
                playerId: 0,
                playerCount: 0,
                voiceHash: ''
            }
        },
        created() {
            setInterval(this.getNow, 1000),
            setInterval(this.changeclock, 1000)
        },
        methods: {
            getNow: function () {
                const today = new Date()
                const date = today.getDate() + '.' + (today.getMonth()+1) + '.' + today.getFullYear();
                const time = this.time;
                const dateTime = date +' '+ time;
                this.timestamp = dateTime;
            },
            changeclock(){
                this.time = new Date();
                this.time.setHours(this.time.getHours())
                if(this.time.getHours() < 10 && parseInt(this.time.getMinutes()) > 9){
                    this.time = "0" + this.time.getHours() + ":" + this.time.getMinutes()
                }else if(this.time.getHours() > 9 && this.time.getMinutes() < 10){
                    this.time = this.time.getHours() + ":0" + this.time.getMinutes()
                }else if(this.time.getHours() < 10 && this.time.getMinutes() < 10){
                    this.time = "0" + this.time.getHours() + ":0" + this.time.getMinutes()
                }else{
                    this.time = this.time.getHours() + ":" + this.time.getMinutes()
                }
            },
            setPlayerId(playerId){
                this.playerId = playerId
            },
            setPlayerCount(playerCount){
                this.playerCount = playerCount
            },
            setVoiceHash(voiceHash){
                this.voiceHash = voiceHash
            }
        }
    }
</script>

<style scoped>
.playerInfo{
    margin-right: 1vh;
    color: white;
    opacity: 0.8;

    display: flex;
    flex-direction: column;
}
.playerContainer {
  display: inline-flex;
  flex-direction: row;
  font-size: 8px;
  justify-content: end;
}

.px-1 {
    color: #83e7cc;
    text-transform: uppercase;
    font-weight: bold;
}

.playerInfoLogo {
  display: flex;
  flex-direction: row-reverse;
}

.playerInfoLogoText {
  display: flex;
  flex-direction: column;
}

.online {
  display: flex;
  flex-direction: row;
}

.white {
    color: #fff;
}

.logo-img {
    width: 35px;
    height: 35px;
    position: relative;
    top: -0.25rem;
}

.logo-title {
    font-size: 12px;
}

.logo-desc {
    font-size: 8px;
    color: #48bde8;
    top: -0.3rem;
    position: relative;
}
</style>