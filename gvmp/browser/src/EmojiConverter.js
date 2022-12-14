let _ = { toArray: require('lodash.toarray') }

class EmojiConverter {
    /**
     * Create an emoji converter instance
     *
     * @constructor
     * @param sources an array of emoji sources. Default is `[EmojiConverter.EMOJI_DEFAULT_SOURCE]`
     */
    constructor (sources) {
        this.sources = sources

        if (!this.sources) {
            this.sources = [EmojiConverter.EMOJI_DEFAULT_SOURCE]
        }

        // emojiMap is shortcode:unicode
        this.emojiMap     = {}
        // shortcodeMap is unicode:shortcode
        this.shortcodeMap = {}
        // aliasMap is alias:shortcode
        this.aliasMap     = {}
        // nameMap is shortcode:name
        this.nameMap      = {}
        // objectMap shortcode:object
        this.objectMap    = {}

        this.sources.forEach(source => {

            // array format (may be missing unicode character. see README.)
            if (Array.isArray(source)) {

                source.forEach(item => {
                    let unicode    = item.unicode
                    let shortname  = item.shortname
                    // let name       = item.name || shortname.replace(/:/g, '')
                    let shortnames = [shortname, ...(item.shortname_alternates || [])]

                    shortnames.forEach(s => {
                        if (unicode) {
                            this.emojiMap[s] = unicode
                        }
                        this.aliasMap[s] = shortname
                    })

                    if (unicode) { this.shortcodeMap[unicode] = shortname }
                    this.nameMap[shortname]   = item.name || shortname.replace(/:/g, '')
                    this.objectMap[shortname] = item
                })

                return
            }

            // object format (from emoji-toolkit/emoji_strategy.json)
            // iterate through each key (key is the unicode sequence)
            Object.keys(source).forEach(sequence => {

                let entry   = source[sequence]
                let unicode = EmojiConverter.pointsStringToUnicode(entry['unicode_output'])

                let shortname  = entry.shortname
                let shortnames = [shortname, ...entry.shortname_alternates]

                shortnames.forEach(s => {
                    this.emojiMap[s.toLowerCase()] = unicode
                    this.aliasMap[s.toLowerCase()] = shortname
                })

                this.shortcodeMap[unicode] = shortname
                this.nameMap[shortname]    = entry.name || shortname.replace(/:/g, '')
                this.objectMap[shortname]  = entry

            })
        })

    }

    // replacer function takes in (unicode, shortcode, name)

    /**
     * Replace unicode in a string with a custom function
     *
     * @param {string} str the string to operate on
     * @param {function} replacer the replacer function
     *
     * @returns {string} the resultant string
     */
    replaceUnicodeWith (str, replacer) {
        return _.toArray(str)
                .map(s => {
                    let shortcode = this.shortcodeMap[s]
                    if (shortcode) {
                        let name = this.nameMap[shortcode] || ''
                        let obj  = this.objectMap[shortcode] || {}
                        return replacer(s, shortcode, name, obj)
                    } else { // no short code for this unicode char. i.e. we don't have this.
                        return s
                    }
                })
                .join('')
    }

    /**
     * Replace shortcodes in a string with a custom function
     *
     * @param {string} str the string to operate on
     * @param {function} replacer the replacer function
     *
     * @returns {string} the resultant string
     */
    replaceShortcodesWith (str, replacer) {
        return str.replace(EmojiConverter.SHORTCODE_REGEX, (match) => {
            let short = match.toLowerCase()
            let uni   = this.emojiMap[short] || ''
            let name  = this.nameMap[short] || ''
            let obj   = this.objectMap[short] || {}
            return replacer(uni, short, name, obj)
        })
    }

    /**
     * Replace unicode and shortcodes in a string with a custom function
     *
     * @param {string} str the string to operate on
     * @param {function} replacer the replacer function
     *
     * @returns {string} the resultant string
     */
    replaceWith (str, replacer) {
        return this.replaceShortcodesWith(this.replaceUnicode(str), replacer)
    }

    /**
     * Replace unicode in a string with shortcodes
     *
     * @param {string} str the string to operate on
     *
     * @returns {string} the resultant string
     */
    replaceUnicode (str) {
        return _.toArray(str)
                .map(s => this.shortcodeMap[s] || s)
                .join('')
    }

    /**
     * Replace shortcodes in a string with unicode
     *
     * @param {string} str the string to operate on
     *
     * @returns {string} the resultant string
     */
    replaceShortcodes (str) {
        return str.replace(EmojiConverter.SHORTCODE_REGEX, (match) => {
            return this.emojiMap[match.toLowerCase()] || match
        })
    }

    /**
     * Replace short codes with their more normalized version.
     *
     * @param {string} str the string to operate on
     *
     * @returns {string} the resultant string
     */
    normalizeShortcodes (str) {
        return str.replace(EmojiConverter.SHORTCODE_REGEX, (match) => {
            return this.aliasMap[match.toLowerCase()] || match
        })
    }

}

/**
 * Convert a single unicode emoji to a string representing codepoints (such as '1f646-1f3ff-2642')
 *
 * @param {string} str the unicode sequence you want converted
 *
 * @returns {string}
 */
EmojiConverter.unicodeToPointsString = function (str) {
    return Array.from(str).map(s => s.codePointAt(0).toString(16)).join('-')
}

/**
 * Convert a string representing unicode codepoints (such as '1f646-1f3ff-2642')
 *
 * @param {string} str the unicode sequence you want converted
 *
 * @returns {string}
 */
EmojiConverter.pointsStringToUnicode = function (str) {
    let unicode = ''
    let codes   = str.split('-')

    for (let i = 0; i < codes.length; i++) {
        unicode += String.fromCodePoint(Number('0x' + codes[i]))
    }

    return unicode
}

EmojiConverter.EMOJI_DEFAULT_SOURCE = require('emoji-toolkit/emoji_strategy.json')

EmojiConverter.SHORTCODE_REGEX = /(:(\w|\+|-)+:)/gim

export default EmojiConverter