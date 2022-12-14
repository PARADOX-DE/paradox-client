<script>
import BaseComponent from './BaseComponent'
import mp from '../mp'

export default {
    name: 'base-window',

    extends: BaseComponent,

    methods: {
        dismiss () {
            if (this.$parent.hasOwnProperty('show') && typeof this.$parent.show === 'function') {
                this.$parent.show(null)

                mp.trigger('onWindowClosed', this.$options.name)
            }
        },
    },
}
</script>