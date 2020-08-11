<template>
  <v-dialog v-model="dialogo" max-width="500" persistent>
    <v-card>
      <v-card-title>
        <span v-if="index > -1">Editar Datos</span>
        <span v-if="index === -1">Guardar Datos</span>
        <v-spacer />
        <v-btn icon color @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cliente.nombre"
              :error-messages="nombreError"
              outlined
              label="Nombre"
              required
              @keypress="soloLetras($event)"
              @input="$v.cliente.nombre.$touch()"
              @blur="$v.cliente.nombre.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cliente.apellido"
              :error-messages="apellidoError"
              outlined
              label="Apellido"
              @keypress="soloLetras($event)"
              @input="$v.cliente.apellido.$touch()"
              @blur="$v.cliente.apellido.$touch()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="cliente.edad"
              outlined
              label="Edad"
              maxlength="2"
              :error-messages="edadError"
              @keypress="soloNumeros($event)"
              @input="$v.cliente.edad.$touch()"
              @blur="$v.cliente.edad.$touch()"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="cliente.dni"
              placeholder="DNI"
              outlined
              counter="8"
              maxlength="8"
              :error-messages="dniError"
              @keypress="soloNumeros($event)"
              @input="$v.cliente.dni.$touch()"
              @blur="$v.cliente.dni.$touch()"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="success" @click="save()">
          <span v-if="index > -1">Actualizar</span>
          <span v-if="index === -1">Guardar</span>
        </v-btn>
        <v-btn color="error" outlined @click="close()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import config from '../config'
import formato from '~/plugins/formato'
export default {
  mixins: [validationMixin],
  validations () {
    return {
      cliente: {
        nombre: { required, minLength: minLength(2), maxLength: maxLength(50) },
        apellido: { required, minLength: minLength(2), maxLength: maxLength(50) },
        edad: { required, minLength: minLength(2), between: between(18, 99) },
        dni: { required, minLength: minLength(8) }
      }
    }
  },
  props: {
    identificador: { type: String, default: '' },
    dialogo: { type: Boolean, default: false },
    index: { type: Number, default: -1 }
  },
  data () {
    return {
      cliente: {
        nombre: '',
        apellido: '',
        edad: '',
        dni: ''
      }
    }
  },
  computed: {
    nombreError () {
      const errors = []
      if (!this.$v.cliente.nombre.$dirty) { return errors }
      !this.$v.cliente.nombre.minLength && errors.push('El nombre debe tener como mínimo 1 caracter*')
      !this.$v.cliente.nombre.maxLength && errors.push('El nombre debe tener como máximo 50 caracteres*')
      !this.$v.cliente.nombre.required && errors.push('Se requiere un nombre*')
      return errors
    },
    apellidoError () {
      const errors = []
      if (!this.$v.cliente.apellido.$dirty) { return errors }
      !this.$v.cliente.apellido.minLength && errors.push('El apellido debe tener como mínimo 1 caracteres*')
      !this.$v.cliente.apellido.maxLength && errors.push('El nombre debe tener como maximo 50 caracteres*')
      !this.$v.cliente.apellido.required && errors.push('Se requiere un nombre*')
      return errors
    },
    edadError () {
      const errors = []
      if (!this.$v.cliente.edad.$dirty) { return errors }
      !this.$v.cliente.edad.minLength && errors.push('Un minimo de 2 digitos*')
      !this.$v.cliente.edad.between && errors.push('Debe ser mayor a 18 años*')
      !this.$v.cliente.edad.required && errors.push('Edad es requerido*')
      return errors
    },
    dniError () {
      const errors = []
      if (!this.$v.cliente.dni.$dirty) { return errors }
      !this.$v.cliente.dni.minLength && errors.push('El DNI debe tener como mínimo 8 caracteres*')
      !this.$v.cliente.dni.required && errors.push('El DNI es requerido*')
      return errors
    }
  },
  watch: {
    async identificador (value) {
      const self = this
      console.log(value, 'identificador watch')
      if (value) {
        try {
          const data = await axios.get(`${config.URL}cliente/${value}`)
          self.cliente = Object.assign({}, data.data.cliente)
        } catch (error) {
          console.log(error, 'error wath')
        }
      }
    }
  },
  methods: {
    async save () {
      const self = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (self.index > -1) {
          try {
            const data = await axios.put(`${config.URL}cliente/${self.cliente._id}`, self.cliente)
            self.$emit('update', self.cliente)
            console.log(self.cliente._id, 'componente')
            console.log(data.data.cliente, 'update compone')
            self.close()
          } catch (error) {
            console.log(error, 'update')
          }
        } else {
          try {
            const data = await axios.post(`${config.URL}cliente`, self.cliente)
            self.$emit('save', data.data.cliente)
            console.log(data.data.cliente, 'save compone')
            self.close()
          } catch (error) {
            console.log(error, 'save')
          }
        }
      }
    },
    close () {
      this.$emit('close', false)
      this.cliente = {
        nombre: '',
        apellido: '',
        edad: '',
        dni: ''
      }
      this.$v.$reset()
    },
    soloLetras (e) {
      formato.letters(e)
    },
    soloNumeros (e) {
      formato.numbers(e)
    }
  }
}
</script>
