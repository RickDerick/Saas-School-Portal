import { useTenantAuthStore } from '@/stores/tenantAuth';

export default function TenantTeachers() {
    const tenantAuthStore = useTenantAuthStore();

    return [
        {
            name: 'Dashboard',
            icon: 'mdi-view-dashboard',
            route: { name: 'TenantDashboard' },
            available: tenantAuthStore.can('view-dashboard'),
        },
    ];
}
