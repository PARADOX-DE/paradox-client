<template>
    <div>
        <div class="jumbotron center card color-background dark-secondary">
            <h4 id="title">{{ inputData.textBoxObject.Title }}</h4>
            <h6>
                {{ inputData.textBoxObject.Message }}
            </h6>
            <div class="form color-background dark-top" id="confirmForm">
                <div class="input-group">
                    <input placeholder="Text eingeben" type="text" v-model="content" autofocus style="color: white;" />
                </div>
                <div class="controls">
                    <button class="btn secondary" v-on:click="handle" id="confirmBtn">Absenden</button>
                    <button class="btn flat neutral" v-on:click="cancel" id="cancelBtn">Abbrechen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../../BaseWindow'

export default {
    name: 'Default',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            content  : '',
            inputData: JSON.parse(this.data),
        }
    },

    methods: {
        handle () {
            if (this.content == '') return
            this.triggerServer(this.inputData.textBoxObject.Callback, this.content)
            this.dismiss()
        }, cancel () {
            this.dismiss()
        },
    },
}
</script>

<style lang="scss" scoped>
h4, h6 {
    color: white;
}

#confirmForm {
    padding: 1vh;
    margin-top: 5%;
    border-radius: 1%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.controls {
    display: flex;
    justify-content: space-between;
    margin-top: 3%;
}

#confirmBtn, #cancelBtn {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>