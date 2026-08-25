import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import { pinia } from './plugins/pinia';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import vuetify from './plugins/vuetify';
import { getTenantBranding } from './services/Branding';
import { isCentralDomain } from './stores/constants.js';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css'

/* optional italic styles */
import '@fontsource/roboto/100-italic.css'
import '@fontsource/roboto/300-italic.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500-italic.css'
import '@fontsource/roboto/700-italic.css'
import '@fontsource/roboto/900-italic.css'

async function bootstrap() {
    const app = createApp(App);
    app.use(pinia);
    app.use(router);
    app.use(vuetify);
    app.use(Vue3Toastify, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
    });

    if (!isCentralDomain()) {
        await getTenantBranding(vuetify);
    }

    app.mount('#app');
}

bootstrap();
    
    
