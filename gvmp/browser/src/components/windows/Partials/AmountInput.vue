<template>
    <div v-bind:style="data.pos" v-if="data.show" class="jumbotron card">
        <h4 id="title">Anzahl</h4>
        <input style="width: 100%; color: #ccc !important;"  v-model.number="amount" type="number" min="1" v-bind:max="data.max"/><br>
        <button class="btn positive" v-on:click.enter="validate">✓</button>
        <button style="margin-left: 5px;" class="btn negative" v-on:click="dismiss">✖</button>
    </div>
</template>

<script>
export default ({
    name: "AmountInput",
    props: {
        data: Object
    },
    data() {
        return {
            amount: 1
        }
    },
    methods: {
        validate() {
            if (!Number.isInteger(this.amount)) return
            if (this.amount < 1 || this.amount > this.data.max) return
            this.$emit("submit", this.data.type, this.data.oldSlot, this.data.newSlot, this.data.oldInventory, this.amount)
            this.dismiss();
        },
        dismiss() {
            this.$emit("dismiss")
            this.data.show = false;
        }
    },
    watch: {
        data(val) {
            this.amount = val.max
        }
    }
});
</script>

<style scoped>
input {
    color: #000 !important;
    text-align: center;
    margin-bottom: 0.5rem !important;
}
input:focus {
    border-bottom-color: rgba(0, 0, 0, 0.7);
}
</style>