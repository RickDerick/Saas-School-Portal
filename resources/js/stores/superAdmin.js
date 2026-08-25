import { defineStore } from 'pinia';
import { CentralUrls } from '@/stores/constants';
import api from '@/services/superAdminApi';


export const useSuperAdminAuthStore = defineStore('superAdminAuth', {
    state: () => ({
        token: localStorage.getItem('user_token') || null,
        user: JSON.parse(localStorage.getItem('user_data') || 'null'),
        roles: JSON.parse(localStorage.getItem('user_roles') || '[]'),
        permissions: JSON.parse(localStorage.getItem('user_permissions') || '[]'),
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
            localStorage.setItem('user_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));
            localStorage.setItem('user_roles', JSON.stringify(roles));
            localStorage.setItem('user_permissions', JSON.stringify(permissions));
        },

        async login(credentials) {
            return api.post(CentralUrls.login, credentials)
                .then(({ data }) => {
                    this.setSession(data.token, data.superAdmin, data.roles, data.permissions);
                    setTimeout(()=>{
                        return this.toast.success('Logged in successfully');
                    }, 1000);
                    this.router.push({ name: 'SuperAdminDashboard' });
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
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('user_roles');
            localStorage.removeItem('user_permissions');
            this.toast.success('Logged out');
            this.router.push('/auth/login');
        },

        async forgotPassword(payload) {
            return api.post(CentralUrls.forgotPassword, payload)
                .then(({ data }) => {
                    this.toast.success(data.message || 'Reset link sent to your email');
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to send reset link');
                    throw error;
                });
        },

        async resetPassword(payload) {
            return api.post(CentralUrls.resetPassword, payload)
                .then(({ data }) => {
                    this.toast.success(data.message || 'Password reset successfully');
                    this.router.push({ name: 'login' });
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to reset password');
                    throw error;
                });
        },

        async updateEmail(payload) {
            return api.put(CentralUrls.profileEmail, payload)
                .then(({ data }) => {
                    this.user = data.user;
                    localStorage.setItem('user_data', JSON.stringify(data.user));
                    this.toast.success(data.message || 'Email updated successfully');
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to update email');
                    throw error;
                });
        },

        async updatePassword(payload) {
            return api.put(CentralUrls.profilePassword, payload)
                .then(({ data }) => {
                    this.toast.success(data.message || 'Password updated successfully');
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to update password');
                    throw error;
                });
        },

        async createTenant(form) {
            const payload = new FormData();
            payload.append('name', form.name);
            payload.append('company_name', form.companyName);
            payload.append('admin_name', form.adminName);
            payload.append('admin_email', form.adminEmail);
            payload.append('admin_password', form.adminPassword);
            if (form.primaryColor) payload.append('primary_color', form.primaryColor);
            if (form.secondaryColor) payload.append('secondary_color', form.secondaryColor);
            if (form.accentColor) payload.append('accent_color', form.accentColor);

            const logoFile = Array.isArray(form.logo) ? form.logo[0] : form.logo;
            if (logoFile) payload.append('logo', logoFile);

            return api.post(CentralUrls.tenants, payload)
                .then(({ data }) => {
                    this.toast.success('School created successfully');
                    this.router.push({ name: 'SuperAdminTenantDetails', params: { id: data.tenant.id } });
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to create tenant');
                    throw error;
                });
        },

        async updateTenant(id, form) {
            const payload = new FormData();
            payload.append('_method', 'PUT');
            payload.append('company_name', form.companyName);
            payload.append('email', form.email);
            if (form.primaryColor) payload.append('primary_color', form.primaryColor);
            if (form.secondaryColor) payload.append('secondary_color', form.secondaryColor);
            if (form.accentColor) payload.append('accent_color', form.accentColor);

            const logoFile = Array.isArray(form.logo) ? form.logo[0] : form.logo;
            if (logoFile) payload.append('logo', logoFile);

            return api.post(`${CentralUrls.tenants}/${id}`, payload)
                .then(({ data }) => {
                    this.toast.success(data.message || 'School updated successfully');
                    this.router.push({ name: 'SuperAdminTenantDetails', params: { id } });
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to update tenant');
                    throw error;
                });
        },

        async deleteTenant(id) {
            return api.delete(`${CentralUrls.tenants}/${id}`)
                .then(({ data }) => {
                    this.toast.success(data.message || 'School deleted successfully');
                    return data;
                })
                .catch((error) => {
                    this.toast.error(error.response?.data?.message || 'Failed to delete tenant');
                    throw error;
                });
        }
    },
});
