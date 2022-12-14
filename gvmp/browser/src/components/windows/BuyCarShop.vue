<template>
    <div class="BuyCarShop">
        <div class="content">
            <div class="nav">
                <div class="head">
                    <div class="img-background">
                        <i
                            style="font-size: 13vh; opacity: 1; margin-left: 18%; margin-top: 18%; color: #ff9800"
                            class="fas fa-car"
                        ></i>
                    </div>
                    <h3>{{ carshop.name }}</h3>
                </div>
            </div>
            <div class="body">
                <div class="head">
                    <div style="display: grid; grid-template-columns: repeat(1, 1fr);">
                        <i v-on:click="terminate" class="fas fa-times"></i>
                    </div>
                </div>
                <div class="body-content">
                    <div class="garage-vehicles">
                        <div
                            v-for="vehicle in vehicles"
                            :key="vehicle.Id"
                            class="card"
                            :class="vehicleId == vehicle.Id ? 'selected' : ''"
                            v-on:click="vehicleId != vehicle.Id ? vehicleId = vehicle.Id : vehicleId = null"
                        >
                            <i
                                style="font-size: 5vh; margin-top: 0.8vh; color: #263238;"
                                class="fas fa-car responsive-img"
                            ></i>
                            <h5>{{ vehicle.Name }}<br><span><small>$ {{ vehicle.Price }}</small></span></h5>
                        </div>
                    </div>
                    <div class="process-frame">
                        <button v-on:click="handle" :disabled="vehicleId == null" class="btn buy">Kaufen</button>
                        <button class="btn" @click="terminate">Abbrechen</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'BuyCarShop',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            carshop  : JSON.parse(this.data),
            state    : null,
            vehicles : [],
            vehicleId: null,
        }
    },
    watch  : {
        state: function (val) {
            this.triggerServer('requestCarshopList', this.carshop.id, val)
        },
    },
    methods: {
        handle () {
            if (this.vehicleId == null) return
            this.trigger('carshopBuy', JSON.stringify({
                shopId   : this.shop.id,
                vehicleId: this.vehicleId,
            }))
            this.dismiss()
        },
        responseVehicleList (vehiclesString) {
            this.vehicles = JSON.parse(vehiclesString)
        },
        terminate () {
            this.dismiss()
        },
    },
    mounted () {
        this.state = 'cancel'
    },
}
</script>

<style lang="scss" scoped>
.BuyCarShop {
    border-radius: 1vh;
    box-shadow: 5px 1px 10px -1px rgba(0, 0, 0, 0.4);
    margin-left: auto;
    margin-right: auto;
    margin-top: 10vh;
    width: 115vh;
    height: 60vh;
    background-color: #37474f;

    .content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .nav {
        .head {
            width: 35vh;
            height: 31vh;
            position: fixed;
            border-bottom: 0.3vh solid #263238 !important;

            .img-background {
                background-color: whitesmoke;
                width: 20vh;
                margin-left: auto;
                margin-right: auto;
                height: 20vh;
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
            margin-top: 35vh;

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
                    background-color: #263238;
                    border-left: 0.5vh solid #ff9800;
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .body {
        border-bottom-right-radius: 1vh;
        border-top-right-radius: 1vh;
        float: right;
        width: 80vh;
        height: 60vh;
        background-color: #eee;

        .head {
            border-top-right-radius: 1vh;
            border-top: 2vh solid #ff9800;
            border-bottom: 0.5vh solid #ff9800;

            h3 {
                margin-left: 3vh;
                margin-top: 1.5vh;
                margin-bottom: 1.5vh;
                font-size: 3.5vh;
                color: #37474f;
            }

            i {
                font-size: 3.5vh;
                color: #37474f;
                text-align: right;
                margin-right: 2.5vh;
                margin-top: 1.5vh;
            }

            i:hover {
                color: #263238;
                transition: color 0.5s;
            }
        }

        .body-content {
            .garage-vehicles {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                max-height: 40vh;

                div {
                    padding: 1vh;

                    h5 {
                        align-self: auto;
                        margin-top: 1vh;
                        margin-left: 1vh;
                    }

                    p {
                        align-self: auto;
                        margin-left: 1vh;
                    }
                }
            }

            .process-frame {
                padding: 1em;
                margin-left: 10px;
                float: right;

                button {
                    float: left;
                    margin-left: 1vh;
                    background-color: #ff9800;

                    &.btn:not(.flat):not(.primary):not(.positive):not(.negative):not(.neutral):not(.negative):not(.secondary) {
                        color: white;
                    }

                    &.btn:disabled:not(.flat), .btn[disabled]:not(.flat) {
                        background-color: #e0e0e0;
                    }
                }

                .buy {
                    background-color: green;
                }
            }

        }
    }
}
</style>

<!-- components.get("Windows").show("Garage", '{"id": 1, "name": "Pillbox Hill"}') -->
<!-- components.get("Garage").vehicles = [{"Id": 1, "Name": "Bla"},{"Id": 2, "Name": "Bla"},{"Id": 3, "Name": "Bla"},{"Id": 4, "Name": "Bla"},{"Id": 5, "Name": "Bla"},{"Id": 6, "Name": "Bla"}] -->