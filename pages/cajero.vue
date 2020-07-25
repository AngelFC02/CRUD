<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="2000" top>
      {{ text }}
    </v-snackbar>
    <modal :modaltabs="dialog" @close="salir" @save="guardar" />
    <center><h1>Usuarios</h1></center>
    <v-row>
      <v-spacer />
      <v-btn color="primary" style="margin-right: 10px" @click="dialog = true">
        agregar
      </v-btn>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      no-data-text="Aún no hay Datos"
      :footer-props="{ 'items-per-page-options': rowsPerPageItems, 'items-per-page-text': 'Filas por página:', pageText: '{0}-{1} de {2}' }"
    >
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
                <v-btn icon @click="Editar(item)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn icon @click="Eliminar(item)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
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
import modal from '~/components/modalTabs'

export default {
  components: {
    modal
  },
  // mounted () {
  //   const self = this
  //   axios.get(`${config.URL}/usuario`)
  //     .then(function (response) {
  //       self.usuarios = response.data.usuarios
  //       console.log(response.data)
  //     })
  //     .catch(error => console.log(error))
  // },
  async asyncData ({ params }) {
    try {
      const usuarios = await axios.get(`${config.URL}usuario`)
      return { usuarios: usuarios.data.usuarios }
    } catch (error) {
      console.log(error, 'error')
    }
  },
  data () {
    return {
      snackbar: false,
      color: '',
      text: '',
      accion: false,
      index: -1,
      dialog: false,
      rowsPerPageItems: [5, 10, 15],
      retiros: ['1', '2', '3', '4'],
      genero: ['Masculino', 'Femenino'],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'lastname' },
        { text: 'DNI', value: 'dni' },
        { text: 'N° de tarjeta', value: 'tarjeta' },
        { text: 'Genero', value: 'genero' },
        { text: 'Saldo', value: 'saldo' },
        { text: 'Maximo Retiro', value: 'maxRetiro' },
        { text: 'Intentos', value: 'intentos' },
        { text: 'fecha de creado', value: 'fecha' },
        { text: 'Acciones', value: 'acciones' }
      ],
      usuarios: [],
      usuario: { },
      buscar: ''
    }
  },
  methods: {
    guardar (item) {
      this.usuario = Object.assign({}, item)
      this.usuarios.push(this.usuario)
      // if (this.index > -1) {
      //   Object.assign(this.usuarios[this.index], this.usuario)
      //   console.log('acualizado')
      //   this.Mensaje(true, 'success', 'Actualizado Correctamente!!')
      // } else if (this.index === -1) {
      //   if (!this.usuario.name ||
      //       !this.usuario.lastname ||
      //       !this.usuario.dni ||
      //       !this.usuario.genero ||
      //       !this.usuario.tarjeta ||
      //       !this.usuario.saldo ||
      //       !this.usuario.maxRetiro ||
      //       !this.usuario.intentos) {
      //     this.Mensaje(true, 'error', 'Completar los Campos faltantes!!')
      //     console.log('ingresar datos')
      //   } else {
      //     this.usuarios.push(this.usuario)
      //     this.Mensaje(true, 'success', 'Agregado Correctamente!!')
      //     console.log(this.index)
      //   }
      // }
    },
    Editar (item) {
      this.dialog = true
      this.index = this.usuarios.indexOf(item)
      this.usuario = Object.assign({}, item)
      console.log(item)
      console.log(this.index)
    },
    Eliminar (item) {
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: 'Esta acción no podrá ser revertida',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'primary',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Eliminado!',
            'El campo ha sido eliminado correctamente.',
            'success'
          )
          this.index = this.usuarios.indexOf(item)
          this.usuarios.splice(this.index, 1)
          this.index = -1
          console.log(this.index)
          console.log(item)
        } else {
        }
      })
    },
    salir (value) {
      console.log(value, 'llego')
      this.dialog = value
      // this.Mensaje(true, 'warning', 'No se efectuaron cambios!!')
      // this.index = -1
      // this.usuario = {
      //   name: '',
      //   lastname: '',
      //   dni: '',
      //   tarjeta: '',
      //   genero: '',
      //   saldo: '',
      //   maxRetiro: '',
      //   retiro: '',
      //   intentos: ''
      // }
    },
    Mensaje (snackbar, color, text) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
    }
  }
}
</script>
