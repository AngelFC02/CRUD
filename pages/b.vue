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
    "no-template-curly-in-string": "off",
    "no-undef": "off",
    "curly": "off",
    "object-shorthand": "off",
    "no-console": "off",
    "prefer-const": "off",
    "vue/no-use-v-if-with-v-for": "off",
    "vue/valid-v-on": "off",
    "no-warning": "off",
    "no-warnings": "off",
    "no-useless-escape": "off",
    "prefer-promise-reject-errors": "off",
    "import/order": "off",
    "vue/require-default-prop": "off",
    "vue/no-v-html": "off",
    "new-cap": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": ["error", {
      "singleline": 8,
      "multiline": {
        "max": 2,
        "allowFirstLine": false
      }
    }],
    "unicorn/prefer-text-content": "off",
    "unicorn/prefer-includes": "off",
    "no-lonely-if": "off",
    "vue/no-unused-components": "off",
    "vue/require-component-is": "off"
  }
}
