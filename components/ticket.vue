<template>
  <div>
    <v-col cols="12">
      <dialog-form
        :form-title="formTitle"
        :dialog="dialog"
        :loading="loading"
        :disabled="loadingData"
        :mostrar="disabled"
        :edited-index="editedIndex"
        :width="'500'"
        @closedialog="close"
        @savedialog="save"
      >
        <v-form ref="form">
          <v-container>
            <!-- <loadingComponent :loading="loadingData" :type="'form'" :quanty="7" :clases="'xs12'" /> -->
            <v-row v-if="!loadingData" dense>
              <v-col v-if="this.$store.getters['event/getTicketQuantity'] > 0" cols="12" class="d-flex justify-center align-center">
                <v-tabs v-model="tab" centered>
                  <v-tab @click="typeTicket(true)">Entrada con costo</v-tab>
                  <v-tab @click="typeTicket(false)">Entrada Gratis</v-tab>
                </v-tabs>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="name"
                  v-model.trim="ticket.name"
                  :readonly="!disabled"
                  :error-messages="nameErrors"
                  name="name"
                  label="Nombre"
                  placeholder="Nombre de la entrada"
                  required
                  @input="$v.ticket.name.$touch()"
                  @blur="$v.ticket.name.$touch()"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="quantity"
                  v-model="ticket.quantity"
                  :readonly="!disabled"
                  :error-messages="quantityErrors"
                  name="quantity"
                  label="Cantidad Disponible"
                  placeholder="100"
                  required
                  @keypress="soloNumeros($event)"
                  @input="$v.ticket.quantity.$touch()"
                  @blur="$v.ticket.quantity.$touch()"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="freeTicket"
                  ref="price"
                  v-model="ticket.price"
                  :readonly="!disabled"
                  :placeholder="`0.00`"
                  :error-messages="priceErrors"
                  :prefix="`${$store.getters['event/getCurrency'].prefix}`"
                  name="price"
                  label="Precio"
                  required
                  @keypress="numberDecimal($event)"
                  @input="$v.ticket.price.$touch()"
                  @blur="$v.ticket.price.$touch()"
                />
                <v-text-field v-if="!freeTicket" :value="'Entrada Gratis'" label="Precio" readonly />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="ticket.description"
                  :readonly="!disabled"
                  :error-messages="descriptionErrors"
                  label="Descripcion"
                  placeholder="Ofrece más detalles a los asistentes sobre esta entrada"
                  counter
                  maxlength="500"
                  @input="$v.ticket.description.$touch()"
                  @blur="$v.ticket.description.$touch()"
                />
              </v-col>
              <v-col v-if="freeTicket || this.$store.getters['event/getTicketQuantity'] > 0" cols="6">
                <v-text-field
                  ref="minimum"
                  v-model="ticket.minimum"
                  :readonly="!disabled"
                  :error-messages="minimumErrors"
                  label="Cantida minima de compra"
                  placeholder="Cantida minima"
                  counter
                  required
                  @keypress="soloNumeros($event)"
                  @input="$v.ticket.minimum.$touch()"
                  @blur="$v.ticket.minimum.$touch()"
                />
              </v-col>
              <v-col v-if="freeTicket || this.$store.getters['event/getTicketQuantity'] > 0" cols="6">
                <v-text-field
                  ref="maximum"
                  v-model="ticket.maximum"
                  :readonly="!disabled"
                  :error-messages="maximumErrors"
                  label="Cantidad maxima de compra"
                  placeholder="Cantidad maxima"
                  required
                  @keypress="soloNumeros($event)"
                  @input="$v.ticket.maximum.$touch()"
                  @blur="$v.ticket.maximum.$touch()"
                />
              </v-col>
              <v-col v-if="freeTicket || this.$store.getters['event/getTicketQuantity'] > 0" cols="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :readonly="!disabled"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="ticket.startDate"
                      :readonly="!disabled"
                      label="Fecha de inicio de ventas"
                      persistent-hint
                      v-on="on"
                      @blur="date = parseDate(ticket.startDate)"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    :readonly="!disabled"
                    :min="parseNewDate(saveDate)"
                    :max="parseNewDate(endDate)"
                    no-title
                    @input="menu1 = false"
                  />
                </v-menu>
                <v-spacer />
                <!-- <vue-timepicker
                  id="horIni"
                  v-model="ticket.horIni"
                  :label="'Hora inicio'"
                  :minute-interval="15"
                  name="horIni"
                  hide-clear-button
                /> -->
              </v-col>
              <v-col v-if="freeTicket || this.$store.getters['event/getTicketQuantity'] > 0" cols="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :readonly="!disabled"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="ticket.endDate"
                      :readonly="!disabled"
                      label="Fecha fin de ventas"
                      persistent-hint
                      v-on="on"
                      @blur="date2 = parseDate(ticket.endDate)"
                    />
                  </template>
                  <v-date-picker
                    v-model="date2"
                    :readonly="!disabled"
                    :min="date"
                    :max="parseNewDate(endDate)"
                    no-title
                    @input="menu2 = false"
                  />
                </v-menu>
                <v-spacer />
                <!-- <vue-timepicker
                  id="horFin"
                  v-model="ticket.horFin"
                  :minute-interval="15"
                  :label="'Hora fin'"
                  name="horFin"
                  hide-clear-button
                /> -->
              </v-col>
              <v-col v-if="freeTicket || this.$store.getters['event/getTicketQuantity'] > 0" cols="12">
                <v-radio-group
                  v-model="ticket.visible"
                  :readonly="!disabled"
                  :error-messages="visibleErrors"
                  column
                  required
                  @input="$v.ticket.visible.$touch()"
                  @blur="$v.ticket.visible.$touch()"
                >
                  <!-- <template v-slot:label>
                    <div>Visivilidad de la entrada (cuando este a la venta)</div>
                  </template> -->
                  <v-radio
                    :value="true"
                    color="primary"
                    label="Visible (Para el publico en general)"
                  />
                  <v-radio
                    :value="false"
                    color="primary"
                    label="Privado (Se podra usar con un código de descuento)"
                  />
                </v-radio-group>
              </v-col>
              <v-col v-if="editedIndex > -1" cols="12" sm="12">
                <h3>Estado de la entrada</h3>
                <!-- <row dense> -->
                <v-checkbox v-model="ticket.active" :readonly="!disabled" label="Activo" color="primary">
                  <template v-slot:label>
                    Activo
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon class="mr-2 pl-2" style="width:70px" v-on="on">
                          info_outline
                        </v-icon>
                      </template>
                      <span>Activar o desactivar la entrada de las ventas</span>
                    </v-tooltip>
                  </template>
                </v-checkbox>
                <!-- </row> -->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </dialog-form>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :left="x === 'left'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      :color="color"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import config from '~/server/config'
import format from '~/plugins/formato'
// import VueTimepicker from '~/components/extras/vue-timepicker'
// import dialogForm from '~/components/modalForm/form'
// import loadingComponent from '~/components/globals/loading'
// const _hoy = new Date((new Date()).getTime())
export default {
  name: 'TicketsEvent',
  components: {
  // VueTimepicker,
  // dialogForm
  // loadingComponent
  },
  mixins: [validationMixin],
  validations () {
    return {
      ticket: {
        name: { required, minLength: minLength(1), maxLength: maxLength(100) },
        quantity: { required, between: between(1, 999999) },
        price: (this.freeTicket ? { required, between: between(1, 999999) } : {}),
        description: { maxLength: maxLength(500) },
        maximum: (this.freeTicket || this.$store.getters['event/getTicketQuantity'] > 0 ? { required, between: between(1, 999999) } : {}),
        minimum: (this.freeTicket || this.$store.getters['event/getTicketQuantity'] > 0 ? { required, between: between(1, 999999) } : {}),
        visible: (this.freeTicket || this.$store.getters['event/getTicketQuantity'] > 0 ? { required } : {})
      }
    }
  },
  props: {
    editedId: { type: String, default: '' },
    dialog: {
      type: Boolean,
      default: false
    },
    editedIndex: {
      type: Number,
      default: -1
    },
    free: { type: Boolean, default: true },
    disabled: { type: Boolean, default: true }
  },
  data () {
    return {
      snackbar: false,
      color: '',
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: '',
      loading: false,
      loadingData: false,
      menu1: false,
      menu2: false,
      date: null,
      date2: null,
      // tickets: [],
      ticket: {
        name: '',
        description: '',
        maximum: 10,
        minimum: 1,
        price: null,
        visible: null,
        cantidad: null,
        startDate: null,
        endDate: null,
        active: null,
        horIni: { HH: '08', mm: '00', ss: '00' },
        horFin: { HH: '18', mm: '00', ss: '00' }
      },
      freeTicket: true,
      tab: 0,
      ticketEdit: {},
      saveDate: null,
      endDate: null
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Agregar entrada' : 'Editar entrada'
    },
    nameErrors () {
      const errors = []
      if (!this.$v.ticket.name.$dirty) { return errors }
      !this.$v.ticket.name.minLength && errors.push('La nombre debe tener como mínimo 1 caracter')
      !this.$v.ticket.name.maxLength && errors.push('La nombre debe tener como máximo 100 caracteres')
      !this.$v.ticket.name.required && errors.push('Se requiere nombre.')
      return errors
    },
    quantityErrors () {
      const errors = []
      if (!this.$v.ticket.quantity.$dirty) { return errors }
      !this.$v.ticket.quantity.between && errors.push('Tienes que ingresar un número entre 1 y 999999.')
      !this.$v.ticket.quantity.required && errors.push('Se requiere cantidad.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.ticket.price.$dirty) { return errors }
      !this.$v.ticket.price.between && errors.push('Tienes que ingresar un número entre 1 y 999999.')
      !this.$v.ticket.price.required && errors.push('Se requiere precio.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.ticket.description.$dirty) { return errors }
      !this.$v.ticket.description.maxLength && errors.push('La descripción debe tener como máximo 500 caracteres')
      return errors
    },
    maximumErrors () {
      const errors = []
      if (!this.$v.ticket.maximum.$dirty) { return errors }
      !this.$v.ticket.maximum.between && errors.push('Tienes que ingresar un número entre 1 y 999999.')
      !this.$v.ticket.maximum.required && errors.push('Se requiere campo.')
      return errors
    },
    minimumErrors () {
      const errors = []
      if (!this.$v.ticket.minimum.$dirty) { return errors }
      !this.$v.ticket.minimum.between && errors.push('Tienes que ingresar un número entre 1 y 999999.')
      !this.$v.ticket.minimum.required && errors.push('Se requiere campo.')
      return errors
    },
    visibleErrors () {
      const errors = []
      if (!this.$v.ticket.visible.$dirty) { return errors }
      !this.$v.ticket.visible.required && errors.push('Se requiere campo.')
      return errors
    }
  },
  watch: {
    async editedId (val) {
      const self = this
      if (val) {
        this.loadingData = true
        try {
          const data = await axios.get(`${config.URL}ticket/${val}`, { headers: self.$store.getters['auth/getAuthHeader'](this.$route.path) })
          const ticketEdit = Object.assign({}, data.data.data)
          const fi = new Date(ticketEdit.startDate)
          const ff = new Date(ticketEdit.endDate)
          ticketEdit.startDate = self.formatNewDate(fi)
          ticketEdit.endDate = self.formatNewDate(ff)
          ticketEdit.horIni = { HH: ('0' + (new Date(fi)).getHours().toString()).slice(-2), mm: ('0' + (new Date(fi)).getMinutes().toString()).slice(-2), ss: '00' }
          ticketEdit.horFin = { HH: ('0' + (new Date(ff)).getHours().toString()).slice(-2), mm: ('0' + (new Date(ff)).getMinutes().toString()).slice(-2), ss: '00' }
          self.date = self.parseDate(ticketEdit.startDate)
          self.date2 = self.parseDate(ticketEdit.endDate)
          self.ticket = Object.assign({}, ticketEdit)
          self.ticketEdit = Object.assign({}, self.ticket)
          self.loadingData = false
        } catch (error) {
          self.close()
          self.loadingData = false
          self.mensaje(true, 'error', error.response.data.messagePublic, 5000)
        }
      }
    },
    date (val) {
      if (new Date(this.date2) < new Date(this.date)) {
        this.date2 = val
      }
      this.ticket.startDate = this.formatDate(this.date)
    },
    date2 (val) {
      this.ticket.endDate = this.formatDate(this.date2)
    },
    free (val) {
      this.freeTicket = val
    },
    freeTicket (val) {
      if (!val) {
        if (this.ticket._id) {
          this.ticket.price = '0'
          this.ticket.maximum = this.ticketEdit.maximum
          this.ticket.minimum = this.ticketEdit.minimum
          this.ticket.visible = this.ticketEdit.visible
        } else {
          this.ticket.price = '0'
          this.ticket.maximum = 1
          this.ticket.minimum = 1
          this.ticket.visible = true
        }
        this.tab = 1
      } else {
        if (this.ticket._id) {
          this.ticket.maximum = this.ticketEdit.maximum
          this.ticket.minimum = this.ticketEdit.minimum
          this.ticket.price = this.ticketEdit.price
          this.ticket.visible = this.ticketEdit.visible
        } else {
          this.ticket.maximum = 10
          this.ticket.minimum = 1
          this.ticket.price = null
          this.ticket.visible = null
        }
        this.tab = 0
      }
    }
  },
  mounted () {
    const self = this
    if (this.$store.state.event) {
      setTimeout(() => {
        self.date = self.parseDate(self.formatNewDate(new Date(self.$store.state.event.event.saveDate)))
        self.date2 = self.parseDate(self.formatNewDate(new Date(self.$store.state.event.event.endDate)))
        self.ticket.startDate = self.formatNewDate(new Date(self.$store.state.event.event.saveDate))
        self.ticket.endDate = self.formatNewDate(new Date(self.$store.state.event.event.endDate))
        self.saveDate = new Date(self.$store.state.event.event.saveDate)
        self.endDate = new Date(self.$store.state.event.event.endDate)
      }, 500)
    }
  },
  methods: {
    mensaje (snackbar, color, text, timeout) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
      this.timeout = timeout
    },
    typeTicket (free) {
      this.freeTicket = free
    },
    soloNumeros (e) {
      format.numbers(e)
    },
    soloLetras (e) {
      format.letters(e)
    },
    numberDecimal (e) {
      format.numberDecimal(e)
    },
    async save () {
      const self = this
      if (!this.ticket.name) {
        this.$refs.name.focus()
      } else if (!this.ticket.quantity) {
        this.$refs.quantity.focus()
      } else if (!this.ticket.price && this.freeTicket === true) {
        this.$refs.price.focus()
      } else if (!this.ticket.maximum && this.freeTicket === true) {
        this.$refs.maximum.focus()
      } else if (!this.ticket.minimum && this.freeTicket === true) {
        this.$refs.minimum.focus()
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const [yi, mi, di] = self.parseDate(self.ticket.startDate).split('-')
        const [yf, mf, df] = self.parseDate(self.ticket.endDate).split('-')
        const nuevoticket = Object.assign({}, self.ticket)
        nuevoticket.startDate = new Date(yi, (parseInt(mi) - 1), di, nuevoticket.horIni.HH, nuevoticket.horIni.mm)
        nuevoticket.endDate = new Date(yf, (parseInt(mf) - 1), df, nuevoticket.horFin.HH, nuevoticket.horFin.mm)
        nuevoticket.price = parseFloat(nuevoticket.price)
        if (parseInt(nuevoticket.minimum) > parseInt(nuevoticket.maximum)) {
          this.mensaje(true, 'error', 'El campo minimo de tickets no puede ser mayor al maximo!', 5000)
          this.$refs.minimum.focus()
        } else if (parseInt(nuevoticket.maximum) > parseInt(nuevoticket.quantity)) {
          this.mensaje(true, 'error', 'El campo maximo de tickets no puede ser mayor a la cantidad disponible!', 5000)
          this.$refs.maximum.focus()
        } else if (nuevoticket.endDate <= nuevoticket.startDate) {
          this.mensaje(true, 'error', 'La fecha final no puede ser menor o igual a la fecha de inicio!', 5000)
        } else {
          nuevoticket.startDate = new Date(yi, (parseInt(mi) - 1), di, nuevoticket.horIni.HH, nuevoticket.horIni.mm)
          nuevoticket.endDate = new Date(yf, (parseInt(mf) - 1), df, nuevoticket.horFin.HH, nuevoticket.horFin.mm)
          if ((nuevoticket.price * nuevoticket.minimum) < 3 && nuevoticket.price !== 0) {
            self.$swal.fire({
              title: '¿Desea continuar?',
              text: `Se creara una entrada menor a ${self.$store.getters['event/getCurrency'].prefix} 
              3 ${self.$store.getters['event/getCurrency'].value === 'PEN' ? 'Soles' : self.$store.getters['event/getCurrency'].value === 'USD' ? 'Dolares' : 'Euros'},
              puede que no se muestre la opción de pago con tarjeta en las ventas con esta entrada!`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar!',
              cancelButtonText: 'Cancelar',
              allowOutsideClick: false
            }).then(async (result) => {
              if (result.value) {
                self.loading = true
                if (self.editedIndex > -1) {
                  try {
                    const data = await axios.put(`${config.URL}ticket/${nuevoticket._id}`, nuevoticket, { headers: self.$store.getters['auth/getAuthHeader'](self.$route.path) })
                    self.$emit('ticketEdit', nuevoticket)
                    self.$store.dispatch('event/setEvent', { id: self.$store.state.event.event._id, path: self.$route.path })
                    self.close()
                    self.mensaje(true, 'success', data.data.messagePublic, 5000)
                    self.loading = false
                  } catch (error) {
                    self.loading = false
                    self.mensaje(true, 'error', error.response.data.messagePublic, 5000)
                  }
                } else {
                  nuevoticket._event = self.$store.state.event.event._id
                  try {
                    const data = await axios.post(`${config.URL}ticket`, nuevoticket, { headers: self.$store.getters['auth/getAuthHeader'](this.$route.path) })
                    self.$emit('ticketchange', data.data.data)
                    self.$store.dispatch('event/setEvent', { id: self.$store.state.event.event._id, path: this.$route.path })
                    self.close()
                    self.mensaje(true, 'success', 'La entrada se guardo correctamente', 5000)
                    self.loading = false
                  } catch (error) {
                    self.loading = false
                    self.mensaje(true, 'error', error.response.data.messagePublic, 5000)
                  }
                }
              }
            })
          } else {
            self.loading = true
            if (self.editedIndex > -1) {
              try {
                const data = await axios.put(`${config.URL}ticket/${nuevoticket._id}`, nuevoticket, { headers: self.$store.getters['auth/getAuthHeader'](this.$route.path) })
                self.$emit('ticketEdit', nuevoticket)
                self.$store.dispatch('event/setEvent', { id: self.$store.state.event.event._id, path: this.$route.path })
                self.close()
                self.mensaje(true, 'success', data.data.messagePublic, 5000)
                self.loading = false
              } catch (error) {
                self.loading = false
                self.mensaje(true, 'error', error.response.data.messagePublic, 5000)
              }
            } else {
              nuevoticket._event = self.$store.state.event.event._id
              try {
                const data = await axios.post(`${config.URL}ticket`, nuevoticket, { headers: self.$store.getters['auth/getAuthHeader'](this.$route.path) })
                self.$emit('ticketchange', data.data.data)
                self.$store.dispatch('event/setEvent', { id: self.$store.state.event.event._id, path: this.$route.path })
                self.close()
                self.mensaje(true, 'success', 'La entrada se guardo correctamente', 5000)
                self.loading = false
              } catch (error) {
                self.loading = false
                self.mensaje(true, 'error', error.response.data.messagePublic, 5000)
              }
            }
          }
        }
      }
    },
    close () {
      this.$emit('closedialog')
      setTimeout(() => {
        this.ticket = {
          name: '',
          description: '',
          maximum: 10,
          minimum: 1,
          price: null,
          cantidad: null,
          visible: null,
          active: null,
          startDate: this.formatNewDate(new Date(this.$store.state.event.event.saveDate)),
          endDate: this.formatNewDate(new Date(this.$store.state.event.event.endDate)),
          horIni: { HH: '08', mm: '00', ss: '00' },
          horFin: { HH: '18', mm: '00', ss: '00' }
        }
        this.date = this.parseDate(this.formatNewDate(new Date(this.$store.state.event.event.saveDate)))
        this.date2 = this.parseDate(this.formatNewDate(new Date(this.$store.state.event.event.endDate)))
        this.freeTicket = true
        this.tab = 0
      }, 300)
      this.$v.$reset()
    },
    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatNewDate (date) {
      if (!date) { return null }
      return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
    },
    parseNewDate (date) {
      if (!date) { return null }

      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    },
    parseDate (date) {
      if (!date) { return null }

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
