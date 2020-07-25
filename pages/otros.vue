<template>
  <v-card height="100%">
    <!-- <v-card-title class="pa-0">
      <v-banner
        :single-line="true"
        icon="local_offer"
        width="100%"
      >
        Entradas
        <template v-slot:actions>
          <v-btn v-if="$store.getters['event/getTicketQuantity'] > 0" color="primary" @click="dialog = true ">
            <v-icon left>
              add
            </v-icon>
            Agregar Entrada
          </v-btn>
        </template>
      </v-banner>
    </v-card-title> -->
    <v-toolbar color="white" flat>
      <span class="pa-4">
        <v-icon>local_offer</v-icon>
      </span>
      <v-toolbar-title>Entradas</v-toolbar-title>
      <!-- <v-divider class="mx-2" inset="inset" vertical="vertical" /> -->
      <v-spacer />
      <v-btn
        v-if="$store.getters['event/getTicketQuantity'] > 0 &&
          $store.state.module.permissions.store &&
          $store.state.module.permissions.store.pages.tickets.c"
        :small="breakpoint.width < 900"
        color="primary"
        @click="dialog = true "
      >
        <v-icon left>
          add
        </v-icon>
        Agregar Entrada
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-container class="pa-2" fluid>
        <v-row dense>
          <v-col cols="12">
            <v-card>
              <v-card-title class="pa-0">
                <v-container class="pa-2" fluid>
                  <v-row dense>
                    <v-col
                      :align-self="'center'"
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                      xl="6"
                    >
                      <v-tabs>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-tab v-on="on" @click="view = 'L'">
                              <v-icon class="mr-2">list</v-icon>
                            </v-tab>
                          </template>
                          <span>Vista lista</span>
                        </v-tooltip>
                        <!-- <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-tab v-on="on" @click="view = 'C'">
                              <v-icon class="mr-2">view_module</v-icon>
                            </v-tab>
                          </template>
                          <span>Vista cuadricula</span>
                        </v-tooltip> -->
                      </v-tabs>
                    </v-col>
                    <v-col
                      :align-self="'center'"
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                      xl="6"
                    >
                      <!-- <searchs
                        v-if="this.$store.getters['event/getTicketQuantity'] > 0"
                        :iheaders-search="headersSearch"
                        :outlined="true"
                        @searchState="searchState"
                        @refrescar="refrescar"
                        @buscar="buscar"
                      /> -->
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>
              <v-card-actions v-if="this.$store.getters['event/getTicketQuantity'] === 0">
                <v-row dense style="height: 180px;" align="center" justify="center">
                  <v-col cols="12" class="d-flex justify-center">
                    <v-card height="95%" flat>
                      <v-icon x-large>local_offer</v-icon>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex justify-center">
                      <h1 class="hidden-xs-only">Crea tu primera entrada</h1>
                      <h3 class="hidden-sm-and-up">Crea tu primera entrada</h3>
                    </div>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <div class="hidden-xs-only">
                      <v-btn
                        v-if="$store.state.module.permissions.store &&
                          $store.state.module.permissions.store.pages.tickets.c"
                        color="primary"
                        @click="createTicket(false)"
                      >
                        <v-icon left>
                          add
                        </v-icon>
                        Agregar Entrada Gratis
                      </v-btn>
                      <v-btn
                        v-if="$store.state.module.permissions.store &&
                          $store.state.module.permissions.store.pages.tickets.c"
                        color="primary"
                        @click="createTicket(true)"
                      >
                        <v-icon left>
                          add
                        </v-icon>
                        Agregar Entrada con costo
                      </v-btn>
                    </div>
                    <div class="hidden-sm-and-up">
                      <div class="my-2">
                        <v-btn
                          v-if="$store.state.module.permissions.store &&
                            $store.state.module.permissions.store.pages.tickets.c"
                          color="primary"
                          @click="createTicket(false)"
                        >
                          <v-icon left>
                            add
                          </v-icon>
                          Entrada Gratis
                        </v-btn>
                      </div>
                      <div class="my-2">
                        <v-btn
                          v-if="$store.state.module.permissions.store &&
                            $store.state.module.permissions.store.pages.tickets.c"
                          color="primary"
                          @click="createTicket(true)"
                        >
                          <v-icon left>
                            add
                          </v-icon>
                          Entrada con costo
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-actions>
              <v-divider />
              <v-card-text class="pa-0">
                <v-data-table
                  v-if="this.$store.getters['event/getTicketQuantity'] > 0"
                  :headers="headers"
                  :items="tickets"
                  :options.sync="pagination"
                  :loading="loading"
                  :server-items-length="total"
                  :footer-props="{ 'items-per-page-options': rowsPerPageItems, 'items-per-page-text': 'Filas por página:', pageText: '{0}-{1} de {2}' }"
                  :items-per-page="5"
                  :loading-text="'Cargando... Espere por favor'"
                  item-key="index"
                  disable-sort
                  hide-default-header
                  no-data-text="datos no disponibles"
                >
                  <template v-slot:header="{ props: { } }">
                    <thead>
                      <tr>
                        <th
                          v-for="header in headers"
                          :key="header.text"
                          :class="header.value === 'name'
                            || header.value === 'visible' ?
                              'text-left' : 'text-center'"
                        >
                          {{ header.text }}
                        </th>
                      </tr>
                    </thead>
                  </template>
                  <template v-if="tickets.length > 0" v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.visible ? 'Visible' : 'Privado' }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-center">{{ item.uses }}</td>
                        <td class="text-center">{{ item.price === 0 ? 'Gratis' : $store.getters['event/getCurrency'].prefix + format(item.price) }}</td>
                        <td class="text-center">
                          <v-chip :color="(item.active) ? 'green' : 'grey'" class="ma-2" small text-color="white">
                            {{ item.active ? 'Activo' : 'Inactivo' }}
                          </v-chip>
                        </td>
                        <td class="text-center">
                          <v-row align="center" justify="center">
                            <v-tooltip
                              v-if="$store.state.module.permissions.store &&
                                $store.state.module.permissions.store.pages.tickets.r &&
                                !$store.state.module.permissions.store.pages.tickets.u"
                              bottom
                            >
                              <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click="viewItem(item)">
                                  visibility
                                </v-icon>
                              </template>
                              <span>Ver entrada</span>
                            </v-tooltip>
                            <v-menu
                              v-if="$store.state.module.permissions.store &&
                                $store.state.module.permissions.store.pages.tickets.u"
                              bottom
                              left
                            >
                              <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on">
                                  <v-icon>more_vert</v-icon>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item @click="editTicket(item)">
                                  <v-list-item-title>Editar Entrada</v-list-item-title>
                                </v-list-item>
                                <!-- <v-list-item>
                                  <v-list-item-title>Archivar Entrada</v-list-item-title>
                                </v-list-item> -->
                              </v-list>
                            </v-menu>
                          </v-row>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                  <template v-slot:no-data>
                    <div class="text-center">No existen datos.</div>
                  </template>
                </v-data-table>
              </v-card-text>
              <ticket
                :edited-id="editedId"
                :edited-index="editedIndex"
                :free="free"
                :dialog="dialog"
                :disabled="disabled"
                @closedialog="closedialog"
                @ticketEdit="edit"
                @ticketchange="ticketChange"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
      {{ text }}
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from 'axios'
import config from '~/server/config'
import ticket from '~/components/ticket'
// import searchs from '~/components/globals/search2'
export default {
  middleware: ['auth', 'permission', 'event'],
  layout: 'event',
  name: 'Tickets',
  components: {
    ticket
    // searchs
  },
  async asyncData ({ route, params, error, store }) {
    try {
      const tickets = await axios.get(`${config.URL}tickets`, { headers: store.getters['auth/getAuthHeader'](route.path) })
      return { tickets: tickets.data.data, total: tickets.data.docs }
    } catch (err) {
      if (err.response.status !== 404) { error({ statusCode: err.response.status, message: err.response.data.message, messagePublic: err.response.data.messagePublic }) }
    }
  },
  data () {
    return {
      isHydrated: false,
      snackbar: false,
      color: 'success',
      timeout: 5000,
      text: '',
      loading: false,
      pagination: {
        page: 1,
        itemsPerPage: 5
      },
      total: 0,
      rowsPerPageItems: [5, 10, 25],
      tickets: [],
      editedId: '',
      dialog: false,
      editedIndex: -1,
      headers: [
        { text: 'Nombre', align: 'left', value: 'name', sortable: false },
        { text: 'Tipo', align: 'center', value: 'visible', sortable: false },
        { text: 'cantidad', align: 'center', value: 'quantity', sortable: false },
        { text: 'N° de usos', align: 'center', value: 'uses', sortable: false },
        { text: 'Precio', align: 'center', value: 'price', sortable: false },
        { text: 'Estado', align: 'center', value: 'active', sortable: false },
        { text: 'Acciones', align: 'center', value: 'actions', sortable: false }
      ],
      headersSearch: [],
      structureOr: '',
      view: 'L',
      free: true,
      disabled: true
    }
  },
  computed: {
    breakpoint () { // computed para poder utilizar el breakpoint de vuetify en lado del cliente (NUXT)
      return this.isHydrated ? this.$vuetify.breakpoint : { breakpointsm: '', breakpointwidth: '' }
    }
  },
  watch: {
    pagination: {
      handler (val, oldVal) {
        if (val.page !== oldVal.page || val.itemsPerPage !== oldVal.itemsPerPage) { this.buscar() }
      },
      deep: true
    }
  },
  mounted () {
    this.isHydrated = true
  },
  beforeMount () {
    setTimeout(() => {
      this.headersSearch = [
        { text: 'Nombre', value: 'name' }
      ]
    }, 500)
  },
  methods: {
    refrescar (structureOr) {
      const self = this
      self.structureOr = structureOr
      self.buscar()
    },
    // searchState (search, structureOr) {
    //   this.structureOr = structureOr
    //   this.pagination.page = 1
    // },
    async buscar () {
      const self = this
      this.loading = true
      try {
        const data = await axios.get(`${config.URL}tickets`, {
          headers: self.$store.getters['auth/getAuthHeader'](this.$route.path),
          params: { skip: self.pagination.page - 1, limit: self.pagination.itemsPerPage, query: self.structureOr }
        })
        self.tickets = data.data.data
        self.total = data.data.docs
        self.loading = false
      } catch (error) {
        self.loading = false
        if (error.response.status !== 404) { self.mensaje(true, 'error', error.response.data.messagePublic, 5000) }
      }
    },
    mensaje (snackbar, color, text, timeout) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
      this.timeout = timeout
    },
    edit (tickets) {
      Object.assign(this.tickets[this.editedIndex], tickets)
    },
    editTicket (ticket) {
      ticket.price === 0 ? this.free = false : this.free = true
      this.editedIndex = this.tickets.indexOf(ticket)
      this.editedId = ticket._id
      this.dialog = true
    },
    viewItem (ticket) {
      ticket.price === 0 ? this.free = false : this.free = true
      this.editedIndex = this.tickets.indexOf(ticket)
      this.editedId = ticket._id
      this.dialog = true
      this.disabled = false
    },
    ticketChange (ticket) {
      this.tickets.push(ticket)
      this.total += 1
    },
    createTicket (free) {
      this.free = free
      this.dialog = true
    },
    closedialog () {
      this.dialog = false
      setTimeout(() => {
        this.free = true
        this.disabled = true
      }, 300)
      setTimeout(() => {
        this.editedIndex = -1
        this.editedId = ''
      }, 500)
    },
    formatNewDate (date) {
      if (!date) { return null }
      return `${('0' + (new Date(date)).getDate()).slice(-2)}/${('0' + ((new Date(date)).getMonth() + 1)).slice(-2)}/${(new Date(date)).getFullYear()}`
    },
    format (value) {
      const val = (value / 1).toFixed(2)
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style scoped>
  #datatable {
    border-color: 2px solid red;
    height: 3em;
    background: red;
  }
</style>
