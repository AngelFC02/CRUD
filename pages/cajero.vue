<template>
  <div>
    <h1><center>CAJERO AUTOMATICO</center></h1>
    <v-card>
      <v-row>
        <v-col cols="7">
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
        <v-col cols="5">
          <v-card>
            <v-card-title>
              Opciones
            </v-card-title>
            <v-card-text>
              <v-col cols="12">
                <v-text-field
                  placeholder="Numero de tarjeta"
                  maxlength="15"
                  counter="15"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  @keypress="numerosValidacion($event)"
                />
              </v-col>
            </v-card-text>
            <v-col cols="10">
              <v-text-field
                placeholder="DNI"
                maxlength="8"
                @keypress="numerosValidacion($event)"
              />
            </v-col>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn color="success" @click="activar()" @keypress="numerosValidacion($event)">
                    confirmar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn>
                    cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="mensaje" max-width="400" persistent>
      <v-card>
        <v-card-title>
          Cuanto dinero desea retirar?
          <v-spacer />
          <v-btn icon @click="salir()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field type="number" />
          <span>
            {saldo}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="success">
            confirmar
          </v-btn>
          <v-btn @click="salir()">
            salir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import formato from '~/plugins/formato'
export default {
  data () {
    return {
      show1: false,
      dni: null,
      pass: null,
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
    activar () {
      this.mensaje = true
    }
  }
}
</script>
