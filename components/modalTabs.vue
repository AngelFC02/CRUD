<template>
  <v-container>
    <v-dialog v-model="modaltabs" max-width="500" persistent>
      <v-row>
        <v-tabs centered>
          <v-tab>
            Usuario
          </v-tab>
          <v-tab-item>
            <v-container col>
              <v-card-title>
                Agregar Usuario
              </v-card-title>
              <v-card-text style="padding-bottom: 0px">
                <v-text-field v-model="usuario.name" label="Nombre" outlined @keypress="Letras($event)" />
                <v-text-field v-model="usuario.lastname" label="Apellido" outlined @keypress="Letras($event)" />
                <v-row>
                  <v-col cols="6" style="padding-bottom: 0px">
                    <v-text-field
                      v-model="usuario.dni"
                      label="DNI"
                      maxlength="8"
                      counter="8"
                      outlined
                      @keypress="Numeros($event)"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="usuario.genero"
                      :items="genero"
                      label="Genero"
                      outlined
                      @keypress="Letras($event)"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-container>
          </v-tab-item>
          <v-tab>
            Tarjeta
          </v-tab>
          <v-tab-item>
            <v-container>
              <v-card-title>
                Agregar Datos de la tarjeta
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="usuario.tarjeta"
                      label="N° de Tarjeta"
                      maxlength="15"
                      counter="15"
                      outlined
                      @keypress="Numeros($event)"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="usuario.saldo"
                      label="Dinero Total"
                      outlined
                      @keypress="Numeros($event)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="usuario.maxRetiro"
                      label="Maximo retiro"
                      outlined
                      @keypress="Numeros($event)"
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      v-model="usuario.intentos"
                      :items="retiros"
                      label="Numero de retiros diarios"
                      outlined
                      @keypress="Letras($event)"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click="save()">
                  Agregar
                </v-btn>
                <v-btn color="error" outlined @click="close()">
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
import config from '../config'
import formato from '~/plugins/formato'
export default {
  props: {
    // eslint-disable-next-line object-shorthand
    usuario2: { type: Object, default: function () { return {} } },
    // eslint-disable-next-line object-shorthand
    index: { type: Number, default: -1 },
    // eslint-disable-next-line object-shorthand
    identificador: { type: String, default: '' },
    modaltabs: { type: Boolean, default: false }
  },
  data () {
    return {
      usuario: {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
      },
      genero: ['Masculino', 'Femenino'],
      retiros: [1, 2, 3]
    }
  },
  watch: {
    async identificador (value) {
      const self = this
      console.log(value, 'identificador')
      try {
        const data = await axios.get(`${config.URL}usuario/${value}`)
        self.usuario = Object.assign({}, data.data.usuario)
        console.log(data)
      } catch (error) {
        console.log(error.response, 'aqui el error')
      }
      // this.usuario = Object.assign({}, value)
    }
    // usuario2 (value) {
    //   console.log(value, 'usuario2')
    //   this.usuario = Object.assign({}, value)
    // }
  },
  methods: {
    close () {
      this.$emit('close', false)
      this.usuario = {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: '',
        maxRetiro: '',
        retiro: '',
        intentos: ''
      }
    },
    async save () {
      const self = this
      if (this.index > -1) {
        try {
          const data = await axios.put(`${config.URL}usuario/${self.usuario._id}`, self.usuario)
          self.$emit('update', self.usuario)
          console.log(self.usuario)
          console.log(data)
          self.close()
        } catch (error) {
          console.log(error.response, 'aqui el error')
        }
      } else {
        try {
          const data = await axios.post(`${config.URL}usuario`, self.usuario)
          self.$emit('save', data.data.usuario)
          console.log(data.data.usuario)
          self.close()
        } catch (error) {
          console.log(error.response, 'aqui el error')
        }
      }
    },
    Letras (e) {
      formato.letters(e)
    },
    Numeros (e) {
      formato.numbers(e)
    }
  }
}
</script>
