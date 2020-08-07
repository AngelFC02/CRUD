<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-title>
        Agregar
        <v-spacer />
        <v-btn icon @click="salir()">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="producto.nombre" label="Nombre" outlined />
        <v-select v-model="producto.tipo" :items="Tipos" label="Tipo" outlined />
        <v-row>
          <v-col>
            <v-text-field v-model="producto.marca" label="Marca" outlined />
          </v-col>
          <v-col>
            <v-text-field v-model="producto.precio" label="Precio" outlined />
          </v-col>
          <v-col>
            <v-text-field
              v-model="producto.stock"
              type="Number"
              min="0"
              label="Stock"
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="success" @click="guardar()">
          Guardar
        </v-btn>
        <v-btn color="error" outlined @click="salir()">
          Salir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from 'axios'
import config from '../config'
export default {
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
  watch: {
    async identificador (value) {
      const self = this
      console.log(value, 'identifcador watch')
      try {
        const data = await axios.get(`${config.URL}producto/${value}`)
        self.producto = Object.assign({}, data.data.producto)
        console.log(data)
      } catch (error) {
        console.log(error, 'watch')
      }
    }
  },
  methods: {
    async guardar () {
      const self = this
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
        } catch (error) {
          console.log(error, 'post')
        }
      }
    },
    salir () {
      this.$emit('salir', false)
    }
  }
}
</script>
