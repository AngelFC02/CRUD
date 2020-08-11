<template>
  <v-container
    fluid
  >
    <dialog-modal :dialog="dialog" :index="index" @salir="salir" @agregar="agregar" />
    <v-snackbar v-model="snackbar" :color="color" :timeout="2000" top centered>
      {{ text }}
    </v-snackbar>
    <center>
      <h1>
        Registro de Usuarios
      </h1>
    </center>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-row>
            <v-btn
              color="primary"
              style="margin: 10px 0px 0px 15px"
              @click="Activar()"
            >
              agregar
            </v-btn>
            <v-spacer />
            <v-text-field
              v-model="buscar"
              append-icon="mdi-magnify"
              label="Buscar"
              outlined
              single-line
              hide-details
            />
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="usuarios"
          :items-per-page="5"
          class="elevation-1"
          :search="buscar"
          disable-sort
          no-data-text="Aún no hay datos disponibles"
          no-results-text="No se encontraron resultados"
          :footer-props="{
            'items-per-page-options': rowsPerPageItems,
            'items-per-page-text': 'Filas por pagina'
          }"
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
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import Swal from 'sweetalert2'
import dialogModal from '../components/crudCajero'
export default {
  components: {
    dialogModal
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
      genero: ['Masculino', 'Femenino'],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'lastname' },
        { text: 'DNI', value: 'dni' },
        { text: 'N° de tarjeta', value: 'tarjeta' },
        { text: 'Genero', value: 'genero' },
        { text: 'Saldo', value: 'saldo' },
        { text: 'Fecha Incripción', value: 'fecha' },
        { text: 'Acciones', value: 'acciones' }
      ],
      usuarios: [],
      usuario: {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: ''
      },
      buscar: ''
    }
  },
  methods: {
    agregar (item) {
      this.dialog = false
      this.usuarios.push(item)
    },
    Editar (item) {
      this.dialog = true
      this.index = this.usuarios.indexOf(item)
      this.usuario = Object.assign({}, item)
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
    salir () {
      this.Mensaje(true, 'warning', 'No se efectuaron cambios!!')
      this.index = -1
      this.dialog = false
      this.usuario = {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: ''
      }
    },
    Mensaje (snackbar, color, text) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
    },
    Activar () {
      this.dialog = true
    }
  }
}
</script>
