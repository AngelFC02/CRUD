<template>
  <div>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <h1><center>Lista de Trabajadores</center></h1>
    <v-btn @click="activar()">
      <v-icon>mdi-cat</v-icon>
    </v-btn>
    <v-dialog v-model="dialogo" max-width="500" persistent>
      <v-card>
        <v-card-title>
          <span v-if="index > -1">Editar datos</span>
          <span v-if="index === -1">Agregar datos</span>
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
              <v-text-field v-model="persona.edad" label="Edad" @keypress="soloNumeros($event)" />
            </v-col>
            <v-col cols="6">
              <h3>Estado</h3>
              <v-checkbox v-model="persona.estado" :label="persona.estado ? 'Activo': 'Inactivo'" />
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
      <template v-slot:item.estado="{ item }">
        <v-chip :color="item.estado ? 'success': 'error'"> {{ item.estado ? 'Activo': 'Inactivo' }}</v-chip>
      </template>
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
  </div>
</template>
<script>
import formato from '~/plugins/formato'
export default {
  data () {
    return {
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
        { text: 'Estado', value: 'estado' },
        { text: 'Acciones', value: 'acciones' }
      ],
      personas: [
        { nombre: 'angel', apellido: 'franquina', edad: '22', estado: true },
        { nombre: 'antonio', apellido: 'cuya', edad: '23', estado: false }],
      persona: {
        nombre: '',
        apellido: '',
        edad: '',
        estado: false
      }
    }
  },
  methods: {
    agregar () {
      if (this.index > -1) {
        Object.assign(this.personas[this.index], this.persona)
        this.mensaje(true, 'success', 'Datos Actualizados correctamente!!!')
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
          this.personas.push(this.persona)
          this.mensaje(true, 'success', 'Datos guardados correctamente!!!')
          this.salir()
        }
      }
    },
    editar (item) {
      this.index = this.personas.indexOf(item)
      this.persona = Object.assign({}, item)
      console.log(this.index)
      this.activar()
    },
    eliminar (item) {
      this.index = this.personas.indexOf(item)
      this.personas.splice(this.index, 1)
    },
    limpiar () {
      this.persona = {
        nombre: '',
        apellido: '',
        edada: ''

      }
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
      this.mensaje(true, 'error', 'no se efectuaron cambios')
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
