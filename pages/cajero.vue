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
                  v-model="usuario.Ntarjeta"
                  type="number"
                  placeholder="Ingresar N° de tarjeta"
                  maxlength="15"
                  counter="15"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <v-row>
                <v-col cols="12">
                  <v-btn color="success" @click="confirmar1()" @keypress="numerosValidacion($event)">
                    confirmar N° de tarjeta
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog">
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
    </v-dialog>
  </div>
</template>

<script>
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      snackbar: false,
      color: '',
      text: '',
      dialog: false,
      dni: '',
      usuario: {
        nombre: '',
        Ntarjeta: '',
        dni: '',
        saldo: ''
      },
      usuarios: [
        { nombre: 'angel', Ntarjeta: '1234567890123454', dni: '12345678', saldo: '1200' },
        { nombre: 'antonio', Ntarjeta: '0123456789012345', dni: '87654321', saldo: '1500' }
      ],
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
    confirmar1 () {
      console.log('mensaje')
      // if (!this.usuario.Ntarjeta === this.usuarios.Ntarjeta) {
      //   console.log('exito')
      //   this.mensajeAlert(true, 'success', 'Datos validos!!!')
      //   this.mensaje = true
      // } else {
      //   this.mensajeAlert(true, 'error', 'Por favor verificar, le queda intentos .')
      // }
    },
    mensajeAlert (snakbar, color, text) {
      this.snackbar = snakbar
      this.color = color
      this.text = text
    }
  }
}
</script>
