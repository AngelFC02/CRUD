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
                Usuario: {admin}
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
                  placeholder="Ingresar N° de tarjeta"
                  maxlength="15"
                  counter="15"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <v-row>
                <v-col cols="12" style="padding: 0px, 0px, 0px, 0px">
                  <v-btn
                    color="success"
                    depressed
                    @click="confirmar1()"
                    @keypress="numerosValidacion($event)"
                  >
                    confirmar N° de tarjeta
                  </v-btn>
                </v-col>
              </v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="verificarTarjeta"
                  placeholder="DNI"
                  maxlength="8"
                  :disabled="disabled ? true : false"
                  @keypress.enter="dniValidar()"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  min="0"
                  :disabled="disabledMonto ? true : false"
                  placeholder="Monto a retirar"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <v-row>
                <v-col>
                  <v-btn block outlined rounded color="red">
                    cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
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
      disabledMonto: true,
      disabled: true,
      index: -1,
      verificarTarjeta: '',
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
        { nombre: 'angel', Ntarjeta: '123456789012345', dni: '12345678', saldo: '1200' },
        { nombre: 'antonio', Ntarjeta: '012345678901234', dni: '87654321', saldo: '1500' }
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
    Montovalidar () {
      Object.assign(this.usuarios[this.index], this.usuario)
      console.log(this.index)
    },
    dniValidar () {
      Object.assign(this.usuarios[this.index], this.usuario)
      console.log(this.usuario)
      console.log(this.index)
      if (this.usuario.dni === this.verificarTarjeta) {
        this.mensajeAlert(true, 'success', 'Datos validos!!!')
        this.disabledMonto = false
      }
    },
    confirmar1 () {
      console.log('mensaje')
      for (const i of this.usuarios) {
        // console.log(i)

        if (this.usuario.Ntarjeta === i.Ntarjeta) {
          console.log('validado')
          this.disabled = false
          this.index = this.usuarios.indexOf(i)
          this.usuario = Object.assign({}, i)
          console.log(this.index)
          console.log(this.usuario)
          this.mensajeAlert(true, 'success', 'Datos validos!!!')
          console.log(`numero de tarjeta es ${this.usuario.Ntarjeta}`)
        }
      }
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
