<template>
  <v-container>
    <v-card v-model="f">
      {{ numero }}
    </v-card>
    <v-card>
      {{ numeros }}
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    numeros: { type: Number, default: 0 }
  },
  data () {
    return {
      numero: 4
    }
  }
}
</script>
