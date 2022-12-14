<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Offene Tickets</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Offene Tickets ({{ tickets.length }})</v-ons-list-header>
            <v-ons-list-item v-if="tickets.length == 0">
                <div class="center">Es wurden keine offenen Tickets gefunden</div>
            </v-ons-list-item>
            <v-ons-list-item v-else modifier="longdivider" v-for="ticket in tickets" :key="ticket.id">
                <div class="center">
                    <span class="list-item__title">{{
                            ticket.creator
                                                   }} <small>{{
                                formatDateTimeString(ticket.created_at)
                                                             }}</small></span>
                    <span class="list-item__subtitle">{{ ticket.text }}</span>
                </div>
                <div class="right">
                    <v-ons-button class="pointer" modifier="large" @click="acceptService(ticket)">Ticket annehmen
                    </v-ons-button>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'SupportOpenTickets',
    extends: BaseApp,
    data () {
        return {
            tickets: [],
        }
    },
    methods: {
        responseOpenTicketList (ticketList) {
            this.tickets = JSON.parse(ticketList)
        },
        acceptService (ticket) {
            this.triggerServer('acceptOpenSupportTicket', ticket.creator)

            let index = this.tickets.indexOf(ticket)

            if (index > -1) {
                this.tickets.splice(index, 1)
            }
        },
        formatDateTimeString (dateTime) {
            return new Date(dateTime).toLocaleString()
        },
    },
    mounted () {
        this.triggerServer('requestOpenSupportTickets')
    },
    props: ['pageStack'],
}
</script>

<style>
.pointer {
    cursor: pointer !important;
}
</style>