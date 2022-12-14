<template>
    <div style="width:100%">
        <div class="shadow_businessdetail">
            <v-ons-row class="fRow_businessdetail">
                <v-ons-col>
                    Businesskonto: ${{ new Intl.NumberFormat().format(secdata) }}
                </v-ons-col>
            </v-ons-row>
        </div>
        <div class="shadow_businessdetail">
            <v-ons-row class="fRow_businessdetail">
                <v-ons-col>
                    <table id="customers" style="margin-top: 1rem">
                        <tr>
                            <th>
                                Name
                            </th>

                            <th v-if="data.ManagePermission == 1 || data.ManagePermission == 2">
                                Zuletzt gesehen
                            </th>

                            <th v-if="data.ManagePermission == 1 || data.ManagePermission == 2"></th>
                        </tr>

                        <tr v-for="member in data.BusinessMemberList" :key="member.name">
                            <td>
                                {{ member.name }}
                            </td>

                            <td
                                v-if="data.ManagePermission == 1 || data.ManagePermission == 2"
                                style="text-align: right"
                            >
                                {{ getLastLogin(member.last_login) }}
                            </td>

                            <td
                                v-if="data.ManagePermission == 1 || data.ManagePermission == 2"
                                style="text-align: right"
                            >
                                <v-ons-button
                                    class="color-background red"
                                    style="margin: 2px;"
                                    v-on:click="tryKickMember(member)"
                                >
                                    Rauswerfen
                                </v-ons-button>
                            </td>
                        </tr>
                    </table>
                </v-ons-col>
            </v-ons-row>
        </div>

        <v-ons-alert-dialog
            :visible.sync="isVisible"
            modifier="rowfooter"
            v-if="memberToKick !== null"
        >
            <span slot="title">Bestätigen</span>

            Soll {{ memberToKick.name }} wirklich gekickt werden?

            <template slot="footer">
                <v-ons-alert-dialog-button @click="abortKickMember">
                    Abbrechen
                </v-ons-alert-dialog-button>

                <v-ons-alert-dialog-button @click="kickMember(memberToKick.id)">
                    Ja
                </v-ons-alert-dialog-button>
            </template>
        </v-ons-alert-dialog>
    </div>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    props: ['data', 'secdata'],

    extends: BaseApp,
    data () {
        return {
            isVisible: false,

            memberToKick: null,
        }
    },
    methods: {
        getLastLogin (lastLogin) {
            if (lastLogin === 0) {
                return 'Heute'
            }

            return new Date(lastLogin * 1000).toLocaleDateString('de-DE')
        },

        tryKickMember (member) {
            this.memberToKick = member
            this.isVisible = true
        },

        abortKickMember () {
            this.isVisible = false
            this.memberToKick = null
        },

        kickMember (id) {
            this.isVisible = false
            this.triggerServer('kickBusinessMember', id)
        },
    },
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}

.fRow {
    padding: 1rem 0 0 1rem;
}

.mittig {
    text-align: center;
}

.pointerClass {
    cursor: pointer;
}

#customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td, #customers th {
    border: 1px solid #000;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #282828;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: black;
    color: white;
}

</style>