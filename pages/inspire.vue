<template>
  <div>
    <h1>
      <center>
        <span v-if="objeto.num === ''">Tabla Multiplicar</span>
        <span v-if="objeto.num> 0">Tabla del numero {{ objeto.num }}</span>
      </center>
    </h1>
    <v-row>
      <v-col>
        <v-text-field
          v-model="objeto.num"
          placeholder="ingresar numero"
          @keypress="numeros($event)"
          @keypress.enter="multiplicar()"
        />
      </v-col>
      <v-col>
        <v-btn @click="limpiar()">
          limpiar
        </v-btn>
      </v-col>
    </v-row>
    <div v-for="(item, index) in arreglo" :key="index">
      <v-row>
        <v-col cols="2">
          <p>{{ item.num }}</p>
        </v-col>
        <v-col cols="2">
          <v-chip color="success"><p> x </p></v-chip>
        </v-col>
        <v-col cols="2">
          <p>{{ item.multiplicador }}</p>
        </v-col>
        <v-col cols="2">
          <v-chip color="error"><p> = </p></v-chip>
        </v-col>
        <v-col cols="2">
          <p>{{ item.resultado }}</p>
        </v-col>
      </v-row>
      <v-divider />
    </div>
  </div>
</template>

<script>
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      num: 0,
      arreglo: [],
      objeto: {
        num: '',
        multiplicador: 0,
        resultado: 0
      }
    }
  },
  methods: {
    multiplicar () {
      console.log(`tabla del ${this.num}`)
      this.arreglo = []
      if (this.objeto.num === '') {
        alert('ingresar datos')
      } else {
        for (let i = 0; i <= 12; i++) {
          this.objeto.multiplicador = i
          this.objeto.resultado = this.objeto.num * this.objeto.multiplicador
          this.arreglo.push({ num: this.objeto.num, multiplicador: this.objeto.multiplicador, resultado: this.objeto.resultado })
          console.log(`${this.objeto.num} * ${this.objeto.multiplicador} = ${this.objeto.resultado}`)
        }
      }
    },
    numeros (e) {
      formato.numbers(e)
    },
    limpiar () {
      this.objeto.num = ''
      this.arreglo = []
    }
  }
}
</script>
