<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Tickets in Bearbeitung</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Tickets in Bearbeitung ({{ tickets.length }})</v-ons-list-header>
            <v-ons-list-item v-if="tickets.length == 0">
                <div class="center">Du bearbeitest momentan keine Tickets</div>
            </v-ons-list-item>
            <v-ons-list-item
                v-else
                modifier="longdivider"
                tappable
                v-for="ticket in tickets"
                :key="ticket.id"
                @click="push(ticket)"
            >
                <div class="center">
                    <span class="list-item__title">{{
                            ticket.creator
                                                   }} <small>{{
                                formatDateTimeString(ticket.created_at)
                                                             }}</small></span>
                    <span class="list-item__subtitle">{{ ticket.text }}</span>
                </div>
                <div class="right">
                    <v-ons-icon icon="md-chevron-right" class="list-item__icon"></v-ons-icon>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import SupportTicketOverview from './SupportTicketOverview'

export default {
    name: 'SupportAcceptedTickets',
    extends: BaseApp,
    data () {
        return {
            tickets: [],
        }
    },
    methods: {
        responseAcceptedTicketList (ticketList) {
            this.tickets = JSON.parse(ticketList)
        },
        push (ticket) {
            this.pageStack.push({ extends: SupportTicketOverview, data () { return { ticket: ticket }} })
        },
        formatDateTimeString (dateTime) {
            return new Date(dateTime).toLocaleString()
        },
        removeTicket (ticket) {
            let index = this.tickets.indexOf(ticket)

            if (index > -1) {
                this.tickets.splice(index, 1)
            }
        },
    },
    mounted () {
        this.triggerServer('requestAcceptedTickets')
    },
    props: ['pageStack'],
}
</script>

<style>
.pointer {
    cursor: pointer !important;
}
</style>