<template>
  <v-container>
    <!-- <modal-tab :modaltabs="dialog" @close="salir" @save="save" />
    <v-btn @click="dialog = true">
      agregar
    </v-btn>
    <span>
      {{ persona }}
    </span>
    <v-spacer />
    <span>
      {{ personas }}
    </span> -->
    <prueba :numeros="1000" />
  </v-container>
</template>
<script>
// import modalTab from '~/components/modalTabs'
import prueba from '~/components/prueba'
export default {
  components: {
    // modalTab
    prueba
  },
  data () {
    return {
      dialog: false,
      persona: {},
      personas: []
    }
  },
  methods: {
    salir (value) {
      this.dialog = value
    },
    save (item) {
      this.persona = Object.assign({}, item)
      this.personas.push(this.persona)
      this.salir()
    }
  }
}
</script>
