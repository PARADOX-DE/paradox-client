<template>

    <div>
        <img class="logo" src="../../assets/logo.png">
        <div class="register">
            <div class="head">
                <h3>Registrierung<br>
                    <small style="font-size: 1.7vh;">Um einen Account zu erstellen, befolge die unten aufgelisteten
                                                     Schritte
                    </small>
                </h3>
            </div>
            <div class="content">
                <div class="step">
                    <div class="step-img" align="center">
                        <img src="../../assets/icons/player/perso.png">
                    </div>
                    <p>Forum Registration</p>
                    <p class="info">Gehe auf www.gvmp.de/forum und erstelle dir dort einen Account. Falls du keine
                                    Bestätigungs Email erhalten solltest, melde dich unter ts.gvmp.de im Support</p>
                </div>
                <div class="step">
                    <div class="step-img" align="center">
                        <img src="../../assets/icons/player/lic.png">
                    </div>
                    <p>Reisepass beantragen</p>
                    <p class="info">Öffne nun das User Controll Panel oben im Menü und erstelle dir einen Character.
                                    Danach musst du dich auf dem TS bei der Einwanderungsbehörde einfinden und einen
                                    Reisepass
                                    beantragen</p>
                </div>
                <div class="step">
                    <div class="step-img" align="center">
                        <img src="../../assets/icons/player/lic.png">
                    </div>
                    <p>GVMP spielen</p>
                    <p class="info">Ist dein Pass beantragt und genehmigt, kannst du dich auch schon InGame begeben!</p>
                </div>
            </div>
        </div>
    </div>
    <!--
    <div>
        <img class="logo" src="../../assets/logo_christmas.png">
        <div class="jumbotron card">
            <h4>
                Registrierung
            </h4>
            <div>
                <p>Um einen Account zu erstellen, befolge die unten aufgelisteten Schritte.</p>
                <br />
                <br />
                <table>
                    <tr>
                        <th>
                            <p>Forum Registration</p>
                        </th>
                        <th>
                            <p>Reisepass beantragen</p>
                        </th>
                        <th>
                            <p>GVMP spielen</p>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../assets/icons/player/perso.png">
                        </td>
                        <td>
                            <img src="../../assets/icons/player/perso.png">
                        </td>
                        <td>
                            <img src="../../assets/icons/player/perso.png">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Gehe auf www.gvmp.de/forum und erstelle dir dort einen Account.</p>
                        </td>
                        <td>
                            <p>Öffne nun das UCP oben im Menü und beantrage einen Reisepass.</p>
                        </td>
                        <td>
                            <p>Ist dein Pass beantragt, kannst du dich auch schon inGame begeben!</p>
                        </td>
                    </tr>
                </table>
                <br />
                <br />
                <br />
                <p>Bei Fragen oder Problemen, komm doch in unseren Teamspeak: <b>ts.gvmp.de</b> und wir helfen dir weiter!</p>
            </div>
        </div>
    </div>
    -->
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Register',

    extends: BaseWindow,
}
</script>

<style lang="scss" scoped>
.register {
    border-radius: 1vh;
    box-shadow: 5px 1px 10px -1px rgba(0, 0, 0, 0.4);
    margin-left: auto;
    margin-right: auto;
    width: 120vh;
    height: 50vh;
    background-color: #eee;

    .head {
        border-top-right-radius: 1vh;
        border-top-left-radius: 1vh;
        border-top: 2vh solid #ff9800;
        border-bottom: 0.5vh solid #ff9800;

        h3 {
            margin-left: 3vh;
            margin-top: 1.5vh;
            margin-bottom: 1.5vh;
            font-size: 3vh;
            color: #37474f;
            font-weight: 400;
            text-align: center;
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

    .content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        .step {
            width: 100%;
            margin-top: 4vh;

            img {
                background-color: white;
                border-radius: 100%;
                padding: 1vh;
                box-shadow: 0.55vh 0.2vh 2vh -0.3vh rgba(0, 0, 0, 0.4);
            }

            p {
                margin-top: 1vh;
                font-size: 2vh;
                font-weight: 600;
                text-align: center;
                color: #37474f;

                &.info {
                    font-weight: 400;
                    font-size: 1.7vh;
                    padding-left: 1vh;
                    padding-right: 1vh;
                }
            }
        }
    }
}
</style>

<!-- components.get("Windows").show("Register") -->