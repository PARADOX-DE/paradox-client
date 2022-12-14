<script>
import BaseComponent from './BaseComponent'

export default {
    name: 'base-app',

    extends: BaseComponent,

    methods: {
        open (name) {
            this.$parent.app = name
        },

        close () {
            this.$parent.app = null
        },

        back () {
            this.$parent.app = 'HomeApp'
        },

        /**
         * Sanitize a given input by respecting a list of whitelisted chars.
         *
         * @param {string} input
         *
         * @return {string}
         */
        sanitizeInput (input) {
            let allowedChars = [
                ' ', 'ä', 'ö', 'ü', 'ß', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
                'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', ',', '.', '-', '_', '|', '§', '$', '%', '&', '#', ':',
                '*', '+', '?', '!', '=',
            ], result = ''

            for (let i = 0; i < input.length; i++) {
                if (allowedChars.indexOf(input[i].toLowerCase()) === -1) {
                    result += '-'
                } else {
                    result += input[i]
                }
            }

            return result
        },
    },
}
</script>