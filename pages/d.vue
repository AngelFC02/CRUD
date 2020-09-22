<template>
  <v-container fluid>
    as
  </v-container>
</template>

<script>
import axios from 'axios'
// import ruta from '../pokemonApi'
export default {
  async asyncData () {
    try {
      const data = await axios.get('https://pokeapi.co/api/v2/pokemon/1')
      return { pokemon: data }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      pokemon: []
    }
  }
}
</script>
