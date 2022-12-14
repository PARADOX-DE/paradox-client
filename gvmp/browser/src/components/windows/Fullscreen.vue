<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Fullscreen',

    extends: BaseWindow,

    props: {
        data: String,
    },

    render: h => h('iframe', {
        domProps: {
            src   : this.data,
            height: innerHeight,
            width : innerWidth,
            allow : 'autoplay; fullscreen;',
        },
    }),
}
</script>

<style scoped>
* {
    margin:   0;
    overflow: hidden;
    border:   none;
}
</style>