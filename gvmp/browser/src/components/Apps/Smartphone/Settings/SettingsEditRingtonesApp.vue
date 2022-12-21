<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Klingeltöne
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-item v-if="ringtones.length === 0">
                    <div class="center">
                        Keine Klingeltöne vorhanden
                    </div>
                </v-ons-list-item>

                <v-ons-list-item
                    v-for="ringtone in ringtones"
                    :key="ringtone.id"
                    @click.stop="setCurrentRingtone(ringtone)"
                    tappable
                    :value="ringtone.id"
                    modifier="longdivider"
                >
                    <label class="left">
                        <v-ons-radio
                            :input-id="'radio-' + ringtone.id"
                            :value="ringtone.id"
                        ></v-ons-radio>
                    </label>

                    <label :for="'radio-' + ringtone.id" class="center">
                        {{ ringtone.name }}
                    </label>
                </v-ons-list-item>

                <v-ons-list-item v-if="selectedRingtoneId !== -1">
                    {{ selectedRingtoneName }}
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button modifier="large" @click="saveRingtone" style="background-color: green">
                    Speichern
                </v-ons-button>
            </section>

            <audio
                autoplay
                ref="media"
                currentTime="0"
                type="audio/ogg"
                preload="auto"
                :volume="0.1"
                :src="getRingtone()"
                style="display: none"
            />
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import Sounds from '../../../sounds'

export default {
    name: 'SettingsEditRingtonesApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            ringtones           : [],

            selectedRingtoneId  : 0,
            selectedRingtoneName: 'Default',
        }
    },

    methods: {
        responseRingtoneList (data) {
            this.ringtones = JSON.parse(data).ringtones

            this.setCurrentRingtone(0)
        },

        getRingtone () {
            if(this.selectedRingtoneId == undefined) return Sounds.ringtoneIncomming() 
            else if(this.selectedRingtoneId == 0) return Sounds.ringtoneIncomming()
            else return "https://prdx.to/upload/ringtones/" + parseInt(this.selectedRingtoneId) + ".ogg";
        },

        setCurrentRingtone (ringtone) {
            this.selectedRingtoneId   = parseInt(ringtone.id)
            this.selectedRingtoneName = ringtone.name
        },

        saveRingtone () {
            this.triggerServer('saveRingtone', this.selectedRingtoneId)

            this.pageStack.pop()
        },
    },

    mounted () {
      this.triggerServer('requestRingtoneList')
    },
}
</script>
