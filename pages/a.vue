<template>
  <v-container fluid>
    <!-- <v-btn
      :disabled="show ? true : false"
      @click="mostrar()"
    >
      mostrar
    </v-btn>
    <v-btn
      :disabled="hide ? true : false"
      @click="ocultar()"
    >
      ocultar
    </v-btn> -->
    <v-btn @click="change">
      Mostrar/Ocultar
    </v-btn>
    <ul v-if="datos">
      <li v-for="(item, index) in tvShows" :key="index">
        <strong>
          {{ item.name }} -{{ item.season }} temporadas
        </strong>
      </li>
    </ul>
    <div v-else>
      no hay datos
    </div>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      datos: false,
      hide: true,
      show: false,
      tvShows: [
        { name: 'Breaking Bad', season: '6' },
        { name: 'The Boys', season: '1' },
        { name: 'the Flash', season: '1' },
        { name: 'One Punch-Man', season: '2' }
      ]
    }
  },
  methods: {
    change () {
      this.datos = !this.datos
    }
  //   mostrar () {
  //     this.show = true
  //     this.hide = false
  //     this.datos = true
  //   },
  //   ocultar () {
  //     this.hide = true
  //     this.show = false
  //     this.datos = false
  //   }
  }
}
</script>
