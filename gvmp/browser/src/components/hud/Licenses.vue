<template>
    <div class="license" v-if="show">
        <div class="head">
            <div style="display: grid;">
                <h3>Lizenzen von <span style="font-weight: 600">{{ name.replace('_', ' ') }}</span></h3>
            </div>
        </div>
        <div class="content">
            <div class="licenses">
                <div class="single-license">
                    <i
                        class="fas fa-first-aid color-text"
                        :class="{'green': firstaid == 1 || firstaid == 2, 'red': firstaid == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        EHK-Lizenz<br>
                        <small v-if="firstaid == 1" class="color-text green">Vorhanden</small>
                        <small v-if="firstaid == 2" class="color-text green">Vorhanden</small>
                        <small v-if="firstaid == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-bomb color-text"
                        :class="{'green': gunlicense == 1 || gunlicense == 2, 'red': gunlicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Waffenschein<br>
                        <small v-if="gunlicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="gunlicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="gunlicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-car color-text"
                        :class="{'green': driverlicense == 1 || driverlicense == 2, 'red': driverlicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        PKW-Lizenz<br>
                        <small v-if="driverlicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="driverlicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="driverlicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-truck color-text"
                        :class="{'green': trucklicense == 1 || trucklicense == 2, 'red': trucklicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        LKW-Lizenz<br>
                        <small v-if="trucklicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="trucklicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="trucklicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-motorcycle color-text"
                        :class="{'green': motorcyclelicense == 1 || motorcyclelicense == 2, 'red': motorcyclelicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Motorrad-Lizenz<br>
                        <small v-if="motorcyclelicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="motorcyclelicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="motorcyclelicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-ship color-text"
                        :class="{'green': boatlicense == 1 || boatlicense == 2, 'red': boatlicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Boot-Lizenz<br>
                        <small v-if="boatlicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="boatlicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="boatlicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-plane color-text"
                        :class="{'green': flyinglicensea == 1 || flyinglicensea == 2, 'red': flyinglicensea == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Flugschein A<br>
                        <small v-if="flyinglicensea == 1" class="color-text green">Vorhanden</small>
                        <small v-if="flyinglicensea == 2" class="color-text green">Vorhanden</small>
                        <small v-if="flyinglicensea == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-plane color-text"
                        :class="{'green': flyinglicenseb == 1 || flyinglicenseb == 2, 'red': flyinglicenseb == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Flugschein B<br>
                        <small v-if="flyinglicenseb == 1" class="color-text green">Vorhanden</small>
                        <small v-if="flyinglicenseb == 2" class="color-text green">Vorhanden</small>
                        <small v-if="flyinglicenseb == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-taxi color-text"
                        :class="{'green': taxilicense == 1 || taxilicense == 2, 'red': taxilicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Taxi-Lizenz<br>
                        <small v-if="taxilicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="taxilicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="taxilicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-bus color-text"
                        :class="{'green': passengertransportlicense == 1 || passengertransportlicense == 2, 'red': passengertransportlicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        PBS<br>
                        <small v-if="passengertransportlicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="passengertransportlicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="passengertransportlicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-briefcase color-text"
                        :class="{'green': lawyerlicense == 1 || lawyerlicense == 2, 'red': lawyerlicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Anwalts-Lizenz<br>
                        <small v-if="lawyerlicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="lawyerlicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="lawyerlicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    <i
                        class="fas fa-gavel color-text"
                        :class="{'green': registryofficelicense == 1 || registryofficelicense == 2, 'red': registryofficelicense == 0}"
                    ></i>
                    <h5 class="lizenzName">
                        Standesamt-Lizenz<br>
                        <small v-if="registryofficelicense == 1" class="color-text green">Vorhanden</small>
                        <small v-if="registryofficelicense == 2" class="color-text green">Vorhanden</small>
                        <small v-if="registryofficelicense == 0" class="color-text red">Nicht Vorhanden</small>
                    </h5>
                </div>
                <div class="single-license">
                    Grundwehrdienst<br>
                    <small v-if="gwdgrade > 0" class="color-text green"> Note {{ gwdgrade }}</small>
                    <small v-else class="color-text red">Nicht Vorhanden</small>
                </div>
                <div class="single-license">
                    Zivildienst<br>
                    <small v-if="zwgrade > 0" class="color-text green"> Note {{ zwgrade }}</small>
                    <small v-else class="color-text red">Nicht Vorhanden</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'Licenses',
    extends: BaseComponent,
    data () {
        return {
            name                     : '',
            firstaid                 : null,
            gunlicense               : null,
            driverlicense            : null,
            trucklicense             : null,
            motorcyclelicense        : null,
            boatlicense              : null,
            flyinglicensea           : null,
            flyinglicenseb           : null,
            taxilicense              : null,
            passengertransportlicense: null,
            lawyerlicense            : null,
            registryofficelicense    : null,
            gwdgrade                 : null,
            zwgrade                  : null,
            timeout                  : '',
            show                     : false,
        }
    },
    methods: {
        remove : function () {
            this.show = false
        },
        showLic: function (name, firstaid, gunlicense, driverlicense, trucklicense, motorcyclelicense, boatlicense, flyinglicensea, flyinglicenseb, taxilicense, passengertransportlicense, lawyerlicense, registryofficelicense, gwd, zwd) {
            this.name                      = name
            this.firstaid                  = firstaid
            this.gunlicense                = gunlicense
            this.driverlicense             = driverlicense
            this.trucklicense              = trucklicense
            this.motorcyclelicense         = motorcyclelicense
            this.boatlicense               = boatlicense
            this.flyinglicensea            = flyinglicensea
            this.flyinglicenseb            = flyinglicenseb
            this.taxilicense               = taxilicense
            this.passengertransportlicense = passengertransportlicense
            this.lawyerlicense             = lawyerlicense
            this.registryofficelicense = registryofficelicense,
                this.gwdgrade = gwd,
                this.zwgrade = zwd,
                this.show = true
            this.timeout = setTimeout(this.remove, 8000)
        },
    },
}
</script>

<style lang="scss" scoped>
.license {
    margin-left: auto;
    margin-right: auto;
    width: 46vh;
    height: 45vh;
    border-radius: 0.46875vh;
    color: #ccc;
    font-size: 1.2vh;
    margin-right: -4.1vh;

    .head {
        border-top: 1.3vh solid #ff9800;
        border-bottom: 0.5vh solid #ff9800;
        transform: skewX(-30deg);
        margin: 0vh 2vh;
        background-color: rgba(0, 0, 0, 0.9);

        h3 {
            margin-top: 1.5vh;
            margin-bottom: 1.5vh;
            font-size: 1.5vh;
            color: #ccc;
            font-weight: 400;
            margin-left: 3vh;
            text-align: left;
            transform: skewX(30deg);
        }
    }

    .content {
        padding-top: 1.5vh;
        height: 40vh;
        width: 42.2vh;
        background-color: rgba(0, 0, 0, 0.9);

        .head-img img {
            width: 10rem;
            height: 10rem;
        }

        .licenses {
            margin-top: 1vh;
            padding-left: 2vh;

            .single-license {
                float: left;
                width: 48%;
                margin: 0.3vh 0vh 0.3vh 1%;
                font-size: 1.5vh;

                i {
                    float: left;
                    font-size: 3vh;
                    text-align: right;
                    margin-top: 0.5vh;
                    margin-right: 1vh;
                    text-shadow: 0.15vh 0.15vh #000;
                    width: 3.2vh;
                }

                h5 {
                    margin: 0.3vh 0.3vh 0.5vh;

                }

                .lizenzName {
                    padding-left: 1vh;
                    font-size: 1.5vh;
                }
            }
        }
    }
}
</style>

<!-- components.Licenses.showLic("Dr-Christian_Cunningham", 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 9, 5); -->