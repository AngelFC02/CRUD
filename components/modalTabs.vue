<template>
  <v-container>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="3000">
      {{ text }}
    </v-snackbar>
    <v-dialog v-model="modaltabs" width="500" persistent>
      <v-row dense>
        <v-card>
          <v-tabs centered>
            <v-tab>
              Usuario
            </v-tab>
            <v-tab>
              Tarjeta
            </v-tab>
            <v-tab-item>
              <v-container fluid>
                <v-card-title>
                  <span v-if="index === -1">Agregar Usuario</span>
                  <span v-if="index > -1">Editar Usuario</span>
                </v-card-title>
                <v-card-text style="padding-bottom: 0px">
                  <v-row dense>
                    <v-skeleton-loader
                      v-if="loading"
                      type="list-item-two-line"
                    />
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="usuario.nombre"
                        label="Nombre"
                        outlined
                        :error-messages="nombreError"
                        @keypress="Letras($event)"
                        @input="$v.usuario.nombre.$touch()"
                        @blur="$v.usuario.nombre.$touch()"
                      />
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="usuario.apellido"
                        label="apellido"
                        :error-messages="apellidoError"
                        outlined
                        @keypress="Letras($event)"
                        @input="$v.usuario.apellido.$touch()"
                        @blur="$v.usuario.apellido.$touch()"
                      />
                    </v-col>
                    <v-col cols="6" style="padding-bottom: 0px">
                      <v-text-field
                        v-model="usuario.dni"
                        :error-messages="dniError"
                        label="DNI"
                        maxlength="8"
                        counter="8"
                        outlined
                        @input="$v.usuario.dni.$touch()"
                        @blur="$v.usuario.dni.$touch()"
                        @keypress="Numeros($event)"
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-select
                        v-model="usuario.genero"
                        :items="genero"
                        :error-messages="generoError"
                        label="Genero"
                        outlined
                        @keypress="Letras($event)"
                        @input="$v.usuario.genero.$touch()"
                        @blur="$v.usuario.genero.$touch()"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container fluid>
                <v-card-title>
                  Agregar Datos de la tarjeta
                </v-card-title>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="6">
                      <v-text-field
                        v-model="usuario.tarjeta"
                        label="N° de Tarjeta"
                        maxlength="15"
                        counter="15"
                        :error-messages="tarjetaError"
                        outlined
                        @keypress="Numeros($event)"
                        @input="$v.usuario.tarjeta.$touch()"
                        @blur="$v.usuario.tarjeta.$touch()"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="usuario.saldo"
                        label="Dinero Total"
                        :error-messages="saldoError"
                        outlined
                        @keypress="Numeros($event)"
                        @input="$v.usuario.saldo.$touch()"
                        @blur="$v.usuario.saldo.$touch()"
                      />
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="6">
                      <v-text-field
                        v-model="usuario.maxRetiro"
                        :error-messages="maxRetiroError"
                        label="Maximo retiro"
                        outlined
                        @keypress="Numeros($event)"
                        @input="$v.usuario.maxRetiro.$touch()"
                        @blur="$v.usuario.maxRetiro.$touch()"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="usuario.intentos"
                        :error-messages="intentosError"
                        :items="retiros"
                        label="Retiros diarios"
                        outlined
                        @keypress="Letras($event)"
                        @input="$v.usuario.intentos.$touch()"
                        @blur="$v.usuario.intentos.$touch()"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-container>
            </v-tab-item>
          </v-tabs>
          <v-card-actions>
            <v-spacer />
            <v-btn color="success" @click="save()">
              <span v-if="index === -1">Agregar</span>
              <span v-if="index > -1">Editar</span>
            </v-btn>
            <v-btn color="error" outlined @click="close()">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'
import config from '../config'
import formato from '~/plugins/formato'
export default {
  mixins: [validationMixin],
  validations () {
    return {
      usuario: {
        nombre: { required },
        apellido: { required },
        dni: { required, minLength: minLength(8) },
        genero: { required },
        tarjeta: { required, minLength: minLength(15) },
        saldo: { required, between: between(100, 9999) },
        maxRetiro: { required, between: between(1, this.usuario.saldo) },
        intentos: { required }
      }
    }
  },
  props: {
    identificador: { type: String, default: '' },
    modaltabs: { type: Boolean, default: false },
    index: { type: Number, default: -1 }
  },
  data () {
    return {
      loading: false,
      snackbar: false,
      color: '',
      text: '',
      usuario: {
        nombre: '',
        apellido: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
      },
      genero: ['Masculino', 'Femenino'],
      retiros: [1, 2, 3]
    }
  },
  computed: {
    nombreError () {
      const errors = []
      if (!this.$v.usuario.nombre.$dirty) { return errors }
      !this.$v.usuario.nombre.required && errors.push('Nombre es requerido*')
      return errors
    },
    apellidoError () {
      const errors = []
      if (!this.$v.usuario.apellido.$dirty) { return errors }
      !this.$v.usuario.apellido.required && errors.push('apellido es requerido*')
      return errors
    },
    dniError () {
      const errors = []
      if (!this.$v.usuario.dni.$dirty) { return errors }
      !this.$v.usuario.dni.minLength && errors.push('DNI debe tener 8 digitos')
      !this.$v.usuario.dni.required && errors.push('DNI es requerido*')
      return errors
    },
    generoError () {
      const errors = []
      if (!this.$v.usuario.genero.$dirty) { return errors }
      !this.$v.usuario.genero.required && errors.push('Genero es requerido*')
      return errors
    },
    tarjetaError () {
      const errors = []
      if (!this.$v.usuario.tarjeta.$dirty) { return errors }
      !this.$v.usuario.tarjeta.required && errors.push('Tarjeta es requerida*')
      !this.$v.usuario.tarjeta.minLength && errors.push('Tarjeta debe tener 15 digitos*')
      return errors
    },
    saldoError () {
      const errors = []
      if (!this.$v.usuario.saldo.$dirty) { return errors }
      !this.$v.usuario.saldo.required && errors.push('saldo es requerido*')
      !this.$v.usuario.saldo.between && errors.push('Monto debe ser entre 100 y 9999')
      return errors
    },
    maxRetiroError () {
      const errors = []
      if (!this.$v.usuario.maxRetiro.$dirty) { return errors }
      !this.$v.usuario.maxRetiro.between && errors.push('monto no debe exceder el saldo')
      !this.$v.usuario.maxRetiro.required && errors.push('Campo requerido*')
      return errors
    },
    intentosError () {
      const errors = []
      if (!this.$v.usuario.intentos.$dirty) { return errors }
      !this.$v.usuario.intentos.required && errors.push('Campo requerido*')
      return errors
    }
  },
  watch: {
    async identificador (value) {
      console.log(value, 'watch')
      if (value) {
        this.loading = true
        try {
          const data = await axios.get(`${config.URL}usuario/${value}`)
          this.usuario = Object.assign({}, data.data.data)
          this.loading = false
          console.log(data)
        } catch (error) {
          this.loading = false
          console.log(error, 'watch')
        }
      }
    }
  },
  methods: {
    async save () {
      console.log('guardar')
      const self = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('guardar')
        if (self.index > -1) {
          try {
            const data = await axios.put(`${config.URL}usuario/${self.usuario._id}`, self.usuario)
            self.$emit('update', self.usuario)
            this.mensaje(true, 'success', 'Se Actualizó Correctamente')
            console.log(self.usuario, 'update')
            console.log(data, 'update')
            self.close()
          } catch (error) {
            console.log(error, 'update')
          }
        } else {
          try {
            const data = await axios.post(`${config.URL}usuario`, self.usuario)
            self.$emit('save', data.data.data)
            this.mensaje(true, 'success', 'Guardado Correctamente')
            self.close()
          } catch (error) {
            console.log(error.response)
          }
        }
      }
    },
    close () {
      this.$emit('close', false)
      this.$v.$reset()
      this.usuario = {
        nombre: '',
        apellido: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
      }
    },
    Letras (e) {
      formato.letters(e)
    },
    Numeros (e) {
      formato.numbers(e)
    },
    mensaje (snackbar, color, text) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
    }
  }
}
</script>
