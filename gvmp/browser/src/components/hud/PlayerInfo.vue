<template>
    <div class="playerInfo" style="text-align: right;">

        <span style="margin-right: 10px;">{{ timestamp }}</span>
        <span> {{ playerId }} | </span>
        <span>TS-Nr: {{ voiceHash }}</span>
        
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
}
</style>