<template>
  <div>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <cliente-modal
      :dialogo="dialogo"
      :index="index"
      :identificador="id"
      @close="close"
      @save="save"
      @update="update"
    />
    <h1><center>Lista de Trabajadores</center></h1>
    <v-btn text @click="activar()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="clientes"
      :items-per-page="5"
      no-data-text="Aún no hay datos"
      class="elevation-1"
      :footer-props="{
        'items-per-page-options': rowsPerPageItems,
        'items-per-page-text': 'Filas por pagina',
        pageText: '{0}-{0} de {1}'
      }"
    >
      <template v-slot:item.estado="{ item }">
        <v-chip :color="item.estado ? 'success': 'error'"> {{ item.estado ? 'Activo': 'Inactivo' }}</v-chip>
      </template>
      <template v-slot:item.fecha="{item}">
        {{ formatFecha(item.fecha) }}
      </template>
      <template v-slot:item.acciones="{ item }">
        {{ item.acciones }}
        <v-menu lef>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn icon @click="editar(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn icon @click="eliminar(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn text @click="editarEstado(item)">
                  <span v-if="item.estado === true">Inhabilitar</span>
                  <span v-if="item.estado === false">Habilitar</span>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>
<script>

import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../config'
import clienteModal from '~/components/cliente'
export default {
  components: {
    clienteModal
  },
  async asyncData () {
    try {
      const data = await axios.get(`${config.URL}cliente`)
      return { clientes: data.data.cliente }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      rowsPerPageItems: [5, 10, 15],
      index: -1,
      snackbar: false,
      color: '',
      text: '',
      dialogo: false,
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido', value: 'apellido' },
        { text: 'Edad', value: 'edad' },
        { text: 'DNI', value: 'dni' },
        { text: 'Estado', value: 'estado' },
        { text: 'Fecha Inscripcion', value: 'fecha' },
        { text: 'Acciones', value: 'acciones' }
      ],
      clientes: [],
      id: ''
    }
  },
  methods: {
    save (item) {
      this.clientes.push(item)
      this.close()
      this.mensaje(true, 'success', 'Datos guardados correctamente!!!')
      console.log(this.clientes, 'save page')
      console.log(item, 'save page')
    },
    update (value) {
      Object.assign(this.clientes[this.index], value)
    },
    editar (item) {
      this.index = this.clientes.indexOf(item)
      this.cliente = Object.assign({}, item)
      this.id = item._id
      console.log(this.cliente._id)
      this.activar()
    },
    async editarEstado (item) {
      // const self = this
      item.estado = !item.estado
      try {
        const data = await axios.put(`${config.URL}estado/${item._id}`, { estado: item.estado })
        console.log(item.estado)
        console.log(data)
      } catch (error) {
        console.log(error, 'update estado')
      }
      console.log(item)
    },
    eliminar (item) {
      const self = this
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            'El campo ha sido eliminado correctamente.',
            'success'
          )
          self.index = self.clientes.indexOf(item)
          try {
            const data = await axios.delete(`${config.URL}cliente/${item._id}`)
            self.clientes.splice(self.index, 1)
            self.index = -1
            console.log(data)
          } catch (error) {
            self.index = -1
            console.log(error, 'error delete')
          }
        }
      })
      // this.index = this.clientes.indexOf(item)
      // this.clientes.splice(this.index, 1)
    },
    formatFecha (value) {
      const date = new Date(value)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      if (month < 10) {
        // console.log(`${day}-0${month}-${year}`)
        return `${day}-0${month}-${year}`
      } else {
        // console.log(`${day}-${month}-${year}`)
        return `${day}-${month}-${year}`
      }
    },
    activar () {
      this.dialogo = true
    },
    close (value) {
      this.id = ''
      this.dialogo = false
      this.index = -1
      this.cliente = {
        nombre: '',
        apellido: '',
        edad: ''
      }
      this.mensaje(true, 'error', 'No se efectuaron cambios . . .')
    },
    mensaje (snackbar, color, text) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
    }
  }
}
</script>
