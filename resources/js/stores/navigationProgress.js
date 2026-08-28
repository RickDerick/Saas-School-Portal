import { defineStore } from 'pinia';

export const useNavigationProgressStore = defineStore('navigationProgress', {
    state: () => ({
        isNavigating: false,
    }),

    actions: {
        start() {
            this.isNavigating = true;
        },

        stop() {
            this.isNavigating = false;
        },
    },
});
