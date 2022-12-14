<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">HausApp</div>
        </v-ons-toolbar>
        <v-ons-list>
            <v-ons-list-header>Mietplätze (Gesamt: {{ mietp }})</v-ons-list-header>
            <v-ons-list-item modifier="longdivider" tappable v-for="tenant in tenants" :key="tenant.id">
                <div class="left">
                    <span
                        class="list-item__subtitle"
                        style="float:left;"
                    >{{ tenant.id }} - {{ tenant.name }} - {{ tenant.handy }}</span>
                </div>
                <div class="right">
                    <input v-model="tenant.price" placeholder="Preis" value="tenant.price" style="width: 20%;">
                    <v-ons-icon
                        icon="fa-check"
                        style="color: green; cursor: pointer;"
                        class="list-item__icon"
                        @click="saverentprice(tenant)"
                    ></v-ons-icon>
                    <div v-if="tenant.player_id > 0">
                        <v-ons-icon
                            icon="fa-times"
                            style="color: red; cursor: pointer;"
                            class="list-item__icon"
                            @click="unrentTenant(tenant)"
                        ></v-ons-icon>
                    </div>
                    <div v-else>
                        <v-ons-icon icon="fa-times" style="color: grey; " class="list-item__icon"></v-ons-icon>
                    </div>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'HouseList',
    extends: BaseApp,
    data () {
        return {
            tenants: [],
            mietp  : 0,
        }
    },
    methods: {
        responseTenants: function (TenantString, mietp) {
            this.tenants = JSON.parse(TenantString)
            if (mietp > 0) { this.mietp = mietp}
        },
        unrentTenant (tenant) {
            if (tenant.id == null) return
            this.triggerServer('unrentTenant', tenant.id)
            this.pageStack.pop()
        },
        saverentprice (tenant) {
            if (tenant.price == 0) return
            this.triggerServer('saverentprice', tenant.price, tenant.id)
            this.pageStack.pop()
        },
    },
    mounted () {
        this.triggerServer('requestTenants')
    },
    props: ['pageStack'],
}
</script>
