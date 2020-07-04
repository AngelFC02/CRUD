<template>
  <div id="wrapper">
    <div id="app" class="control" @click="seen = !seen">
      <v-btn>confiermar</v-btn>
    </div>

    <div v-if="seen" id="hide">
      <v-col cols="10">
        <v-text-field
          v-model="usuario.dni"
          placeholder="DNI"
          maxlength="8"
          @keypress="numerosValidacion($event)"
        />
      </v-col>
      <v-col>
        <v-text-field type="number" min="0" placeholder="Monto a retirar" @keypress="numerosValidacion($event)" />
      </v-col>
      <v-row>
        <v-col>
          <v-btn>
            cancelar
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      seen: true,
      otros: false,
      boton: true,
      snackbar: false,
      color: '',
      text: '',
      show1: false,
      dni: '',
      usuario: {
        nombre: '',
        tarjeta: '',
        dni: '',
        saldo: ''
      },
      mensaje: false
    }
  },
  methods: {
    numerosValidacion (e) {
      formato.numbers(e)
    },
    salir () {
      this.mensaje = false
    },
    // confirmar1 (i) {
    //   if (!this.usuario.tarjeta || !this.usuario.dni) {
    //     console.log('error')
    //     this.mensajeAlert(true, 'error', `Por favor verificar, le queda ${i} intentos .`)
    //     // for (let i = 3; i >= 0; i--) {
    //     //   console.log(i)
    //     //   this.mensajeAlert(true, 'error', `Por favor verificar, le queda ${i} intentos .`)
    //     // }
    //   } else {
    //     this.mensajeAlert(true, 'success', 'Datos validos!!!')
    //     this.mensaje = true
    //   }
    // },
    confirmarTarjeta () {
      console.log('hola')
    },
    mensajeAlert (snakbar, color, text) {
      this.snackbar = snakbar
      this.color = color
      this.text = text
    }
  }
}
</script>
