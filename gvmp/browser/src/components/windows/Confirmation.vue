<template>
    <div>
        <div class="confirmation">
            <h4 id="title">{{ confirmData.confirmationObject.Title }}</h4>

            <h6>
                {{ confirmData.confirmationObject.Message }}
            </h6>

            <div class="form color-background dark-top" id="confirmForm">
                <button class="btn" v-on:click="handle" id="confirmBtn">Bestätigen</button>
                <button class="btn flat neutral" v-on:click="dismiss" id="cancelBtn">Abbrechen</button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Confirmation',

    extends: BaseWindow,

    props: {
        data: String,
    },
    
    data () {
        return {
            confirmData: JSON.parse(this.data),
        }
    },

    methods: {
        handle () {
            this.triggerServer(
                this.confirmData.confirmationObject.Callback,
                this.confirmData.confirmationObject.Arg1,
                this.confirmData.confirmationObject.Arg2
            )

            this.dismiss()
        },
    },
}
</script>

<style lang="scss" scoped>
.confirmation {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: initial;
    height: initial;
    width: initial;
    margin-left: initial;
    margin-right: initial;
    width: 70vh !important;
    background-color: rgba(0, 0, 0, 0.7) !important;
    border: 0.1vh solid rgba(0, 0, 0, 0.9);
    padding: 0;

    #title {
        width: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 1.5vh 0;
        margin: 0;
    }

    h4, h6 {
        color: white;
    }

    h6 {
        min-height: 8vh;
        padding: 1vh 1vh 0vh 2vh;
    }

    #confirmForm {
        margin-top: 5%;
        border-radius: 1%;
        display: flex;
        justify-content: space-between;
    }

    #confirmBtn {
        background-color: rgba(218, 114, 0, 1);
        color: white;
    }

    #confirmBtn, #cancelBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        border-radius: 0;
    }
}
</style>