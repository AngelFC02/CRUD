<template>
  <v-container fluid style="padding: 0px 0px 0px 0px">
    <v-row style="margin: 0px 0px 0px 0px">
      <v-col cols="3" style="padding: 0px 0px 0px 0px">
        <v-container style="padding: 0px 0px 0px 0px">
          <div>
            <v-row>
              <v-col style="padding: 0px 10px 10px 10px">
                <div class="init">
                  <v-btn icon>
                    <v-icon>
                      mdi-account
                    </v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>
                      mdi-circle
                    </v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>
                      mdi-message
                    </v-icon>
                  </v-btn>
                  <v-menu lef>
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
                      <v-list-item @click="hola()">
                        <v-list-item-title>
                          nuevo grupo
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="hola()">
                        <v-list-item-title>
                          nuevo msj
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-col>
            </v-row>
            <div>
              <v-text-field placeholder="Buscar un chat" prepend-inner-icon="mdi-magnify" outlined class="buscador" />
            </div>
            <span>
              <v-list v-for="(item, index) in usuarios" :key="index">
                <v-divider />
                <v-list-item @click="hola(item)">
                  <v-list-item-avatar>
                    <v-img :src="item.icon" />
                  </v-list-item-avatar>
                  <v-list-item-title>
                    {{ item.nombre }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.texto }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </span>
          </div>
        </v-container>
      </v-col>
      <v-col cols="9" class="divmsj">
        <template>
          <div v-if="datos" align="center">
            <v-img src="whtpp.jpg" width="300" class="img" />
            <div class="texto">Mantente conectado :v</div>
          </div>
          <div v-else>
            <v-card height="50" class="barra">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="usuario.icon">
                  </v-list-item-avatar>
                  <v-list-item-title>
                    {{ usuario.nombre }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
            <v-img src="fondo.jpg" />
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      datos: true,
      dialogo: false,
      usuarios: [
        { icon: 'v.png', nombre: 'angel', texto: 'que fue :v' },
        { icon: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', nombre: 'Antonio', texto: "<span class='text--primary'>Ali Connors</span>" },
        { icon: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', nombre: 'Franquina', texto: 'que fue :v' },
        { icon: 'https://cdn.vuetifyjs.com/images/lists/5.jpg', nombre: 'Cuya', texto: 'que fue :v' }
      ],
      usuario: {
        icon: '',
        nombre: '',
        texto: ''
      }
    }
  },
  methods: {
    hola (item) {
      this.datos = false
      this.index = this.usuarios.indexOf(item)
      this.usuario = Object.assign({}, item)
      console.log('hola')
    },
    dialogoImagen (item) {
      console.log(item)
      console.log(this.index)
    }
  }
}
</script>
<style>
.init {
  background-color: #CFCFCF;
  color: white;
  border-radius: 15px;
  margin: 0px;
  padding: 0px;
}
.barra {
  background-color: black;
  color: black;
}
.buscador {
  align-self: center;
  border-radius: 15px;
  background-color: white;
  margin: 0px;
  padding: 0px;
  align-content: center;
}
.divmsj {
  margin-left: 500px;
  background-color:#fafbfb;
  margin-right: 30px;
  color: white;
  height: 545px;
  margin: 0px;
  padding: 0px;
}
.img {
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 100px;
}
.texto {
  color: black;
  position: absolute;
  top: 72%;
  left: 55%;
}
</style>
