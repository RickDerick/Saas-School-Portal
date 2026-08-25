import Login from '@/modules/auth/views/Login.vue';
import Register from '@/modules/auth/views/Register.vue';
import TenantLogin from '@/modules/auth/views/TenantLogin.vue';
import ForgotPassword from '@/modules/auth/views/ForgotPassword.vue';
import ResetPassword from '@/modules/auth/views/ResetPassword.vue';
export const authRoutes = [
    {
        path: '/auth/login',
        name: 'login',
        component: Login },
    {
        path: '/auth/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword
    },
    {
        path: '/auth/reset-password',
        name: 'reset-password',
        component: ResetPassword
    },
    {
        path: '/auth/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'tenant-login',
        component: TenantLogin,
    },
];
