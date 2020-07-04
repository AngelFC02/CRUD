<template>
  <div>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <h1><center>CAJERO AUTOMATICO</center></h1>
    <v-card>
      <v-row>
        <v-col cols="6">
          <div>
            <v-card-text>
              <span>
                Asuario: {admin}
              </span>
              <br>
              <br>
              <span>
                Numero de identificacion: {identificacion}
              </span>
              <br>
              <br>
              <span>
                Monto retirado: {Monto}
              </span>
              <br>
              <br>
              <span>
                saldo desponible: {saldo}
              </span>
            </v-card-text>
            <v-card-title>
              Gracias!!
            </v-card-title>
          </div>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Opciones
            </v-card-title>
            <v-card-text>
              <v-col cols="10">
                <v-text-field
                  v-model="usuario.tarjeta"
                  placeholder="Numero de tarjeta"
                  maxlength="15"
                  counter="15"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <div id="app" class="control" @click="mostrar()">
                <v-row>
                  <v-col cols="12" style="padding: 0px, 0px, 0px, 0px">
                    <v-btn v-model="boton" color="success" @click="confirmarTarjeta()" @keypress="numerosValidacion($event)">
                      confirmar tarjeta
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <!--  -->
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
            <!--  -->
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      seen: false,
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
    mostrar () {
      if (!this.usuario.tarjeta) {
        this.mensajeAlert(true, 'error', 'Tarjeta no valida')
      } else {
        this.seen = !this.seen
      }
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
