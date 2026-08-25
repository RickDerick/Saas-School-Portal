import {createRouter, createWebHistory} from 'vue-router';
import { authRoutes } from '../modules/auth/routes';
import { isCentralDomain } from '../stores/constants';
import { useSuperAdminAuthStore } from '../stores/superAdmin';
import { useTenantAuthStore } from '../stores/tenantAuth';
import { dashboardRoutes } from '../modules/dashboard/dashboardRoutes';
import FallBackPage from '@/components/FallBackPage.vue';

const rootRoute = isCentralDomain()
    ? { path: '/', redirect: '/auth/login' }
    : { path: '/', redirect: '/login' };

const routes = [
    rootRoute,
    ...authRoutes,
    ...dashboardRoutes,

    // fallback route
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: FallBackPage,

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    if (to.meta.requiresRole) {
        const authStore = useSuperAdminAuthStore();
        if (!authStore.isAuthenticated || !authStore.hasRole(to.meta.requiresRole)) {
            return { path: '/auth/login' };
        }
    }

    if (to.meta.requiresTenantAuth) {
        const tenantAuthStore = useTenantAuthStore();
        if (!tenantAuthStore.isAuthenticated) {
            return { path: '/login' };
        }
    }

    if (to.meta.requiresAnyAuth) {
        const authStore = useSuperAdminAuthStore();
        const tenantAuthStore = useTenantAuthStore();
        if (!authStore.isAuthenticated && !tenantAuthStore.isAuthenticated) {
            return isCentralDomain() ? { path: '/auth/login' } : { path: '/login' };
        }
    }
});

export default router
