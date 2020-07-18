<template>
  <v-container
    fluid
  >
    <center>
      <h1>
        Registro de Usuarios
      </h1>
    </center>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <v-row>
            <v-btn
              color="primary"
              style="margin: 10px 0px 0px 15px"
              @click="Activar()"
            >
              agregar
            </v-btn>
            <v-spacer />
            <v-text-field
              v-model="buscar"
              append-icon="mdi-magnify"
              label="Buscar"
              outlined
              single-line
              hide-details
            />
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="usuarios"
          :items-per-page="5"
          class="elevation-1"
          :search="buscar"
          :footer-props="{
            'items-per-page-options': rowsPerPageItems,
            'items-per-page-text': 'Filas por pagina'
          }"
        >
          <template v-slot:item.acciones="{ item }">
            {{ item.acciones }}
            <v-menu top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn icon @click="Editar(item)">
                      <v-icon>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn icon>
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title style="margin-bottom: 10px">
          <span>Agregar Usuario</span>
          <v-spacer />
          <v-btn icon @click="Salir()">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text style="padding-bottom: 0px">
          <v-text-field v-model="usuario.name" label="Nombre" outlined />
          <v-text-field v-model="usuario.lastname" label="Apellido" outlined />
          <v-row>
            <v-col cols="6" style="padding-bottom: 0px">
              <v-text-field v-model="usuario.dni" label="DNI" outlined />
            </v-col>
            <v-spacer />
            <v-col cols="6" style="padding-bottom: 0px">
              <v-text-field v-model="usuario.tarjeta" label="N° de Tarjeta" outlined />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" style="padding: 0px 0px 0px 10px">
              <v-combobox
                v-model="usuario.genero"
                :items="genero"
                label="Genero"
                outlined
              />
            </v-col>
            <v-spacer />
            <v-col cols="6" style="padding-top: 0px">
              <v-text-field
                v-model="usuario.saldo"
                label="Dinero Total"
                outlined
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
            @click="Agregar()"
          >
            Agregar
          </v-btn>
          <v-btn outlined color="red" style="margin-right: 15px" @click="Salir()">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      accion: false,
      index: -1,
      dialog: false,
      rowsPerPageItems: [5, 10, 15],
      genero: ['Masculino', 'Femenino'],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'lastname' },
        { text: 'DNI', value: 'dni' },
        { text: 'N° de tarjeta', value: 'tarjeta' },
        { text: 'Genero', value: 'genero' },
        { text: 'Saldo', value: 'saldo' },
        { text: 'Fecha Incripción', value: 'fecha' },
        { text: 'Acciones', value: 'acciones' }
      ],
      usuarios: [
        { name: 'Angel', lastname: 'Cuya', dni: '12345678', tarjeta: '12345678', genero: 'masculino', saldo: 1200, fecha: ' / / ' },
        { name: 'Antonio', lastname: 'Franquina', dni: '12345678', tarjeta: '87654321', genero: 'masculino', saldo: 1200, fecha: ' / / ' }
      ],
      usuario: {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: ''
      },
      buscar: ''
    }
  },
  methods: {
    Agregar () {
      this.usuarios.push(this.usuario)
      this.Salir()
    },
    Editar (item) {
      this.dialog = true
      this.index = this.usuarios.indexOf(item)
      this.usuario = Object.assign({}, item)
    },
    Eliminar () {
    },
    Salir () {
      this.dialog = false
      this.usuario = {
        name: '',
        lastname: '',
        dni: '',
        tarjeta: '',
        genero: '',
        saldo: ''
      }
    },
    Activar () {
      this.dialog = true
    },
    Activar2 () {
      this.accion = true
    }
  }
}
</script>
