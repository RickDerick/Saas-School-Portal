import {createRouter, createWebHistory} from 'vue-router';
import { authRoutes } from '../modules/auth/routes';
import { isCentralDomain } from '../stores/constants';
import { useSuperAdminAuthStore } from '../stores/superAdmin';
import { useTenantStore } from '../stores/tenant';
import { useNavigationProgressStore } from '../stores/navigationProgress';
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
    useNavigationProgressStore().start();

    if (to.meta.requiresRole) {
        const authStore = useSuperAdminAuthStore();
        if (!authStore.isAuthenticated || !authStore.hasRole(to.meta.requiresRole)) {
            return { path: '/auth/login' };
        }
    }

    if (to.meta.requiresTenantAuth) {
        const tenantAuthStore = useTenantStore();
        if (!tenantAuthStore.isAuthenticated) {
            return { path: '/login' };
        }
    }

    if (to.meta.requiresAnyAuth) {
        const authStore = useSuperAdminAuthStore();
        const tenantAuthStore = useTenantStore();
        if (!authStore.isAuthenticated && !tenantAuthStore.isAuthenticated) {
            return isCentralDomain() ? { path: '/auth/login' } : { path: '/login' };
        }
    }
});

router.afterEach(() => {
    useNavigationProgressStore().stop();
});

router.onError(() => {
    useNavigationProgressStore().stop();
});

export default router
