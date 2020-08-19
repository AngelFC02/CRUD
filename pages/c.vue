<template>
  <v-container>
    <v-dialog v-model="dialogo" width="600">
      <v-card>
        <v-card-title>
          agrear ser humano
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="objeto.nombre" label="nombre" placeholder="Nombre" outlined />
          <v-select v-model="objeto.genero" :items="genero" outlined />
          <v-text-field v-model="objeto.edad" label="edad" outlined />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="fabiolaSave()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="warning" @click="dialogo = true">hola</v-btn>
    <v-data-table
      :headers="headers"
      :items="arreglo"
      no-data-text="no nada nada :v"
      :footer-props="{
        'items-per-page-options': rowsPerPageItems,
        'items-per-page-text': 'Filas por pagina',
        pageText: '{0}-{0} de {1}'
      }"
    />
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      rowsPerPageItems: [5, 10, 15],
      genero: ['masculino', 'femenino'],
      dialogo: false,
      headers: [
        { text: 'nombre', value: 'nombre' },
        { text: 'genero', value: 'genero' },
        { text: 'edad', value: 'edad' }
      ],
      arreglo: [
        { nombre: 'fabiola', genero: 'trans', edad: '20' },
        { nombre: 'angel', genero: 'macho', edad: '22' }
      ],
      objeto: {
        nombre: '',
        genero: '',
        edad: ''
      }
    }
  },
  methods: {
    fabiolaSave () {
      this.arreglo.push(this.objeto)
      this.dialogo = false
    }
  }
}
</script>
