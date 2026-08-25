import { defineStore } from 'pinia';
import { TenantUrls } from '@/stores/constants';
import api from '@/services/tenantApi';

export const useTenantAuthStore = defineStore('tenantAuth', {
    state: () => ({
        token: localStorage.getItem('tenant_token') || null,
        user: JSON.parse(localStorage.getItem('tenant_user') || 'null'),
        roles: JSON.parse(localStorage.getItem('tenant_roles') || '[]'),
        permissions: JSON.parse(localStorage.getItem('tenant_permissions') || '[]'),
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        hasRole: (state) => (role) => state.roles.includes(role),
        can: (state) => (permission) => state.permissions.includes(permission),
    },

    actions: {
        setSession(token, user, roles = [], permissions = []) {
            this.token = token;
            this.user = user;
            this.roles = roles;
            this.permissions = permissions;
            localStorage.setItem('tenant_token', token);
            localStorage.setItem('tenant_user', JSON.stringify(user));
            localStorage.setItem('tenant_roles', JSON.stringify(roles));
            localStorage.setItem('tenant_permissions', JSON.stringify(permissions));
        },

        async login(credentials) {
            return api.post(TenantUrls.login, credentials)
                .then(({ data }) => {
                    this.setSession(data.token, data.user, data.roles, data.permissions);
                    setTimeout(()=>{
                        return this.toast.success('Logged in successfully');
                    }, 1000);
                    this.router.push({ name: 'TenantDashboard' });
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Login failed');
                    throw error;
                });
        },

        logout() {
            this.token = null;
            this.user = null;
            this.roles = [];
            this.permissions = [];
            localStorage.removeItem('tenant_token');
            localStorage.removeItem('tenant_user');
            localStorage.removeItem('tenant_roles');
            localStorage.removeItem('tenant_permissions');
            this.toast.success('Logged out');
            this.router.push('/login');
        },

        async updateEmail(payload) {
            return api.put(TenantUrls.profileEmail, payload)
                .then(({ data }) => {
                    this.user = data.user;
                    localStorage.setItem('tenant_user', JSON.stringify(data.user));
                    this.toast.success(data.message || 'Email updated successfully');
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to update email');
                    throw error;
                });
        },

        async updatePassword(payload) {
            return api.put(TenantUrls.profilePassword, payload)
                .then(({ data }) => {
                    this.toast.success(data.message || 'Password updated successfully');
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to update password');
                    throw error;
                });
        },
    },
});
