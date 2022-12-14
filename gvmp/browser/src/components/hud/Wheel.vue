<template>
    <div :id="id" class="circleMenu" v-show="visible">
        <h3
            v-if="wheelDescription !== null"
            class="circleMenuLabel"
            style="top: 50px; text-align: center; display: block; width: 100%; height: 100%"
        >
            {{ wheelDescription }}
        </h3>

        <div
            v-if="activeItem && activeItem.hasOwnProperty(labelField)"
            class="circleMenuLabel"
            :style="{
                top: middlePoint.y - (radius / 6.4) - 133 + 'px',
                left: middlePoint.x - (radius * 0.55)  + 'px',
                width: radius * 1.10 + 'px',
                'font-size': radius / 11.5 + 'px'
            }"
        >
            {{ activeItem[labelField] }}
        </div>

        <div
            v-if="activeItem && activeItem.hasOwnProperty(descriptionField)"
            class="circleMenuDescription"
            :style="{
                top: middlePoint.y - (radius / 6.4) - 97 + 'px',
                left: middlePoint.x - (radius * 0.55) + 'px',
                width: radius * 1.10 + 'px',
                'font-size': radius / 15 + 'px'
            }"
        >
            {{ activeItem[descriptionField] }}
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    props: {
        items: {
            required: true,
            default : () => [],
        },

        id: {
            default: () => { return 'wheel-' + Math.random().toString().replace('.', '') },
        },

        wheelDescription: {
            default: null,
        },

        visible: {
            default: false,
        },

        labelField: {
            default: 'label',
        },

        descriptionField: {
            default: 'description',
        },

        imgField: {
            default: 'icon',
        },

        imageWidth: {
            type   : Number,
            default: 40,
        },

        imageHeight: {
            type   : Number,
            default: 40,
        },

        imagePath: {
            default: '@/assets/',
        },

        keyToUse: {
            default: null,
        },

        clickToSelect: {
            type   : Boolean,
            default: false,
        },

        blacklist: {
            default: () => [],
        },
    },

    data () {
        return {
            middlePoint: this.getMiddlePoint(),
            radius     : window.innerHeight * 0.29,
            activeItem : null,
            activeIdx  : null,

            oRadius: null,
            iRadius: null,

            width : null,
            height: null,

            pie: null,

            // Arc definitions
            arc        : null,
            arcOuter   : null,
            arcOuterBig: null,

            svg: null,

            // Arc elements
            arcs        : null,
            outerArcs   : null,
            outerArcsBig: null,

            // Data
            d: null,
        }
    },

    mounted () {
        this.oRadius = window.innerHeight * 0.295
        this.iRadius = window.innerHeight * 0.19

        this.width  = window.innerWidth
        this.height = window.innerHeight

        this.pie = d3
            .pie()
            .value(function (d) { return d.value })
            .sort(null)

        this.arc = d3
            .arc()
            .outerRadius(this.oRadius)
            .innerRadius(this.iRadius)

        this.arcOuter = d3
            .arc()
            .outerRadius(this.oRadius + 4)
            .innerRadius(this.iRadius + (this.oRadius - this.iRadius - 1))

        this.arcOuterBig = d3
            .arc()
            .outerRadius(this.oRadius + 8)
            .innerRadius(this.iRadius + (this.oRadius - this.iRadius - 1))

        this.svg = d3
            .selectAll('#' + this.id)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)

        let _w = this.width,
            _h = this.height

        this.outerArcs = this
            .svg
            .append('g')
            .attr('class', 'outer-arc')
            .attr('transform', function () {
                let shiftWidth = null
                if (window.innerWidth >= 960) shiftWidth = _w / 2 + 3
                if (window.innerWidth <= 960) shiftWidth = _w / 3 + 3

                return 'translate(' + shiftWidth + ',' + (_h / 2 - 58.5) + ')'
            })

        this.arcs = this
            .svg
            .append('g')
            .attr('class', 'arc')
            .attr('transform', function () {
                let shiftWidth = null
                if (window.innerWidth >= 960) shiftWidth = _w / 2 + 3
                if (window.innerWidth <= 960) shiftWidth = _w / 3 + 3

                return 'translate(' + shiftWidth + ',' + (_h / 2 - 58.5) + ')'
            })

        this.renderWheel()
    },

    watch: {
        items: function () {
            this.renderWheel()
        },

        visible: function (val) {
            if (val) {
                window.addEventListener('mousemove', this.onMouseMove)

                if (this.keyToUse !== null) {
                    window.addEventListener('keyup', this.onKeyUp)
                }

                if (this.clickToSelect) {
                    window.addEventListener('click', this.onClick)
                }
            } else {
                window.removeEventListener('mousemove', this.onMouseMove)

                if (this.keyToUse !== null) {
                    window.removeEventListener('keyup', this.onKeyUp)
                }

                if (this.clickToSelect) {
                    window.removeEventListener('click', this.onClick)
                }
            }
        },

        activeIdx: function (val) {
            let _this = this

            this.arcs.selectAll('path').data(this.pie).each(function (d, i) {
                if (i === val) {
                    d3.select(this).attr('fill', 'rgba(214,71,0,0.3)')
                } else {
                    d3.select(this).attr('fill', 'rgba(0,0,0,0.3)')

                    if (_this.blacklist.length > 0 && _this.blacklist.indexOf(i) !== -1) {
                        d3.select(this).attr('fill', 'rgba(0,0,0,0.1)')
                    }
                }
            })

            this.outerArcs.selectAll('path').data(this.pie).each(function (d, i) {
                if (i === val) {
                    d3.select(this).attr('fill', 'rgba(214,71,0,1)').attr('d', _this.arcOuterBig)
                } else {
                    d3.select(this).attr('fill', 'rgba(0,0,0,1)').attr('d', _this.arcOuter)

                    if (_this.blacklist.length > 0 && _this.blacklist.indexOf(i) !== -1) {
                        d3.select(this).attr('fill', 'rgba(0,0,0,0)')
                    }
                }
            })
        },
    },

    methods: {
        /**
         * Calculates the item index from current mouse position.
         */
        getIndexFromPoint (point) {
            let itemRange = 2 * Math.PI / this.items.length,
                diffX     = this.middlePoint.x - point.x,
                diffY     = this.middlePoint.y - point.y,
                angle     = Math.atan2(diffY, diffX)

            //rotate that 0 is on top
            angle += Math.PI * 3 / 2

            //rotate lightly to left that circle is in the middle of the range
            angle += itemRange / 2

            //calculate module 2pi to be in range [0, 2pi]
            angle %= 2 * Math.PI

            return Math.floor(angle / itemRange)
        },

        /**
         * On Mouse move event handler.
         */
        onMouseMove (event) {
            let selectedIndex = this.getIndexFromPoint({
                x: event.clientX,
                y: event.clientY,
            })

            if (this.blacklist.length > 0 && this.blacklist.indexOf(selectedIndex) !== -1) {
                return
            }

            this.activeIdx  = selectedIndex
            this.activeItem = this.items[selectedIndex]
        },

        /**
         * On key up event handler.
         */
        onKeyUp (event) {
            if (event.key !== this.keyToUse) return

            this.$emit('selected', this.activeItem)
        },

        /**
         * On click event handler.
         */
        onClick () {
            if (this.activeItem === null) return

            this.$emit('selected', this.activeItem)
        },

        /**
         * Get middle point of the screen.
         *
         * @returns {{x: number, y: number}}
         */
        getMiddlePoint () {
            let width  = window.innerWidth,
                height = window.innerHeight,
                x      = Math.round(width / 2),
                y      = Math.round(height / 2)

            return { x: x, y: y }
        },

        /**
         * Generates data fields for the wheel.
         *
         * @param {number} size
         *
         * @returns {[{value: float, image: string, label: string}]}
         */
        makeData (size) {
            let _this = this

            return d3.range(size).map(function (item) {
                return {
                    value: 100 / size,
                    image: _this.items[item][_this.imgField],
                    label: _this.items[item][_this.labelField],
                }
            })
        },

        /**
         * Renders the wheel according to the given items.
         */
        renderWheel () {
            let _this = this,
                image

            if (this.items.length === 0) return

            this.d = this.makeData(this.items.length)

            this.pie
                // For a centered first item, we need to adjust the startAngle
                .startAngle((Math.PI / this.items.length) * -1)
                // Pad angle ist the space between each item
                .padAngle(0.005)

            // Remove all previous arcs
            this.arcs.selectAll('path').remove()
            this.outerArcs.selectAll('path').remove()

            // Remove image containers
            this.arcs.selectAll('g').remove()

            // Create outer arcs
            this.outerArcs
                .datum(this.d)
                .selectAll('path')
                .data(this.pie)
                .enter()
                .append('path')
                .attr('fill', 'rgba(0,0,0,1)')
                .attr('d', this.arcOuter)
                .style('stroke', 'white')
                .style('stroke-width', 0)
                .each(function (d, i) {
                    let self = this

                    if (_this.blacklist.length > 0 && _this.blacklist.indexOf(i) !== -1) {
                        d3.select(self).attr('fill', 'rgba(0,0,0,0)')
                    }
                })

            // Create inner arcs with images
            this.arcs
                .datum(this.d)
                .selectAll('path')
                .data(this.pie)
                .enter()
                .append('path')
                .attr('fill', 'rgba(0,0,0,0.3)')
                .attr('d', this.arc)
                .each(function (d, i) {
                    let self = this

                    if (_this.blacklist.length > 0 && _this.blacklist.indexOf(i) !== -1) {
                        d3.select(self).attr('fill', 'rgba(0,0,0,0.1)')
                    }

                    // We have no image.
                    if (_this.imgField === '' ||
                        _this.imgField === null ||
                        d.data.image === '' ||
                        d.data.image === null ||
                        !d.data.hasOwnProperty('image')
                    ) return

                    /*
                        // Load image

                        This is how images could be loaded into an html5 canvas.
                        The only downside is, that you have to set the dimensions
                        of the picture manually.
                    */
                    image        = new Image()
                    image.onload = function () {
                        let dim = {
                            width : _this.imageWidth,
                            height: _this.imageHeight,
                        }

                        d3.select(self.parentNode)
                          .append('g')
                          .attr('transform', function () {
                              return 'translate(' + _this.arc.centroid(d) + ')'
                          })
                          .append('svg:image')
                          .attr('xlink:href', function () {
                              return d.data.image
                          })
                          .attr('width', dim.width)
                          .attr('height', dim.height)
                          .attr('x', -1 * dim.width / 2)
                          .attr('y', -1 * dim.height / 2)
                    }
                    image.src    = d.data.image
                })
        },
    },
}
</script>