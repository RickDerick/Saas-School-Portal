import { useTenantStore } from '@/stores/tenant';

export default function TenantTeachers() {
    const tenantAuthStore = useTenantStore();

    return [
        {
            name: 'Dashboard',
            icon: 'mdi-view-dashboard',
            route: { name: 'TenantDashboard' },
            available: tenantAuthStore.can('view-dashboard'),
        },
    ];
}
