<template>
    <div>
        <img class="logo" src="../../assets/logo_christmas.png">
        <div class="jumbotron center card">
            <h4>
                Willkommen zurück {{ player.name }}
            </h4>

            <p class="color-text red">
                Du wurdest von einem Administrator gebannt,<br>
                bitte melde dich auf unserem Teamspeak Server: <b>ts.gvmp.de</b> im Support.
            </p>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Bann',

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