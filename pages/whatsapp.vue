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
                      <v-list-item>
                        <v-list-item-title>
                          nuevo grupo
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="hola()">
                        <v-list-item-title>
                          d
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
          </div>
        </v-container>
      </v-col>
      <div class="divmsj">
        <v-col>
          <div align="center">
            <v-img src="whtpp.jpg" width="300" aling="center" />
          </div>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    hola () {
      console.log('hola')
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
.buscador {
  align-self: center;
  border-radius: 15px;
  background-color: white;
  margin: 0px;
  padding: 0px;
  align-content: center;
}
.divmsj {
  background-color: #CFCFCF;
  color: white;
  border-radius: 5px;
  border: 1px solid black;;
  margin: 0px;
  padding: 0px;
}
</style>
