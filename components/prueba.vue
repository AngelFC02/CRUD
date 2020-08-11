<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-title>
        <span v-if="index === -1">Guardar</span>
        <span v-if="index > -1">Editar</span>
        <v-spacer />
        <v-btn icon @click="salir()">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="producto.nombre"
          :error-messages="productoError"
          label="Nombre"
          outlined
          @input="$v.producto.nombre.$touch()"
          @blur="$v.producto.nombre.$touch()"
          @keypress="soloLetras($event)"
        />
        <v-select
          v-model="producto.tipo"
          :error-messages="tipoError"
          :items="Tipos"
          label="Tipo"
          outlined
          @input="$v.producto.tipo.$touch()"
          @blur="$v.producto.tipo.$touch()"
        />
        <v-row>
          <v-col>
            <v-text-field
              v-model="producto.marca"
              :error-messages="marcaError"
              label="Marca"
              outlined
              @input="$v.producto.marca.$touch()"
              @blur="$v.producto.marca.$touch()"
              @keypress="soloLetras($event)"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="producto.precio"
              label="Precio"
              :error-messages="precioError"
              outlined
              @input="$v.producto.precio.$touch()"
              @blur="$v.producto.precio.$touch()"
              @keypress="soloNumeros($event)"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="producto.stock"
              type="Number"
              min="0"
              label="Stock"
              outlined
              :error-messages="stockError"
              @input="$v.producto.stock.$touch()"
              @blur="$v.producto.stock.$touch()"
              @keypress="soloNumeros($event)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="success" @click="guardar()">
          <span v-if="index === -1">Guardar</span>
          <span v-if="index > -1">Editar</span>
        </v-btn>
        <v-btn color="error" outlined @click="salir()">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import formato from '../plugins/formato'
import config from '../config'

export default {
  mixins: [validationMixin],
  validations () {
    return {
      producto: {
        nombre: { required, minLength: minLength(2), maxLength: maxLength(50) },
        tipo: { required },
        marca: { required },
        precio: { required },
        stock: { required }
      }
    }
  },
  props: {
    dialog: { type: Boolean, default: false },
    identificador: { type: String, default: '' },
    index: { type: Number, default: -1 }
  },
  data () {
    return {
      Tipos: ['Electrodomestico', 'Movil', 'Computador'],
      producto: {
        nombre: '',
        tipo: '',
        marca: '',
        precio: '',
        stock: ''
      }
    }
  },
  computed: {
    productoError () {
      const errors = []
      if (!this.$v.producto.nombre.$dirty) { return errors }
      !this.$v.producto.nombre.required && errors.push('Nombre es requerido*')
      return errors
    },
    tipoError () {
      const errors = []
      if (!this.$v.producto.tipo.$dirty) { return errors }
      !this.$v.producto.tipo.required && errors.push('Tipo es requerido*')
      return errors
    },
    marcaError () {
      const errors = []
      if (!this.$v.producto.marca.$dirty) { return errors }
      !this.$v.producto.marca.required && errors.push('Marca es requerido*')
      return errors
    },
    precioError () {
      const errors = []
      if (!this.$v.producto.precio.$dirty) { return errors }
      !this.$v.producto.precio.required && errors.push('Precio es requerido*')
      return errors
    },
    stockError () {
      const errors = []
      if (!this.$v.producto.stock.$dirty) { return errors }
      !this.$v.producto.stock.required && errors.push('Stock es requerido*')
      return errors
    }
  },
  watch: {
    async identificador (value) {
      const self = this
      if (value) {
        console.log(value, 'identifcador watch')
        try {
          const data = await axios.get(`${config.URL}producto/${value}`)
          self.producto = Object.assign({}, data.data.producto)
          console.log(data)
        } catch (error) {
          console.log(error, 'watch')
        }
      }
    }
  },
  methods: {
    async guardar () {
      const self = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (self.index > -1) {
          try {
            const data = await axios.put(`${config.URL}producto/${self.producto._id}`, self.producto)
            this.$emit('editar2', self.producto)
            console.log(data)
            self.salir()
          } catch (error) {
            console.log(error, 'put')
          }
        } else {
          try {
            const data = await axios.post(`${config.URL}/producto`, self.producto)
            self.$emit('guardar', data.data.producto)
            self.salir()
          } catch (error) {
            console.log(error, 'post')
          }
        }
      }
    },
    salir () {
      this.$emit('salir', false)
      this.producto = {
        nombre: '',
        tipo: '',
        marca: '',
        precio: '',
        stock: ''
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
