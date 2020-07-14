/*Suponga usted que tiene una tienda y desea registrar las ventas en su computadora
Diseñe un algoritmo que lea por cada cliente el monto total de su compra .
Al final del día que escriba la cantidad total de ventas y el número de clientes atendidos*/
<template>
  <div>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <h1><center>Lista de clientes</center></h1>
    <v-btn text @click="activar()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialogo" max-width="500" persistent>
      <v-card>
        <v-card-title>
          <span v-if="index > -1">Editar Datos</span>
          <span v-if="index === -1">Agregar Datos</span>
          <v-spacer />
          <v-btn icon color @click="sincambios()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="persona.nombre"
                label="Nombre"
                @keypress="soloLetras($event)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="persona.apellido"
                label="Apellido"
                @keypress="soloLetras($event)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="persona.edad" label="Edad" maxlength="2" @keypress="soloNumeros($event)" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="persona.ventaDia" label="venta del dia" @keypress="soloNumeros($event)" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="agregar()">
            <span v-if="index > -1">Actualizar</span>
            <span v-if="index === -1">Agregar</span>
          </v-btn>
          <v-btn @click="sincambios()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="personas"
      :items-per-page="5"
      class="elevation-1"
      :footer-props="{
        'items-per-page-options': rowsPerPageItems,
        'items-per-page-text': 'Filas por pagina'
      }"
    >
      <template v-slot:item.acciones="{ item }">
        {{ item.acciones }}
        <v-btn icon @click="editar(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="eliminar(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <span>
      total de venta por dia
    </span>
    <v-container>
      <v-btn @click="sumar()">
        calcular
      </v-btn>
      <span>
        {{ total }}
      </span>
    </v-container>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      total: null,
      sumas: null,
      rowsPerPageItems: [5, 10, 15],
      index: -1,
      snackbar: false,
      color: '',
      text: '',
      dialogo: false,
      headers: [
        {
          text: 'Nombre',
          value: 'nombre'
        },
        { text: 'Apellido', value: 'apellido' },
        { text: 'Edad', value: 'edad' },
        { text: 'Venta por dia', value: 'ventaDia' },
        { text: 'Acciones', value: 'acciones' }
      ],
      personas: [
        { nombre: 'angel', apellido: 'franquina', edad: '22', ventaDia: 100 },
        { nombre: 'antonio', apellido: 'cuya', edad: '23', ventaDia: 200 }],
      persona: {
        nombre: '',
        apellido: '',
        edad: '',
        ventaDia: null
      }
    }
  },
  methods: {
    sumar () {
      this.total = 0
      for (const i of this.personas) {
        console.log(i.ventaDia)
        parseInt(i.ventaDia)
        this.total += i.ventaDia
        console.log(this.total)
      }
    },
    agregar () {
      if (this.index > -1) {
        Object.assign(this.personas[this.index], this.persona)
        this.mensaje(true, 'success', 'Datos Actualizados correctamente!!!')
        console.log(this.personas)
        this.salir()
      } else if (this.index === -1) {
        if (
          !this.persona.nombre ||
          !this.persona.apellido ||
          !this.persona.edad
        ) {
          console.log('agregado')
          this.mensaje(true, 'error', 'Por Favor Ingresa Datos!!!')
        } else {
          this.persona.ventaDia = parseInt(this.persona.ventaDia)
          this.personas.push(this.persona)
          console.log(this.personas)
          this.mensaje(true, 'success', 'Datos guardados correctamente!!!')
          this.salir()
        }
      }
    },
    editar (item) {
      this.index = this.personas.indexOf(item)
      this.persona = Object.assign({}, item)
      console.log(this.index)
      console.log(this.personas)
      this.activar()
    },
    eliminar (item) {
      Swal.fire({
        title: '¿Está seguro que desea eliminar?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
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
          this.index = this.personas.indexOf(item)
          this.personas.splice(this.index, 1)
          this.index = -1
        } else {
        }
      })
      // this.index = this.personas.indexOf(item)
      // this.personas.splice(this.index, 1)
    },
    activar () {
      this.dialogo = true
    },
    sincambios () {
      this.dialogo = false
      this.persona = {
        nombre: '',
        apellido: '',
        edad: ''
      }
      this.mensaje(true, 'error', 'No se efectuaron cambios . . .')
      this.index = -1
    },
    salir () {
      this.dialogo = false
      this.persona = {
        nombre: '',
        apellido: '',
        edad: ''
      }
    },
    mensaje (snackbar, color, text) {
      this.snackbar = snackbar
      this.color = color
      this.text = text
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
