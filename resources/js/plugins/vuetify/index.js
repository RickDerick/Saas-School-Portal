import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#FF5722',
          secondary: '#FBE9E7',
          accent: '#FFCCBC',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          black: '#000000',
          white: '#FFFFFF',
          gray: '#dbdbdb',
        }
      },
    }
  },
});