<template>
  <v-container fluid>
    <dialog-modal
      :dialog="dialog"
      :index="index"
      :identificador="id"
      @salir="salir"
      @guardar="guardar"
      @editar2="editar2"
    />
    <center><h1>Lista de Articulos</h1></center>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="dialog = true">
          agregar
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field prepend-inner-icon="mdi-magnify" outlined />
      </v-col>
    </v-row>
    <v-data-table
      disable-sort
      no-data-text="Aún no hay datos"
      :headers="headers"
      :items="productos"
      :footer-props="{
        'items-per-page-options': rowsPerPageItems, 'items-per-page-text': 'Filas por página',
        pageText: '{0}-{1} de {2}'
      }"
    >
      <template v-slot:item.precio="{ item }">
        {{ `S/${item.precio}` }}
      </template>
      <template v-slot:item.estado="{ item }">
        <v-chip :color="item.estado ? 'success' : 'error'"> {{ item.estado ? 'Activo' : 'Inactivo' }} </v-chip>
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
            <v-list-item @click="editar(item)">
              <v-list-item-title>
                Editar
              </v-list-item-title>
            </v-list-item>
            <v-list-item text @click="eliminar(item)">
              <v-list-item-title>
                Eliminar
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="editarestado(item)">
              <v-list-item-title>
                <span> {{ item.estado ? 'Inhabilitar' : 'Habilitar' }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../config'
import dialogModal from '../components/prueba'
export default {
  components: {
    dialogModal
  },
  async asyncData () {
    const data = await axios.get(`${config.URL}producto`)
    return { productos: data.data.productos }
  },
  data () {
    return {
      id: '',
      index: -1,
      dialog: false,
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Marca', value: 'marca' },
        { text: 'Precio', value: 'precio' },
        { text: 'Stock', value: 'stock' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'acciones' }
      ],
      rowsPerPageItems: [5, 10, 15],
      productos: [],
      producto: {
        nombre: '',
        tipo: '',
        marca: '',
        precio: '',
        stock: ''
      }
    }
  },
  methods: {
    guardar (item) {
      this.productos.push(item)
      this.salir()
    },
    editar (item) {
      this.dialog = true
      this.index = this.productos.indexOf(item)
      this.producto = Object.assign({}, item)
      this.id = item._id
      console.log(this.producto._id)
      console.log(this.index)
    },
    editar2 (value) {
      Object.assign(this.productos[this.index], value)
    },
    async editarestado (item) {
      item.estado = !item.estado
      try {
        const data = await axios.put(`${config.URL}productoEstado/${item._id}`, { estado: item.estado })
        console.log(data)
      } catch (error) {
        console.log(error, 'editar estado')
      }
    },
    eliminar (item) {
      const self = this
      Swal.fire({
        title: 'Seguro que desea Eliminar?',
        text: 'Esta acción no puede revertirse!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then(async (result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            'Campo eliminado correctamente',
            'success'
          )
          this.index = this.productos.indexOf(item)
          try {
            const data = await axios.delete(`${config.URL}producto/${item._id}`)
            self.productos.splice(self.index, 1)
            self.index = -1
            console.log(data)
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    salir (value) {
      this.index = -1
      this.dialog = value
      this.id = ''
    }
  }
}
</script>
