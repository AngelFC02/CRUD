<template>
  <v-container fluid>
    <v-data-table :items="usuario" :headers="headers">
      <template v-slot:item.fecha="{item}">
        {{ formatFecha(item.fecha) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'dinero', value: 'dinero' },
        { text: 'fecha', value: 'fecha' }
      ],
      usuario: [
        { nombre: 'angel', reporte: [{ fecha: '' }] }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>
