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
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="usuario.Ntarjeta"
                    label="Ingresar N° de tarjeta"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    maxlength="15"
                    counter="15"
                    @click:append="show1 = !show1"
                    @keypress="numerosValidacion($event)"
                  />
                </v-col>
                <v-col cols="3" style="padding: 0px, 0px, 0px, 0px">
                  <v-btn
                    color="success"
                    depressed
                    @click="confirmar1()"
                    @keypress="numerosValidacion($event)"
                  >
                    <v-icon>
                      mdi-send
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="verificarDNI"
                  label="DNI"
                  maxlength="8"
                  :disabled="disabled ? true : false"
                  @keypress.enter="dniValidar()"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="usuario.retiro"
                  type="number"
                  min="0"
                  :max="usuario.maxretiro"
                  :disabled="disabledMonto ? true : false"
                  label="Monto a retirar"
                  @click="PreguntaRetiro()"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <div v-if="seen" id="hide">
                <v-row>
                  <v-col>
                    <center>
                      <p>Solo Se Podra Retirar el 40% del Monto</p>
                    </center>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>Saldo total: {{ usuario.saldo }}</p>
                  </v-col>
                  <v-col>
                    <p>Maximo Monto a Retirar: {{ usuario.maxretiro }} </p>
                  </v-col>
                </v-row>
              </div>
              <v-row>
                <v-col>
                  <v-btn :disabled="disableboton ? true : false" rounded color="success" @click="ConfirmarRetiro()">
                    Retirar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn rounded outlined color="red" @click="limpiar()">
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
import Swal from 'sweetalert2'
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      show1: false,
      seen: false,
      porcentaje: 50,
      contador: 3,
      monto: '',
      disableboton: true,
      disabledMonto: true,
      disabled: true,
      index: -1,
      verificarDNI: '',
      snackbar: false,
      color: '',
      text: '',
      dialog: false,
      dni: '',
      usuario: {
        nombre: '',
        Ntarjeta: '',
        dni: '',
        saldo: 0,
        maxretiro: 0,
        retiro: 0
      },
      usuarios: [
        { nombre: 'angel', Ntarjeta: '123456789012345', dni: '12345678', saldo: 100, maxretiro: 0, retiro: 0 },
        { nombre: 'antonio', Ntarjeta: '012345678901 vc 234', dni: '87654321', saldo: 1500, maxretiro: 0, retiro: 0 }
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
      console.log(this.contador)
      console.log(this.index)
      console.log(this.usuario)
      this.contador -= 1
      if (this.contador <= 0) {
        this.mensajeAlert(true, 'error', `Error le quedan ${this.contador}`)
        this.disabled = true
        this.limpiar()
        this.verificarDNI = ''
        this.contador = 3
      } else if (this.usuario.dni === this.verificarDNI) {
        this.mensajeAlert(true, 'success', 'Datos validos!!!')
        this.seen = true
        this.disabledMonto = false
        this.disableboton = false
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
    },
    PreguntaRetiro () {
      this.usuario.maxretiro = (this.porcentaje * this.usuario.saldo) / 100
      console.log()
    },
    limpiar () {
      this.usuario = {
        nombre: '',
        Ntarjeta: '',
        dni: '',
        saldo: '',
        intentos: 3
      }
    },
    ConfirmarRetiro () {
      if (this.usuario.retiro > this.usuario.maxretiro) {
        this.mensajeAlert(true, 'error', 'Monto no permitido!!!')
      } else {
        Swal.fire({
          title: '¿Desea retirar el monto establecido?',
          text: 'Una vez realizado no se podrá anular',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Exito!',
              'Monto Retirado con Exito.',
              'success'
            )
            parseInt(this.usuario.retiro)
            this.usuario.saldo = this.usuario.saldo - this.usuario.retiro
            Object.assign(this.usuarios[this.index], this.usuario)
            console.log(this.contador)
            this.usuarios.push(this.usuario)
            console.log(this.usuario)
            this.mensajeAlert(true, 'success', 'Datos guardados correctamente!!!')
          }
        })
      }
    },
    mensajeAlert (snakbar, color, text) {
      this.snackbar = snakbar
      this.color = color
      this.text = text
    }
  }
}
</script>
