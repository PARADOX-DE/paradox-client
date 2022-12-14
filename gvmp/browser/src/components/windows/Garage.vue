<template>
    <div class="garage">
        <div class="content">
            <div class="nav">
                <div class="head">
                    <div class="img-background">
                        <i
                            style="font-size: 4vh; opacity: 1; margin-left: 2.5vh; margin-top: 3vh; color: #ff9800"
                            class="fas fa-warehouse"
                        ></i>
                    </div>
                    <h3>{{ garage.name }}</h3>
                </div>
                <div class="nav-body">
                    <h5>Aktionen</h5>
                    <h4 v-on:click="state = 'takein'" :class="{'active': (state == 'takein')}">Einparken</h4>
                    <h4 v-on:click="state = 'takeout'" :class="{'active': (state == 'takeout')}">Ausparken</h4>
                </div>
                <div class="nav-search">
                    <input
                        type="text"
                        name="q"
                        class="navsearch"
                        placeholder="Suchbegriff"
                        v-show="!loader"
                        v-model="filter"
                    >
                </div>

                <div v-if="state == 'takeout'" v-on:click="handle" :disabled="vehicleId == null" class="mybtn">
                    <i class="fas fa-car"></i>
                    Ausparken

                </div>
                <div v-if="state == 'takein'" v-on:click="handle" :disabled="vehicleId == null" class="mybtn">
                    <i class="fas fa-car"></i>
                    Einparken
                </div>
            </div>
            <div class="body">
                <div class="head">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr);">
                        <h3 v-show="state == 'takein'">Einparken</h3>
                        <h3 v-show="state == 'takeout'">Ausparken</h3>
                        <div style="margin-top:1.09vh;margin-left:2.192vh">
                        </div>
                        <i v-on:click="terminate" class="fas fa-times"></i>
                    </div>
                </div>
                <div class="body-content">
                    <div class="garage-vehicles">
                        <div
                            v-for="vehicle in displayResults" :key="vehicle.Id" class="card"
                            :class="vehicleId == vehicle.Id ? 'selected' : ''"
                            v-on:click="vehicleId != vehicle.Id ? vehicleId = vehicle.Id : vehicleId = null"
                        >
                            <h5>{{ vehicle.Notice }}</h5>
                            <i
                                style="font-size: 5vh; margin-top: 0.8vh; color: #ccc;"
                                class="fas fa-car responsive-img"
                            ></i>
                            <h5>{{ vehicle.Name }}<br><span><small>{{ vehicle.Id }} ({{ vehicle.Plate }})</small></span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loader" v-show="loader">
                <div class="lds-dual-ring"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Garage',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            garage   : JSON.parse(this.data),
            state    : null,
            vehicles : [],
            vehicleId: null,
            loader   : false,
            filter   : '',
        }
    },
    watch   : {
        state: function (val) {
            this.triggerServer('requestVehicleList', this.garage.id, val)
            this.loader = true
        },
    },
    methods : {
        handle () {
            if (this.vehicleId == null) return
            this.triggerServer(
                'requestVehicle',
                this.state,
                this.garage.id,
                this.vehicleId,
            )
            this.dismiss()
        },
        responseVehicleList (vehiclesString) {
            this.vehicles = JSON.parse(vehiclesString)
            this.loader   = false
        },
        terminate () {
            this.dismiss()
        },
        resultsSearchFilter () {
            var tmp_result = this.vehicles
            // Search Filter
            if (this.filter.length >= 1) {
                tmp_result = tmp_result.filter((x) => {
                    if (!x.hasOwnProperty('Plate')) {
                        x.Plate = ''
                    }
                    return (
                        x.Name.toLowerCase().includes(this.filter.toLowerCase()) ||
                        x.Plate.toLowerCase().includes(this.filter.toLowerCase()) ||
                        x.Id.toString().toLowerCase().includes(this.filter.toLowerCase())
                    )
                })
            }
            return tmp_result
        },

    },
    computed: {
        displayResults () {
            return this.resultsSearchFilter()
        },
    },
    mounted () {
        this.state = 'takeout'
    },
}
</script>

<style lang="scss" scoped>
.garage {

    .card {
        background-color: rgba(255, 255, 255, 0.2);

        &.selected {
            background-color: rgba(255, 255, 255, 0.3);
            box-shadow: inset 0.5vh 0vh 0vh 0vh rgba(255, 152, 0, 1);
        }
    }

    border-radius: 0.35em;
    margin-left: auto;
    margin-right: auto;
    margin-top: 18vh;
    width: 115vh;
    height: 60vh;
    position: relative;

    .content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .nav {
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0.35em;
        margin-right: 1vh;

        .head {
            width: 35vh;
            height: 20vh;
            position: fixed;

            .img-background {
                background-color: rgba(0, 0, 0, .5);
                width: 10vh;
                margin-left: auto;
                margin-right: auto;
                height: 10vh;
                border-radius: 100%;
                display: block;
                margin-top: 2vh;
                box-shadow: 0 1vh 1vh 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.42);

                img {
                    width: 13vh;
                    height: 13vh;
                    display: block;
                    position: fixed;
                    margin: 3.5vh auto auto;
                    left: 20.1%;
                }
            }

            h3 {
                text-align: center;
                color: #eceff1;
                font-size: 3.5vh;
                text-shadow: 2px 2px rgba(0, 0, 0, 0.4);
            }
        }

        .nav-body {
            margin-top: 20vh;

            h5 {
                padding-top: 2vh;
                font-size: 1.7vh;
                margin-left: 2vh;
                color: #90a4ae;
                text-shadow: 2px 2px rgba(0, 0, 0, 0.4);

            }

            h4 {
                font-size: 2.1vh;
                margin: 0;
                padding: 2vh;
                color: #eceff1;
                text-shadow: 2px 2px rgba(0, 0, 0, 0.4);

                &.active {
                    background-color: rgba(0, 0, 0, 0.4);
                    color: #ff9800;
                    box-shadow: inset 0.5vh 0vh 0vh 0vh rgba(255, 152, 0, 1);

                }

                &:hover {
                    cursor: pointer;
                    color: #ff9800;
                }
            }
        }
    }

    .body {
        border-radius: 0.35em;
        float: right;
        width: 80vh;
        height: 60vh;
        background-color: rgba(0, 0, 0, 0.8);
        transform-origin: bottom left;

        .head {
            border-top-right-radius: 1vh;
            border-bottom: 0.2vh solid #ff9800;

            h3 {
                margin-left: 3vh;
                margin-top: 1.5vh;
                margin-bottom: 1.5vh;
                font-size: 3.5vh;
                color: #ccc;
            }

            i {
                font-size: 3.5vh;
                color: #ff9800;
                text-align: right;
                margin-right: 2.8vh;
                margin-top: 1.7vh;
            }

            i:hover {
                color: #fff;
                transition: color 0.5s;
            }
        }

        .body-content {
            .garage-vehicles {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                height: 49vh;

                div {
                    max-height: 10vh;
                    padding: 1vh;

                    h5 {
                        align-self: auto;
                        margin-top: 1vh;
                        margin-left: 1vh;
                        font-size: 1.6vh;
                        color: #ccc;
                    }

                    p {
                        align-self: auto;
                        margin-left: 1vh;
                    }
                }
            }

            button {
                margin-left: 60vh;

                &.btn:not(.flat):not(.primary):not(.positive):not(.negative):not(.neutral):not(.negative):not(.secondary) {
                    color: white;
                }

                &.btn:disabled:not(.flat), .btn[disabled]:not(.flat) {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
}


.navsearch {
    background-color: rgba(0, 0, 0, .4);
    border-radius: 0.35em;
    border-bottom: 0;
    margin: 0 auto;
    width: 90%;
    margin-top: 2vh;
    padding-left: 1vh;
    margin-left: 1.5vh;
}

.mybtn {
    height: 10vh;
    background-color: rgba(0, 0, 0, .5);
    width: 90%;
    color: #fff;
    border-radius: 0.35em;
    margin: 0 auto;
    text-align: center;
    line-height: 10vh;
    margin-top: 3vh;
    font-size: 1.6vh;
    text-transform: uppercase;
    transition: 500ms all;
    border: 0.1vh solid #ccc;
}

.mybtn:hover {
    transition: 500ms all;
    transform: scale(1.00);
    color: #ff9800;
    border: 0.1vh solid #965900;
}

.loader {
    position: absolute;
    z-index: 999;
    background-color: rgba(0, 0, 0, .5);
    width: 34vh;
    height: 100%;
    border-radius: 0.35em;
}

.lds-dual-ring {
    display: inline-block;
    width: 8vh;
    height: 8vh;
    position: absolute;
    top: 41%;
    left: 35%;
}

.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 7vh;
    height: 7vh;
    margin: 1vh;
    border: 6px solid #fff;
    border-radius: 50%;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

::-webkit-scrollbar {
    width: 0.2vh;
    height: 0.2vh;
}

::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}

::-webkit-scrollbar-thumb {
    background: #965900;
    border: 0px;
    border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
    background: #ccc;
}

::-webkit-scrollbar-thumb:active {
    background: #000;
}

::-webkit-scrollbar-track {
    background: #666;
    border: 0px;
    border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
    background: #666;
}

::-webkit-scrollbar-track:active {
    background: #333;
}

::-webkit-scrollbar-corner {
    background: transparent;
}

</style>

<!-- components.get("Windows").show("Garage", '{"id": 1, "name": "Pillbox Hill"}') -->
<!-- components.get("Garage").vehicles = [{"Id": 1, "Name": "Bla"},{"Id": 2, "Name": "Bla"},{"Id": 3, "Name": "Bla"},{"Id": 4, "Name": "Bla"},{"Id": 5, "Name": "Bla"},{"Id": 6, "Name": "Bla"}]
    
    components.Windows.show("Garage", '{"id": 1, "name": "Pillbox Hill"}') -->