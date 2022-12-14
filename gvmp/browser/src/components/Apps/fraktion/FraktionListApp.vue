<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Fraktionsverwaltung</div>
            <div class="right">
                <span v-if="manage" class="pointerClass" style="padding-right: 0.5rem;" @click="showRights(members)">Rechte</span>
            </div>
        </v-ons-toolbar>
        <v-ons-row class="fRow">
            <v-ons-col><h3>Mitglieder ({{ anzMember }})</h3></v-ons-col>
        </v-ons-row>
        <div class="table" style="padding-bottom: 1.5rem;">
            <v-ons-row class="fRow" style="font-weight: bold;">
                <v-ons-col width="10%">Rang</v-ons-col>
                <v-ons-col width="25%">Beschreibung</v-ons-col>
                <v-ons-col>Name</v-ons-col>
                <v-ons-col width="15%">Payday</v-ons-col>
                <v-ons-col width="15%" v-if="manage"></v-ons-col>
            </v-ons-row>
            <v-ons-row class="fRow" v-for="member in members.list" :key="member.id">
                <v-ons-col width="10%">{{ member.rang }}</v-ons-col>
                <v-ons-col width="25%">{{ member.title }}</v-ons-col>
                <v-ons-col>{{ member.name }}</v-ons-col>
                <v-ons-col width="15%" v-if="(manage && hasDuty)">{{ member.payday }}</v-ons-col>
                <v-ons-col width="15%" v-if="manage">
                    <span class="pointerClass" @click="editMember(member)"><v-ons-icon icon="md-edit" class="list-item__icon"></v-ons-icon></span>
                </v-ons-col>
            </v-ons-row>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
    import FraktionEditApp from "./FraktionEditApp"
    import FraktionRightsOverviewApp from "./FraktionRightsOverviewApp"

    export default {
        name: "FraktionListApp",
        extends: BaseApp,
        data() {
            return {
                members: [],
                manage: false,
                anzMember: 0,
                hasDuty: false,
            }
        },
        methods: {
            responseMembers(members, hasduty) {
                this.members = JSON.parse(members)
                this.manage = this.members.manage
                this.anzMember = this.members.list.length
                this.hasDuty = hasduty
            },
            editMember(member) {
                this.pageStack.push({ extends: FraktionEditApp, data() { return { member: member } } })
            },
            showRights(members) {
                this.pageStack.push({ extends: FraktionRightsOverviewApp, data() { return { members: members } } })
            },
        },
        mounted() {
            this.triggerServer('requestFraktionMembers')
        },
        props: ['pageStack']
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
</style>