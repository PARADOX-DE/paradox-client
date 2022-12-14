<template>
    <v-ons-page>
        <v-ons-toolbar style="background-color: darkred;">
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-icon
                        style="color: #fff;"
                        icon="md-arrow-back, material:md-arrow-back"
                        size="material: 1.875vh"
                        v-on:click="backBtn"
                    ></v-ons-icon>
                </v-ons-toolbar-button>
            </div>
            <div class="center">
                <img class="titleimg" src="../../../assets/weazelnewslogo.png" />
            </div>
        </v-ons-toolbar>
        <section v-if="page == 1" v-show="playerTeam == 4 && teamRank > 0"> <!-- 4 -->
            <v-ons-button class="color-background red" modifier="large" v-on:click="push">veröffentlichen</v-ons-button>
        </section>

        <div v-if="page == 1">
            <v-ons-card v-for="news in NewsData" :key="news.id" style="padding: 0; border-radius: 1vh 1vh 1vh 1vh;">
                <div class="content">
                    <v-ons-list style="border-radius: 1vh 1vh 1vh 1vh;">
                        <v-ons-list-header
                            v-if="news.title.indexOf('0$%%$') >= 0"
                            style="background-color: #9e9e9e; color: #fff; font-weight: bold; border-radius: 1vh 1vh 0 0; text-align: center;"
                        ><p style="text-align: center;">News</p>{{ gettite(news.title) }}
                        </v-ons-list-header>
                        <v-ons-list-header
                            v-else-if="news.title.indexOf('1$%%$') >= 0"
                            style="background-color: #bd1226; color: #fff; font-weight: bold; border-radius: 1vh 1vh 0 0; text-align: center;"
                        ><p style="text-align: center;">Event</p>{{ gettite(news.title) }}
                        </v-ons-list-header>
                        <v-ons-list-header
                            v-else-if="news.title.indexOf('2$%%$') >= 0"
                            style="background-color: #2c752c; color: #fff; font-weight: bold; border-radius: 1vh 1vh 0 0; text-align: center;"
                        ><p style="text-align: center;">Bericht</p>{{ gettite(news.title) }}
                        </v-ons-list-header>
                        <v-ons-list-header
                            v-else-if="news.title.indexOf('3$%%$') >= 0"
                            style="background-color: #00729f; color: #fff; font-weight: bold; border-radius: 1vh 1vh 0 0; text-align: center;"
                        ><p style="text-align: center;">Lotto</p>{{ gettite(news.title) }}
                        </v-ons-list-header>
                        <v-ons-list-item style="border-radius: 0 0 1vh 1vh;">
                            <p style="display: block; width: 100%;">{{ getcontent(news.content) }}</p>
                            <p
                                style="display: block; color: grey; margin-top: 2vh; width: 100%;"
                                v-if="news.content.indexOf('$%%$GPS$%%$') >= 0"
                                v-on:click="setgps(news.content)"
                            >Zum Standort Navigieren</p>
                            <p
                                style="display: block; color: grey; margin-top: 2vh; width: 100%;"
                                v-if="news.content.indexOf('$%%$LOTTO$%%$') >= 0"
                                v-on:click="buylotto(news.content, news.title)"
                            >Lottoschein kaufen</p>
                            <p
                                style="display: block; color: black; margin-top: 2vh; width: 100%;"
                                v-if="playerTeam == 4"
                            >{{ cutwriter(news.title) }}</p>
                            <p
                                style="display: block; color: darkred; margin-top: 2vh; width: 100%;"
                                v-if="playerTeam == 4 && teamRank > 0"
                                v-on:click="deleteNews(news.id)"
                            >Löschen</p>
                        </v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
        </div>
        <div v-else-if="page == 2">
            <h1 style="font-size: 2vh; text-align: center; width: 24vh;">Lottoschein</h1>
            <h1 style="font-size: 1.5vh; text-align: center; width: 24vh;">Wähle 3 Zahlen:
            </h1>
            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div
                v-if="lotto_num1 == 1 || lotto_num2 == 1 || lotto_num3 == 1"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(1)"
                >1</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(1)"
                >1</h1>
            </div>


            <div
                v-if="lotto_num1 == 2 || lotto_num2 == 2 || lotto_num3 == 2"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(2)"
                >2</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(2)"
                >2</h1>
            </div>


            <div
                v-if="lotto_num1 == 3 || lotto_num2 == 3 || lotto_num3 == 3"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(3)"
                >3</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(3)"
                >3</h1>
            </div>


            <div
                v-if="lotto_num1 == 4 || lotto_num2 == 4 || lotto_num3 == 4"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(4)"
                >4</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(4)"
                >4</h1>
            </div>


            <div
                v-if="lotto_num1 == 5 || lotto_num2 == 5 || lotto_num3 == 5"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(5)"
                >5</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(5)"
                >5</h1>
            </div>


            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div
                v-if="lotto_num1 == 6 || lotto_num2 == 6 || lotto_num3 == 6"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(6)"
                >6</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(6)"
                >6</h1>
            </div>


            <div
                v-if="lotto_num1 == 7 || lotto_num2 == 7 || lotto_num3 == 7"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(7)"
                >7</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(7)"
                >7</h1>
            </div>


            <div
                v-if="lotto_num1 == 8 || lotto_num2 == 8 || lotto_num3 == 8"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(8)"
                >8</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(8)"
                >8</h1>
            </div>


            <div
                v-if="lotto_num1 == 9 || lotto_num2 == 9 || lotto_num3 == 9"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(9)"
                >9</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(9)"
                >9</h1>
            </div>


            <div
                v-if="lotto_num1 == 10 || lotto_num2 == 10 || lotto_num3 == 10"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(10)"
                >10</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(10)"
                >10</h1>
            </div>


            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div
                v-if="lotto_num1 == 11 || lotto_num2 == 11 || lotto_num3 == 11"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(11)"
                >11</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(11)"
                >11</h1>
            </div>


            <div
                v-if="lotto_num1 == 12 || lotto_num2 == 12 || lotto_num3 == 12"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(12)"
                >12</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(12)"
                >12</h1>
            </div>


            <div
                v-if="lotto_num1 == 13 || lotto_num2 == 13 || lotto_num3 == 13"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(13)"
                >13</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(13)"
                >13</h1>
            </div>


            <div
                v-if="lotto_num1 == 14 || lotto_num2 == 14 || lotto_num3 == 14"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(14)"
                >14</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(14)"
                >14</h1>
            </div>


            <div
                v-if="lotto_num1 == 15 || lotto_num2 == 15 || lotto_num3 == 15"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(15)"
                >15</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(15)"
                >15</h1>
            </div>


            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <div
                v-if="lotto_num1 == 16 || lotto_num2 == 16 || lotto_num3 == 16"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(16)"
                >16</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(16)"
                >16</h1>
            </div>


            <div
                v-if="lotto_num1 == 17 || lotto_num2 == 17 || lotto_num3 == 17"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(17)"
                >17</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(17)"
                >17</h1>
            </div>


            <div
                v-if="lotto_num1 == 18 || lotto_num2 == 18 || lotto_num3 == 18"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(18)"
                >18</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(18)"
                >18</h1>
            </div>


            <div
                v-if="lotto_num1 == 19 || lotto_num2 == 19 || lotto_num3 == 19"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(19)"
                >19</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(19)"
                >19</h1>
            </div>


            <div
                v-if="lotto_num1 == 20 || lotto_num2 == 20 || lotto_num3 == 20"
                class=""
                style="height: 4vh; width: 4vh; background-color: #8b0000; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(20)"
                >20</h1>
            </div>
            <div
                v-else
                style="height: 4vh; width: 4vh; background-color: #fff; border: black 0.25vh solid; display: inline-block;"
            >
                <h1
                    style="width: 3.5vh; height: 4vh; text-align: center; margin: 0; font-size: 3vh !important; margin-top: 0.3vh;"
                    v-on:click="setnumber(20)"
                >20</h1>
            </div>


            <div style="height: 4vh; width: 2vh; display: inline-block;">

            </div>
            <h1 style="font-size: 1.5vh; text-align: center; width: 24vh;">Ziehung: {{ this.lotto_date }}</h1>
            <h1 style="font-size: 1.5vh; text-align: center; width: 24vh;">Kosten: {{ this.lotto_price }}$</h1>
            <v-ons-list-item v-if="lotto_num1 != 0 && lotto_num2 != 0 && lotto_num3 != 0" modifier="longdivider">
                <v-ons-button
                    style="width:100%; margin-right: 0.9375vh; margin-top: -1px;"
                    class="color-background red"
                    modifier="large"
                    v-on:click="buy"
                >Kaufen
                </v-ons-button>
            </v-ons-list-item>
        </div>


    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import NewsAddApp from './NewsAddApp'

export default {
    name   : 'NewsListApp',
    extends: BaseApp,
    data () {
        return {
            NewsData       : [], //{"id":1,"typeId":1,"title":"0$%%$TEST","content":"blablabla$%%$GPS$%%$1$$1"},{"id":1,"typeId":1,"title":"1$%%$TEST","content":"blablabla"},{"id":1,"typeId":1,"title":"2$%%$TEST","content":"blablabla"},{"id":1,"typeId":1,"title":"3$%%$TEST","content":"blablabla"}
            playerTeam     : 0,
            playerFirstName: '',
            playerLastName : '',
            page           : 1,
            lotto_seller   : '',
            lotto_buyer    : '',
            lotto_price    : 0,
            lotto_num1     : 0,
            lotto_num2     : 0,
            lotto_num3     : 0,
            lotto_date     : '',
            lotto_number   : 0,
            lottoblock     : false,
            teamRank       : 0,
        }
    },
    methods: {
        onReady: function (pteam, firstName, lastName, tRank) {
            this.playerTeam      = pteam
            this.playerFirstName = firstName
            this.playerLastName  = lastName
            this.teamRank        = tRank
        },
        setnumber (num) {
            if (this.lotto_num1 == num || this.lotto_num2 == num || this.lotto_num3 == num) {
                if (this.lotto_num1 == num) {
                    this.lotto_num1 = 0
                } else if (this.lotto_num2 == num) {
                    this.lotto_num2 = 0
                } else if (this.lotto_num3 == num) {
                    this.lotto_num3 = 0
                }
            } else if (this.lotto_num1 == 0) {
                this.lotto_num1 = num
            } else if (this.lotto_num2 == 0) {
                this.lotto_num2 = num
            } else if (this.lotto_num3 == 0) {
                this.lotto_num3 = num
            }
        },
        buy () {

        },
        updateNews (news) {
            this.NewsData = JSON.parse(news)
        },
        cutwriter (titlestring) {
            var title = titlestring.split('$%%$')
            return title[2]
        },
        buylotto (content, desc) {
            this.page         = 2
            var title         = desc.split('$%%$')
            var contentsplit  = content.split('$%%$')
            this.lotto_seller = title[2]
            this.lotto_date   = title[3]
            this.lotto_buyer  = this.playerFirstName + '_' + this.playerLastName
            this.lotto_price  = contentsplit[2]
            this.lotto_number = contentsplit[3]
        },
        gettite (titlestring) {
            var title = titlestring.split('$%%$')
            return title[1]
        },
        getcontent (contentstring) {
            if (contentstring.indexOf('$%%$GPS$%%$') >= 0) {
                var content = contentstring.split('$%%$GPS$%%$')
                return content[0]
            } else if (contentstring.indexOf('$%%$LOTTO$%%$') >= 0) {
                var content2 = contentstring.split('$%%$LOTTO$%%$')
                return content2[0]
            } else {
                return contentstring
            }
        },
        push () {
            this.pageStack.push({ extends: NewsAddApp })
        },
        backBtn () {
            if (this.page == 1) {
                this.pageStack.pop()
            } else {
                this.page = 1
            }
        },
        setgps (gpsdata) {
            var gps  = gpsdata.split('$%%$GPS$%%$')
            var gps1 = gps[1].split('$$')
            var gpsX = parseInt(gps1[0])
            var gpsY = parseInt(gps1[1])
            this.trigger('setGpsCoordinates', JSON.stringify({ x: gpsX, y: gpsY }))
        },
        deleteNews (newsId) {
            console.log('Versuche News zu löschen:' + newsId)
            this.triggerServer('removeNews', newsId)
            this.pageStack.splice(1, this.pageStack.length - 1)
        },
    },
    mounted () {
        this.triggerServer('requestNews')
    },
    props: ['pageStack'],
}
</script>

<style>
section {
    margin: 20px;
}

.titleimg {
    width:      10vh;
    height:     4vh;
    margin-top: 0.6vh;
}
</style>
