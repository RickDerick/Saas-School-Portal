import { createPinia } from 'pinia';
import router from "../../router";
import { markRaw } from "vue";
import { toast } from "vue3-toastify";

export const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
    store.toast = markRaw(toast);
  });