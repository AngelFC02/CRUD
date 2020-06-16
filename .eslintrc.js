module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaVersion": 6
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    "no-console": "off",
    "vue/singleline-html-element-content-newline": "off",
     "vue/valid-v-on": "off",
     "vue/no-use-v-if-with-v-for": "off",
    "vue/multiline-html-element-content-newline": "off"
  }
}
