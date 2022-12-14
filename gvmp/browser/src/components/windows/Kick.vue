<template>
    <div>
        <img class="logo" src="../../assets/logo.png">
        <div class="jumbotron center card">
            <h4>
                Achtung, {{ player.name }}!
            </h4>
            <p class="color-text red">
                Du wurdest von einem Teammitglied gekickt, <br>
                Grund: {{ player.grund }} .<br /><br />
                Melde dich umgehend auf unserem Teamspeak Server: <b>ts.gvmp.de</b> im Support.
            </p>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Kick',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            player: JSON.parse(this.data),
        }
    },
}
</script>

<!-- components.get("Windows").show("Kick", '{"name": "bla", "grund": "bla"}') -->