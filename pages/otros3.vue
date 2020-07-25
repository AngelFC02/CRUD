<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="2000" top>
      {{ text }}
    </v-snackbar>
    <center><h1>Usuarios</h1></center>
    <v-row>
      <v-tabs>
        <v-tab>
          Usuario
        </v-tab>
        <v-tab-item>
          <v-container col>
            <v-card-title>
              Agregar Usuario
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
                <v-col cols="4">
                  <v-select
                    v-model="usuario.genero"
                    :items="genero"
                    label="Genero"
                    outlined
                    @keypress="Letras($event)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-container>
        </v-tab-item>
        <v-tab>
          Tarjeta
        </v-tab>
        <v-tab-item>
          <v-container>
            <v-card-title>
              Agregar Datos de la tarjeta
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="usuario.tarjeta"
                    label="N° de Tarjeta"
                    maxlength="15"
                    counter="15"
                    outlined
                    @keypress="Numeros($event)"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="usuario.saldo"
                    label="Dinero Total"
                    outlined
                    @keypress="Numeros($event)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="usuario.maxRetiro"
                    label="Maximo retiro"
                    outlined
                    @keypress="Numeros($event)"
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="usuario.intentos"
                    :items="retiros"
                    label="Numero de retiros diarios"
                    outlined
                    @keypress="Letras($event)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="Agregar()">
                Agregar
              </v-btn>
              <v-btn color="error" outlined @click="Salir()">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
    />
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
        { text: 'Intentos', value: 'intentos' }
      ],
      usuarios: [
        { name: 'Angel', lastname: 'Cuya', dni: '12345678', tarjeta: '12345678', genero: 'masculino', saldo: 1200, maxRetiro: 100, retiro: null, intentos: 3, fecha: null }
      ],
      usuario: {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
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
      } else if (this.index === -1) {
        if (!this.usuario.name ||
            !this.usuario.lastname ||
            !this.usuario.dni ||
            !this.usuario.genero ||
            !this.usuario.tarjeta ||
            !this.usuario.saldo ||
            !this.usuario.maxRetiro ||
            !this.usuario.intentos) {
          this.Mensaje(true, 'error', 'Completar los Campos faltantes!!')
          console.log('ingresar datos')
        } else {
          this.usuarios.push(this.usuario)
          this.Mensaje(true, 'success', 'Agregado Correctamente!!')
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
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
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
