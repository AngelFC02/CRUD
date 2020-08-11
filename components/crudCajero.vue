<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title style="margin-bottom: 10px">
          <span v-if="index === -1">Agregar Usuario</span>
          <span v-if="index > -1">Editar Usuario</span>
          <v-spacer />
          <v-btn icon @click="salir()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
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
            <v-spacer />
            <v-col cols="6" style="padding-bottom: 0px">
              <v-text-field
                v-model="usuario.tarjeta"
                label="N° de Tarjeta"
                maxlength="15"
                counter="15"
                outlined
                @keypress="Numeros($event)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" style="padding: 0px 0px 0px 10px">
              <v-select
                v-model="usuario.genero"
                :items="genero"
                label="Genero"
                outlined
                @keypress="Letras($event)"
              />
            </v-col>
            <v-spacer />
            <v-col cols="6" style="padding-top: 0px">
              <v-text-field
                v-model="usuario.saldo"
                label="Dinero Total"
                outlined
                @keypress="Numeros($event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions style="margin-top: 10px">
          <v-spacer />
          <v-btn
            color="success"
            style="margin-right: 15px"
            @click="agregar()"
          >
            <span v-if="index === -1">Agregar</span>
            <span v-if="index > -1">Editar</span>
          </v-btn>
          <v-btn outlined color="red" style="margin-right: 15px" @click="salir()">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import formato from '~/plugins/formato'
export default {
  props: {
    dialog: { type: Boolean, default: false },
    index: { type: Number, default: -1 }
  },
  data () {
    return {
      usuario: {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: ''
      },
      genero: ['Masculino', 'Femenino']
    }
  },
  methods: {
    salir () {
      this.$emit('salir', false)
      this.usuario = {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: ''
      }
    },
    agregar () {
      this.$emit('agregar', this.usuario)
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
