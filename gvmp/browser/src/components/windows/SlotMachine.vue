<template>
    <div id="template">
        <div v-if="slotmachine.minprice == 100" class="slotmachinelogo" style="">
            <img class="logoimg" src="../../assets/casino/slotmachine/slotlogo.png" />
            <button class="cancelbtn" @click="close"></button>
            <button class="infobtn" @click="info"></button>
        </div>
        <div v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000" class="slotmachinelogo" style="">
            <img class="logoimg" src="../../assets/casino/slotmachine/slotlogo-diamond.png" />
            <button class="cancelbtndia" @click="close"></button>
            <button class="infobtndia" @click="info"></button>
        </div>
        <div v-if="showInfo == true && slotmachine.minprice == 100" class="infoscreen">
            <h1 style="font-size: 2.5vh !important; margin-top: 1vh; margin-bottom: 0.75vh;">Gewinnmöglichkeiten</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticoncaillou.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[0][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticoncaillou.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticoncaillou.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[0][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticoncaillou.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticoncaillou.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticoncaillou.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[0][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondiamant.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[1][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondiamant.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondiamant.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[1][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondiamant.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondiamant.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondiamant.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[1][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongift.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[2][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticongift.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongift.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[2][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticongift.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongift.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongift.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[2][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongvmp.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[3][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticongvmp.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongvmp.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[3][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticongvmp.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongvmp.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticongvmp.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[3][2] }}</h1>

            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticon100.jpg" />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[4][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticon100.jpg" />
            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticon100.jpg" />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[4][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticon100.jpg" />
            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticon100.jpg" />
            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticon100.jpg" />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[4][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonjail.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[5][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticonjail.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonjail.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[5][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticonjail.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonjail.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonjail.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[5][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonwasted.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[6][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticonwasted.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonwasted.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[6][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticonwasted.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonwasted.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticonwasted.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[6][2] }}</h1>

            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticonbug.jpg" />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[7][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticonbug.jpg" />
            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticonbug.jpg" />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[7][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticonbug.jpg" />
            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticonbug.jpg" />
            <img class="gewinnicon" style="margin-left: 0.5vh;" src="../../assets/casino/slotmachine/sloticonbug.jpg" />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[7][2] }}</h1>
        </div>
        <div
            v-else-if="showInfo == true && slotmachine.minprice == 2000 || showInfo == true && slotmachine.minprice == 10000"
            class="infoscreendia"
        >
            <h1 style="font-size: 2.5vh !important; margin-top: 1vh; margin-bottom: 0.75vh;">Gewinnmöglichkeiten</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia08.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[0][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia08.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia08.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[0][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia08.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia08.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia08.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[0][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia07.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[1][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia07.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia07.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[1][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia07.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia07.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia07.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[1][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia06.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[2][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia06.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia06.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[2][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia06.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia06.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia06.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[2][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia02.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[3][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia02.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia02.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[3][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia02.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia02.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia02.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[3][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia01.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[4][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia01.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia01.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[4][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia01.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia01.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia01.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[4][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia03.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[5][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia03.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia03.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[5][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia03.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia03.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia03.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[5][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia04.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[6][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia04.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia04.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[6][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia04.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia04.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia04.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[6][2] }}</h1>

            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia05.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[7][0] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia05.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia05.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[7][1] }}</h1>
            <img class="gewinnicon" src="../../assets/casino/slotmachine/sloticondia05.jpg" />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia05.jpg"
            />
            <img
                class="gewinnicon"
                style="margin-left: 0.5vh;"
                src="../../assets/casino/slotmachine/sloticondia05.jpg"
            />
            <h1 style="font-size: 1.25vh !important; display: inline-block; margin-left: 0.5vh; width: 3vh; text-align: left;">
                x{{ infoData[7][2] }}</h1>
        </div>
        <div class="slotscreen">
            <audio
                v-if="isAnimated == true"
                autoplay
                controls
                type="audio/ogg"
                preload="auto"
                :src="playSound('roll')"
            />
            <div v-if="slotmachine.minprice == 100" class="slotbackground"></div>
            <div
                v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000"
                class="slotbackgrounddia"
            ></div>
            <div class="slotbackgroundblack"></div>
            <div v-if="slotmachine.minprice == 100" class="item slot1" :class="[slotClass1,{animate:isAnimated}]">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div
                v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000"
                class="itemdia slot1"
                :class="[slotClass1,{animate:isAnimated}]"
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div v-if="slotmachine.minprice == 100" class="item slot2" :class="[slotClass2,{animate:isAnimated}]">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div
                v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000"
                class="itemdia slot2"
                :class="[slotClass2,{animate:isAnimated}]"
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div v-if="slotmachine.minprice == 100" class="item slot3" :class="[slotClass3,{animate:isAnimated}]">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div
                v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000"
                class="itemdia slot3"
                :class="[slotClass3,{animate:isAnimated}]"
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div v-if="slotmachine.minprice == 100" class="rollglass"></div>
            <div v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000" class="rollglassdia"></div>
            <div :class="[{winbackground:win}]"></div>
            <div v-if="slotmachine.minprice == 100" class="windisplay" :class="[{active:win}]">
                <audio v-if="win == true" autoplay controls type="audio/ogg" preload="auto" :src="playSound('win')" />
                <h5 :class="[{active:win}]">{{ wintitle }}</h5>
                <h6 :class="[{active:win}]">{{ winsum }}$</h6>
            </div>

            <div
                v-else-if="slotmachine.minprice == 2000 || slotmachine.minprice == 10000"
                class="windisplaydia"
                :class="[{active:win}]"
            >
                <audio v-if="win == true" autoplay controls type="audio/ogg" preload="auto" :src="playSound('win')" />
                <h5 :class="[{active:win}]">{{ wintitle }}</h5>
                <h6 :class="[{active:win}]">{{ winsum }}$</h6>
            </div>

            <div v-if="slotmachine.minprice == 100 && risikoGame == 1" class="risikoDisplay">
                <h3 style="padding-top: 1vh;">Aktueller Gewinn:</h3>
                <h6 style="font-size: 2vh;">{{ winsum * risikoStep }}$</h6>
                <div v-if="lastCard == 0" class="cardNone"></div>
                <div v-else-if="lastCard == 1" class="cardRed"></div>
                <div v-else-if="lastCard == 2" class="cardBlack"></div>
            </div>

            <div
                v-if="slotmachine.minprice == 2000 && risikoGame == 1 || slotmachine.minprice == 10000 && risikoGame == 1"
                class="risikoDisplayDia"
            >
                <h3 style="padding-top: 1vh;">Aktueller Gewinn:</h3>
                <h6 style="font-size: 2vh;">{{ winsum * risikoStep }}$</h6>
                <div v-if="lastCard == 0" class="cardNone"></div>
                <div v-else-if="lastCard == 1" class="cardRed"></div>
                <div v-else-if="lastCard == 2" class="cardBlack"></div>
            </div>
        </div>
        <div v-if="win == false" class="btnmenu">
            <h3>Einsatz:</h3>
            <div class="pricedata">
                <button class="pricebtn pricelowbtn" :disabled="!this.lowpriceavailable" @click="pricedown"></button>
                <div class="price">
                    <h1>{{ slotmachine.price }}$</h1>
                </div>
                <button class="pricebtn pricehighbtn" :disabled="!this.highpriceavailable" @click="priceup"></button>
            </div>
            <h4>Maximale Gewinnmöglichkeit:</h4>
            <h2>{{ slotmachine.price * slotmachine.maxmultiple }}$</h2>
            <button style="display: inline-block;" class="spin" :disabled="this.isAnimated" @click="roll"></button>
            <button
                v-if="autoMode == false"
                style="display: inline-block;"
                class="auto"
                :active="this.isAnimated"
                @click="auto"
            ></button>
            <button
                v-else-if="autoMode == true"
                style="display: inline-block;"
                class="auto2"
                :active="this.isAnimated"
                @click="auto"
            ></button>
        </div>
        <div v-if="win == true && risikoGame == 0" class="btnmenu">
            <h3 style="padding-top: 4vh;">Risiko oder Nehmen?</h3>
            <button style="display: inline-block;" class="risiko" @click="risiko"></button>
            <button style="display: inline-block;" class="getWin" @click="getWin"></button>
        </div>
        <div v-if="win == true && risikoGame == 1" class="btnmenu">
            <h3 v-if="risikoStep != 0 && risikoStep != 5" style="padding-top: 2vh;">Rot oder Schwarz?</h3>
            <button
                v-if="risikoStep != 0 && risikoStep != 5"
                style="display: inline-block;"
                class="redbtn"
                @click="risikoRed"
            ></button>
            <button
                v-if="risikoStep != 0 && risikoStep != 5"
                style="display: inline-block;"
                class="blackbtn"
                @click="risikoBlack"
            ></button>
            <button
                v-if="risikoStep != 0 && risikoStep != 5"
                style="display: inline-block; margin-left: 11.15625vh; margin-top: 3.5vh;"
                class="getWin"
                @click="getWin"
            ></button>
            <button
                v-else
                style="display: inline-block; margin-left: 11.15625vh; margin-top: 13.5vh;"
                class="getWin"
                @click="getWin"
            ></button>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'
import Sounds from '../sounds'

export default {
    name: 'SlotMachine',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            slotmachine       : JSON.parse(this.data),
            rolldata          : null,
            randomNum         : 0,
            isAnimated        : false,
            slotClass1        : 'state1',
            slotClass2        : 'state1',
            slotClass3        : 'state1',
            lowpriceavailable : true,
            highpriceavailable: true,
            win               : false,
            wintitle          : '',
            winsum            : 0,
            risikoGame        : 0,
            risikoStep        : 1,
            lastCard          : 0,
            payOut            : 0,
            showInfo          : false,
            infoData          : null,
            autoMode          : false,
            autoRoll          : 0,
            mode              : 1, //0 = Cailliou - 1 = Diamond
        }
    },
    methods: {
        playSound (data) {
            if (data == 'roll') {
                return Sounds.SlotMachine('roll')
            } else if (data == 'success') {
                return Sounds.SlotMachine('success')
            } else if (data == 'win') {
                return Sounds.SlotMachine('win')
            }
        },
        auto () {
            if (this.autoMode == false) {
                this.autoMode = true
                if (this.isAnimated == false) {
                    this.autoRoll = 30
                    this.roll()
                }
            } else if (this.autoMode == true) {
                this.autoMode = false
            }
        },
        pricedown () {
            if (this.lowpriceavailable) {
                this.slotmachine.price -= this.slotmachine.pricestep
                this.highpriceavailable = true
                if (this.slotmachine.price == this.slotmachine.minprice) {
                    this.lowpriceavailable = false
                }
                if (this.slotmachine.price < this.slotmachine.minprice) {
                    this.slotmachine.price = this.slotmachine.minprice
                    this.lowpriceavailable = false
                }
            }
        },
        info () {
            if (this.showInfo == false) {
                this.triggerServer('requestSlotInfo')
            } else {
                this.showInfo = false
            }
        },
        responseSlotInfo (info) {
            this.infoData = JSON.parse(info)
            this.showInfo = true
        },
        risikoRed () {
            this.triggerServer('risikoCard', 1, this.rolldata.id)
        },
        risikoBlack () {
            this.triggerServer('risikoCard', 2, this.rolldata.id)
        },
        responseRisiko (card, status) {
            this.lastCard = card
            if (status == 1) {
                this.risikoStep++
            } else {
                this.risikoStep = 0
            }
        },
        priceup () {
            if (this.highpriceavailable) {
                this.slotmachine.price += this.slotmachine.pricestep
                this.lowpriceavailable = true
                if (this.slotmachine.price == this.slotmachine.maxprice) {
                    this.highpriceavailable = false
                }
                if (this.slotmachine.price > this.slotmachine.maxprice) {
                    this.slotmachine.price  = this.slotmachine.maxprice
                    this.highpriceavailable = false
                }
            }
        },
        roll () {
            if (!this.isAnimated) {
                this.triggerServer('newSlotRoll', this.slotmachine.price)
            }
        },
        rollSlot (serverrolldata) {
            if (serverrolldata == '' || serverrolldata == undefined || serverrolldata == null) return
            this.rolldata = JSON.parse(serverrolldata)

            this.slotClass1 = 'state' + this.rolldata.slot1
            this.slotClass2 = 'state' + this.rolldata.slot2
            this.slotClass3 = 'state' + this.rolldata.slot3

            this.lowpriceavailable  = false
            this.highpriceavailable = false
            this.isAnimated         = true

            setTimeout(() => {
                if (this.rolldata.status == 0) {
                    this.win    = true
                    this.winsum = this.rolldata.winsum
                    if (this.rolldata.winsum == (this.slotmachine.price * this.slotmachine.maxmultiple)) {
                        this.wintitle = 'JACKPOT'
                    } else if (this.rolldata.winsum >= (this.slotmachine.price * this.slotmachine.maxmultiple / 5)) {
                        this.wintitle = 'BIG WIN'
                    } else {
                        this.wintitle = 'WIN'
                    }
                    setTimeout(() => {
                        if (this.risikoGame == 0 && this.win == true) {
                            this.triggerServer('cashoutSlotRoll', this.rolldata.id)
                            this.win = false
                            this.setdefault()
                        }
                    }, 10000)
                } else {
                    this.setdefault()
                }
            }, 8000)
        },
        setdefault () {
            this.isAnimated         = false
            this.risikoGame         = 0
            this.lastCard           = 0
            this.risikoStep         = 1
            this.payOut             = 0
            this.lowpriceavailable  = true
            this.highpriceavailable = true
            if (this.slotmachine.price == this.slotmachine.maxprice) {
                this.highpriceavailable = false
            } else if (this.slotmachine.price == this.slotmachine.minprice) {
                this.lowpriceavailable = false
            }
            if (this.autoMode == true) {
                this.autoRoll--
                if (this.autoRoll == 0) {
                    this.autoMode = false
                }
                this.roll()
            }
        },
        getWin () {
            this.triggerServer('cashoutSlotRoll', this.rolldata.id)
            this.win = false
            this.setdefault()
        },
        risiko () {
            this.risikoGame = 1
        },
        close () {
            if (!this.isAnimated) {
                this.triggerServer('leaveSlotMachine', this.slotmachine.machineId)
                this.dismiss()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
audio {
    display: none;
}

#template {
    width: 37.5vh;
    height: 60.25vh;
    background-color: #000;
    border-radius: 0.3125vh;
    margin-left: 40vw;
    margin-top: 24vh;
}

h1 {
    font-family: Arial;
    font-weight: bold;
    font-size: 3.6875vh;
    color: #fff;
    margin: 0;
    text-align: center;
}

h2 {
    font-family: Arial;
    font-weight: bold;
    font-size: 2.8125vh;
    color: #fff;
    margin: 0;
    text-align: center;
}

h3 {
    font-family: Arial;
    font-weight: bold;
    font-size: 2.40625vh;
    color: #fff;
    margin: 0;
    padding-top: 0.25vh;
    text-align: center;
}

h4 {
    font-family: Arial;
    font-weight: bold;
    font-size: 1.40625vh;
    color: #fff;
    margin: 0;
    padding-top: 0.5vh;
    text-align: center;
}

h5 {
    font-family: Arial;
    font-weight: bold;
    font-size: 0.2vh;
    color: #fff;
    margin: 0;
    margin-top: 1.85vh;
    text-align: center;
}

h6 {
    font-family: Arial;
    font-weight: bold;
    font-size: 0.4vh;
    color: #fff;
    margin: 0;
    margin-top: 0.1vh;
    text-align: center;
}

.slotmachinelogo {
    position: relative;
    width: 37.5vh;
    height: 13.407vh;
}

.infoscreen {
    position: absolute;
    width: 32.5vh;
    height: 28.75vh;
    margin-left: -32.75vh;
    background-color: #290000;
    border-bottom-left-radius: 0.3125vh;
    border-top-left-radius: 0.3125vh;
}

.infoscreendia {
    position: absolute;
    width: 32.5vh;
    height: 28.75vh;
    margin-left: -32.75vh;
    background-color: #040d2a;
    border-bottom-left-radius: 0.3125vh;
    border-top-left-radius: 0.3125vh;
}

.gewinnicon {
    width: 2.5vh;
    height: 2.25vh;
    margin-left: 2vh;
    margin-top: 0.1vh;
    display: inline-block;
}

.slotmachinelogo .cancelbtn {
    background: url(../../assets/casino/slotmachine/slotclosebtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    top: 0%;
    right: 0%;
    border: none;
    width: 3.75vh;
    height: 2.907vh;
}

.cardNone {
    background: url(../../assets/casino/slotmachine/cardback.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    width: 13.4vh;
    height: 18.53125vh;
    margin-top: 1.5vh;
    margin-left: 12vh;
}

.cardRed {
    background: url(../../assets/casino/slotmachine/cardassred.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    width: 13.4vh;
    height: 18.53125vh;
    margin-top: 1.5vh;
    margin-left: 12vh;
}

.cardBlack {
    background: url(../../assets/casino/slotmachine/cardass.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    width: 13.4vh;
    height: 18.53125vh;
    margin-top: 1.5vh;
    margin-left: 12vh;
}

.slotmachinelogo .cancelbtndia {
    background: url(../../assets/casino/slotmachine/slotclosebtn-diamond.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    top: 0%;
    right: 0%;
    border: none;
    width: 3.75vh;
    height: 2.907vh;
}

.slotmachinelogo .infobtn {
    background: url(../../assets/casino/slotmachine/slotinfobtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    top: 0%;
    left: 0%;
    border: none;
    width: 3.75vh;
    height: 2.907vh;
}

.slotmachinelogo .infobtndia {
    background: url(../../assets/casino/slotmachine/slotinfobtn-diamond.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    top: 0%;
    left: 0%;
    border: none;
    width: 3.75vh;
    height: 2.907vh;
}

.logoimg {
    width: 37.5vh;
    height: 13.407vh;
}

.slotscreen {
    position: relative;
    padding-top: 0.29vh;
}

.slotbackground {
    width: 37.5vh;
    height: 28.125vh;
    background-color: #290000;
    position: absolute;
}

.slotbackgrounddia {
    width: 37.5vh;
    height: 28.125vh;
    background-color: #040d2a;
    position: absolute;
}

.slotbackgroundblack {
    width: 35.16vh;
    height: 26.715vh;
    margin-left: 1.17vh;
    margin-top: 0.705vh;
    background-color: #000;
    position: absolute;
}

.btnmenu {
    width: 37.5vh;
    height: 18.1745vh;
    background-color: #313131;
    margin-top: 28.415vh;
    border-bottom-right-radius: 0.3125vh;
    border-bottom-left-radius: 0.3125vh;
}

.rollglass {
    width: 37.5vh;
    height: 28.125vh;
    background: url(../../assets/casino/slotmachine/slotwindow.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
}

.rollglassdia {
    width: 37.5vh;
    height: 28.125vh;
    background: url(../../assets/casino/slotmachine/slotwindow-diamond.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
}

.risikoDisplay {
    display: block;
    width: 37.5vh;
    height: 28.125vh;
    background-color: #290000;
    position: absolute;
}

.risikoDisplayDia {
    display: block;
    width: 37.5vh;
    height: 28.125vh;
    background-color: #040d2a;
    position: absolute;
}

.windisplay {
    display: block;
    width: 3.75vh;
    height: 2.8125vh;
    margin-left: 17.05vh;
    margin-top: 12.6vh;
    background: url(../../assets/casino/slotmachine/windisplay.png);
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    transition: all 200ms ease-in;
    transform: scale(0);
}

.windisplaydia {
    display: block;
    width: 3.75vh;
    height: 2.8125vh;
    margin-left: 17.05vh;
    margin-top: 12.6vh;
    background: url(../../assets/casino/slotmachine/windisplay-diamond.png);
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    transition: all 200ms ease-in;
    transform: scale(0);
}

.windisplay.active {
    transition: all 200ms ease-in;
    transform: scale(10);
}

.windisplaydia.active {
    transition: all 200ms ease-in;
    transform: scale(10);
}

.winbackground {
    position: absolute;
    width: 37.5vh;
    height: 41.822vh;
    margin-top: -13.697vh;
    background-color: #000;
    opacity: 0.5;
    border-top-right-radius: 0.3125vh;
    border-top-left-radius: 0.3125vh;
}


.redbtn {
    background: url(../../assets/casino/slotmachine/redbtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 18.1vh;
    height: 4.032vh;
    margin-left: 0.3vh;
    margin-top: 1vh;
}

.blackbtn {
    background: url(../../assets/casino/slotmachine/blackbtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 18.1vh;
    height: 4.032vh;
    margin-left: 0.6vh;
    margin-top: 1vh;
}

.risiko {
    background: url(../../assets/casino/slotmachine/risikobtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 12.65625vh;
    height: 4.032vh;
    margin-left: 4.15625vh;
    margin-top: 1vh;
}

.getWin {
    background: url(../../assets/casino/slotmachine/getbtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 15.1875vh;
    height: 4.032vh;
    margin-left: 1.15625vh;
    margin-top: 1vh;
}

.spin {
    background: url(../../assets/casino/slotmachine/spinbtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 9.1875vh;
    height: 4.032vh;
    margin-left: 9.15625vh;
    margin-top: 1vh;
}

.spin:disabled {
    opacity: 0.25;
}

.auto {
    background: url(../../assets/casino/slotmachine/autobtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 10.8vh;
    height: 4.032vh;
    margin-left: 1vh;
    margin-top: 1vh;
}

.auto2 {
    background: url(../../assets/casino/slotmachine/autobtn2.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 10.8vh;
    height: 4.032vh;
    margin-left: 1vh;
    margin-top: 1vh;
}

.pricebtn:disabled {
    opacity: 0.25;
}

.pricelowbtn {
    background: url(../../assets/casino/slotmachine/pricelowbtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    position: absolute;
    margin-left: 4.718vh;
    width: 4.032vh;
    height: 4.032vh;
}

.pricehighbtn {
    background: url(../../assets/casino/slotmachine/pricehighbtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    position: absolute;
    margin-left: 28.75vh;
    width: 4.032vh;
    height: 4.032vh;
}

.price {
    position: absolute;
    background-color: #000;
    height: 4.032vh;
    margin-left: 8.75vh;
    width: 20vh;
}

.pricedata {
    position: relative;
    height: 4.032vh;
    width: 28.064vh;
}

.item {
    width: 10.9695vh;
    height: 26.715vh;
    margin-top: 9.07775vh;
    position: absolute;
    transform-style: preserve-3d;
    transform-origin: 5.48475vh 4.98475vh -11.4vh;

    &.animate {
        animation-name: rotateAnim;
        animation-duration: 7s;
        animation-timing-function: cubic-bezier(0.525, 0.915, 0.405, 1.000);
    }

    &.state1 {
        transform: rotateX(0deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state2 {
        transform: rotateX(45deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state3 {
        transform: rotateX(90deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state4 {
        transform: rotateX(135deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state5 {
        transform: rotateX(180deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state6 {
        transform: rotateX(225deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state7 {
        transform: rotateX(270deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state8 {
        transform: rotateX(315deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &:nth-child(4) {
        animation-delay: .5s;
    }

    &:nth-child(5) {
        animation-delay: 1s;
    }

    div {
        position: absolute;
        width: 10.9695vh;
        height: 9.9695vh;
        background-image: url(../../assets/casino/slotmachine/sloticoncaillou.jpg);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #fff;

        &:nth-child(2) {
            top: 9.375vh;
            transform: rotateX(-45deg) translate3d(0vh, 1.40625vh, -3.282vh);
            background-image: url(../../assets/casino/slotmachine/sloticondiamant.jpg);
        }

        &:nth-child(3) {
            top: 18.75vh;
            transform: rotateX(-90deg) translate3d(0vh, 11.3445vh, -7.3125vh);
            background-image: url(../../assets/casino/slotmachine/sloticongift.jpg);
        }

        &:nth-child(4) {
            top: -9.375vh;
            transform: rotateX(45deg) translate3d(0vh, -1.40625vh, -3.282vh);
            background-image: url(../../assets/casino/slotmachine/sloticonbug.jpg);
        }

        &:nth-child(5) {
            top: -18.75vh;
            transform: rotateX(90deg) translate3d(0vh, -11.3445vh, -7.3125vh);
            background-image: url(../../assets/casino/slotmachine/sloticonwasted.jpg);
        }

        &:nth-child(6) {
            top: 9.375vh;
            transform: rotateX(-45deg) rotateZ(-180deg) scale(-1, 1) translate3d(0vh, -1.40625vh, -26.07vh);
            background-image: url(../../assets/casino/slotmachine/sloticonjail.jpg);
        }

        &:nth-child(7) {
            top: -9.375vh;
            transform: rotateX(45deg) rotateZ(180deg) scale(-1, 1) translate3d(0vh, 1.40625vh, -26.07vh);
            background-image: url(../../assets/casino/slotmachine/sloticongvmp.jpg);
        }

        &:nth-child(8) {
            top: 0vh;
            transform: rotateX(0deg) rotateZ(-180deg) scale(-1, 1) translate3d(0vh, 0vh, -22.875vh);
            background-image: url(../../assets/casino/slotmachine/sloticon100.jpg);
        }

        &:nth-child(9) {
            background: #fff;
            top: -6.4vh;
            height: 22.695vh;
            transform: rotateY(0deg) translate3d(0vh, 0vh, -11.4375vh);
        }

        &:nth-child(10) {
            background: #fff;
            top: 16.125vh;
            height: 22.695vh;
            transform: rotateX(-90deg) translate3d(0vh, 11.4375vh, -22.875vh);
        }
    }
}

.itemdia {
    width: 10.9695vh;
    height: 26.715vh;
    margin-top: 9.07775vh;
    position: absolute;
    transform-style: preserve-3d;
    transform-origin: 5.48475vh 4.98475vh -11.4vh;

    &.animate {
        animation-name: rotateAnim;
        animation-duration: 7s;
        animation-timing-function: cubic-bezier(0.525, 0.915, 0.405, 1.000);
    }

    &.state1 {
        transform: rotateX(0deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state2 {
        transform: rotateX(45deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state3 {
        transform: rotateX(90deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state4 {
        transform: rotateX(135deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state5 {
        transform: rotateX(180deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state6 {
        transform: rotateX(225deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state7 {
        transform: rotateX(270deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &.state8 {
        transform: rotateX(315deg);
        transition: transform 1s;
        transition-delay: 2s;
    }

    &:nth-child(4) {
        animation-delay: .5s;
    }

    &:nth-child(5) {
        animation-delay: 1s;
    }

    div {
        position: absolute;
        width: 10.9695vh;
        height: 9.9695vh;
        background-image: url(../../assets/casino/slotmachine/sloticondia08.jpg);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #fff;

        &:nth-child(2) {
            top: 9.375vh;
            transform: rotateX(-45deg) translate3d(0vh, 1.40625vh, -3.282vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia07.jpg);
        }

        &:nth-child(3) {
            top: 18.75vh;
            transform: rotateX(-90deg) translate3d(0vh, 11.3445vh, -7.3125vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia06.jpg);
        }

        &:nth-child(4) {
            top: -9.375vh;
            transform: rotateX(45deg) translate3d(0vh, -1.40625vh, -3.282vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia05.jpg);
        }

        &:nth-child(5) {
            top: -18.75vh;
            transform: rotateX(90deg) translate3d(0vh, -11.3445vh, -7.3125vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia04.jpg);
        }

        &:nth-child(6) {
            top: 9.375vh;
            transform: rotateX(-45deg) rotateZ(-180deg) scale(-1, 1) translate3d(0vh, -1.40625vh, -26.07vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia03.jpg);
        }

        &:nth-child(7) {
            top: -9.375vh;
            transform: rotateX(45deg) rotateZ(180deg) scale(-1, 1) translate3d(0vh, 1.40625vh, -26.07vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia02.jpg);
        }

        &:nth-child(8) {
            top: 0vh;
            transform: rotateX(0deg) rotateZ(-180deg) scale(-1, 1) translate3d(0vh, 0vh, -22.875vh);
            background-image: url(../../assets/casino/slotmachine/sloticondia01.jpg);
        }

        &:nth-child(9) {
            background: #fff;
            top: -6.4vh;
            height: 22.695vh;
            transform: rotateY(0deg) translate3d(0vh, 0vh, -11.4375vh);
        }

        &:nth-child(10) {
            background: #fff;
            top: 16.125vh;
            height: 22.695vh;
            transform: rotateX(-90deg) translate3d(0vh, 11.4375vh, -22.875vh);
        }
    }
}

@keyframes rotateAnim {
    0% {
        transform: rotateX(0deg);
    }
    0% {
        transform: rotateX(360deg*12);
    }
}

.slot1 {
    margin-left: 1.92vh;
}

.slot2 {
    margin-left: 13.2395vh;
}

.slot3 {
    margin-left: 24.759vh;
}
</style>