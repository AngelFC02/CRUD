<template>
  <v-container
    fluid
  >
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
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title style="margin-bottom: 10px">
          <span v-if="index === -1">Agregar Usuario</span>
          <span v-if="index > -1">Editar Usuario</span>
          <v-spacer />
          <v-btn icon @click="Salir()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text style="padding-bottom: 0px">
          <v-text-field v-model="usuario.name" label="Nombre" outlined @keypress="Letras($event)" />
          <v-text-field v-model="usuario.lastname" label="Apellido" outlined @keypress="Letras($event)" />
          <v-row>
            <v-col cols="6" style="padding-bottom: 0px">
              <v-text-field
                v-model="usuario.dni"
                label="DNI"
                maxlength="8"
                counter="8"
                outlined
                @keypress="Numeros($event)"
              />
            </v-col>
            <v-spacer />
            <v-col cols="6" style="padding-bottom: 0px">
              <v-text-field
                v-model="usuario.tarjeta"
                label="N° de Tarjeta"
                maxlength="15"
                counter="15"
                outlined
                @keypress="Numeros($event)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" style="padding: 0px 0px 0px 10px">
              <v-select
                v-model="usuario.genero"
                :items="genero"
                label="Genero"
                outlined
                @keypress="Letras($event)"
              />
            </v-col>
            <v-spacer />
            <v-col cols="6" style="padding-top: 0px">
              <v-text-field
                v-model="usuario.saldo"
                label="Dinero Total"
                outlined
                @keypress="Numeros($event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions style="margin-top: 10px">
          <v-spacer />
          <v-btn
            color="success"
            style="margin-right: 15px"
            @click="Agregar()"
          >
            <span v-if="index === -1">Agregar</span>
            <span v-if="index > -1">Editar</span>
          </v-btn>
          <v-btn outlined color="red" style="margin-right: 15px" @click="Salir()">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Swal from 'sweetalert2'
import formato from '~/plugins/formato'
export default {
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
      usuarios: [
        { name: 'Angel', lastname: 'Cuya', dni: '12345678', tarjeta: '12345678', genero: 'masculino', saldo: 1200, fecha: ' / / ' },
        { name: 'Antonio', lastname: 'Franquina', dni: '12345678', tarjeta: '87654321', genero: 'masculino', saldo: 1200, fecha: ' / / ' }
      ],
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
    Agregar () {
      if (this.index > -1) {
        Object.assign(this.usuarios[this.index], this.usuario)
        console.log('acualizado')
        this.Mensaje(true, 'success', 'Actualizado Correctamente!!')
        this.Salir()
      } else if (this.index === -1) {
        if (!this.usuario.name ||
            !this.usuario.lastname ||
            !this.usuario.dni ||
            !this.usuario.genero ||
            !this.usuario.tarjeta ||
            !this.usuario.saldo) {
          this.Mensaje(true, 'error', 'Completar los Campos faltantes!!')
          console.log('ingresar datos')
        } else {
          this.usuarios.push(this.usuario)
          this.Mensaje(true, 'success', 'Agregado Correctamente!!')
          this.Salir()
          console.log(this.index)
        }
      }
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
    Salir () {
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
    },
    Letras (e) {
      formato.letters(e)
    },
    Numeros (e) {
      formato.numbers(e)
    }
  }
}
</script>
