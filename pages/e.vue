<template>
  <v-container>
    <ul>
      <li v-for="(item, index) in redes" :key="index">
        <a :href="item.link" target="_blank">
          <v-icon>
            {{ item.icono }}
          </v-icon>
          <span>{{ item.nombre }}</span>
        </a>
      </li>
    </ul>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      redes: [
        { nombre: 'Coro Católico "Voces y Acordes"', link: 'https://api.whatsapp.com/send?phone=51981302896', icono: 'mdi-facebook' },
        { nombre: '51 941 395 435', link: 'https://api.whatsapp.com/send?phone=51981302896', icono: 'mdi-whatsapp' },
        { nombre: 'Voces y Acordes', link: 'https://www.instagram.com/vocesyacordes/', icono: 'mdi-whatsapp' },
        { nombre: 'vocesyacordes@gmail.com', link: 'MAILTO:vocesyacordes@gmail.com', icono: 'mdi-gmail' }
      ]
    }
  }
}
</script>
