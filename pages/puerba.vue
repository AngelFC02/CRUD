<template>
  <div>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <h1><center>CAJERO AUTOMATICO</center></h1>
    <v-card>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Opciones
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="usuario.tarjeta"
                    :disabled="disableTarjeta ? true : false"
                    label="Ingresar N° de tarjeta"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    maxlength="15"
                    counter="15"
                    @click:append="show1 = !show1"
                    @keypress="numerosValidacion($event)"
                  />
                </v-col>
                <!--preguntar sobre el padding-->
                <v-col cols="3" style="padding: 0px, 0px, 0px, 0px">
                  <v-btn
                    :disabled="disableTarjeta ? true : false"
                    color="success"
                    depressed
                    @click="validarTarjeta()"
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
              <v-col cols="10">
                <v-text-field
                  v-model="usuario.retiro"
                  type="number"
                  min="0"
                  :max="usuario.maxRetiro"
                  :disabled="disabledMonto ? true : false"
                  label="Monto a retirar"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
              <div v-if="seen">
                <v-row>
                  <v-col>
                    <center>
                      <p> {{ `Bienvenido: ${ usuario.nombre}` }}</p>
                    </center>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>Saldo total: {{ usuario.saldo }}</p>
                  </v-col>
                  <v-col>
                    <p>Limite Diario: S/.{{ usuario.maxRetiro }} </p>
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
        <v-col cols="6" md="6" sm="6">
          <div v-if="seen2">
            <v-card-text>
              <span>
                Usuario: {{ usuario.nombre }}
              </span>
              <br>
              <br>
              <span>
                Numero de identificacion: {{ usuario.dni }}
              </span>
              <br>
              <br>
              <span>
                Monto retirado: {{ usuario.retiro }}
              </span>
              <br>
              <br>
              <span>
                saldo desponible: {{ usuario.saldo }}
              </span>
            </v-card-text>
            <v-card-title>
              Gracias!!
            </v-card-title>
            <v-card-actions>
              <v-btn color="success" @click="limpiar()">
                aceptar
              </v-btn>
              <v-btn @click="reporte()">
                Mostrar reporte
              </v-btn>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>

import Swal from 'sweetalert2'
import axios from 'axios'
import config from '~/config'
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      fecha: '',
      disableTarjeta: false,
      show1: false,
      seen: false,
      seen2: false,
      porcentaje: 50,
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
        tarjeta: '',
        dni: '',
        saldo: 0,
        maxRetiro: 0,
        retiro: '',
        intentos: ''
      },
      usuarios: [],
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
    async  dniValidar () {
      console.log(this.usuario.intentos)
      console.log(this.index)
      console.log(this.usuario)
      console.log(this.usuarios)
      if (this.usuario.dni === this.verificarDNI && this.usuario.intentos > 0) {
        this.mensajeAlert(true, 'success', 'Datos validos!!!')
        this.seen = true
        this.disabledMonto = false
        this.disableboton = false
      } else {
        this.usuario.intentos -= 1
        // Object.assign(this.usuarios[this.index], this.usuario)
        try {
          const data = await axios.put(`${config.URL}usuario/${this.usuario._id}`, { intentos: this.usuario.intentos })
          console.log(data, 'actulizar intento')
        } catch (error) {
          console.log(error, 'intento')
        }
        if (this.usuario.intentos <= 0) {
          this.mensajeAlert(true, 'error', 'Ya no le quedan itentos. . .')
          // Object.assign(this.usuarios[this.index], this.usuario)
          try {
            const data = await axios.put(`${config.URL}usuario/${this.usuario._id}`, { intentos: this.usuario.intentos })
            console.log(data, 'actulizar intento')
          } catch (error) {
            console.log(error, 'intento')
          }
          this.limpiar()
          this.verificarDNI = ''
        }
      }
    },
    async validarTarjeta () {
      console.log('mensaje 1')
      try {
        const data = await axios.get(`${config.URL}usuarioCajero`, { params: { queryFront: this.usuario.tarjeta } })
        this.mensajeAlert(true, 'success', data.data.message)
        this.disableTarjeta = true
        this.verificarDNI = ''
        this.usuario = Object.assign({}, data.data.data)
        if (this.usuario.intentos <= 0) {
          this.limpiar()
          this.mensajeAlert(true, 'error', 'Limite diario caducado !!!')
        } else {
          console.log('validado')
          this.disabled = false
          // this.index = this.usuarios.indexOf(i)
          // this.mensajeAlert(true, 'success', 'Datos validos!!!')
          console.log(`numero de tarjeta es ${this.usuario.tarjeta}`)
          this.usuario.retiro = ''
        }
        console.log(data, 'validar')
      } catch (error) {
        this.mensajeAlert(true, 'error', error.response.data.message)
        console.log(error)
      }
      // for (const i of this.usuarios) {
      //   if (this.usuario.tarjeta === i.tarjeta) {
      //     this.disableTarjeta = true
      //     this.verificarDNI = ''
      //     this.index = this.usuarios.indexOf(i)
      //     this.usuario = Object.assign({}, i)
      //     if (this.usuario.intentos <= 0) {
      //       this.limpiar()
      //       this.mensajeAlert(true, 'error', 'Limite diario caducado !!!')
      //     } else {
      //       console.log('validado')
      //       this.disabled = false
      //       // this.index = this.usuarios.indexOf(i)
      //       console.log(`indice  = ${this.index}`)
      //       console.log(this.usuario)
      //       this.mensajeAlert(true, 'success', 'Datos validos!!!')
      //       console.log(`numero de tarjeta es ${this.usuario.tarjeta}`)
      //       this.usuario.retiro = ''
      //     }
      //   }
      // }
    },
    limpiar () {
      this.seen2 = false
      this.usuario.retiro = ''
      console.log(this.usuarios)
      this.disabledMonto = true
      this.disableboton = true
      this.seen = false
      this.disableTarjeta = false
      this.disabled = true
      this.verificarDNI = ''
      this.usuario = {
        nombre: '',
        tarjeta: '',
        dni: '',
        saldo: '',
        retiro: '',
        maxRetiro: ''
      }
    },
    ConfirmarRetiro () {
      if (this.usuario.retiro > this.usuario.maxRetiro || this.usuario.saldo <= 0 || this.usuario.retiro === '' || this.usuario.retiro === 0) {
        this.mensajeAlert(true, 'error', 'Monto no permitido!!!')
        this.usuario.retiro = ''
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
        }).then(async (result) => {
          if (result.value) {
            Swal.fire(
              'Exito!',
              'Monto Retirado con Exito.',
              'success'
            )
            this.usuario.saldo = this.usuario.saldo - this.usuario.retiro
            this.usuario.maxRetiro = this.usuario.maxRetiro - this.usuario.retiro
            try {
              await axios.put(`${config.URL}usuario/${this.usuario._id}`, { saldo: this.usuario.saldo, maxRetiro: this.usuario.maxRetiro, retiro: this.usuario.retiro })
            } catch (error) {
              console.log(error, 'asd')
            }
            this.fecha = this.formatFecha()
            this.usuario.reporte.push(this.usuario.retiro, this.fecha)
            console.log(this.usuario)
            console.log(this.usuario.reporte)
            this.seen2 = true
            console.log(this.usuarios)
          }
        })
      }
    },
    formatFecha (value) {
      const date = new Date(value)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      if (month < 10) {
        // console.log(`${day}-0${month}-${year}`)
        return `${day}-0${month}-${year}`
      } else {
        // console.log(`${day}-${month}-${year}`)
        return `${day}-${month}-${year}`
      }
    },
    reporte () {
      console.log('reporte')
    },
    mensajeAlert (snakbar, color, text) {
      this.snackbar = snakbar
      this.color = color
      this.text = text
    }
  }
}
</script>
