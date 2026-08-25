import NavigationLayout from '@/layouts/views/NavigationLayout.vue';
export const dashboardRoutes = [
    {
    path: '/app',
    component: () => import('@/layouts/views/NavigationLayout.vue'),
    children: [
        {
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/modules/dashboard/views/Dashboard.vue')
         },
        {
            path: 'superadmin/dashboard',
            name: 'SuperAdminDashboard',
            component: () => import('@/modules/dashboard/components/superadmin/views/SuperAdminDashboard.vue'),
            meta: { requiresRole: 'SuperAdmin' },
        },
        {
            path: 'superadmin/tenants',
            name: 'SuperAdminTenants',
            component: () => import('@/modules/dashboard/components/superadmin/views/TenantList.vue'),
            meta: { requiresRole: 'SuperAdmin' },
        },
        {
            path: 'superadmin/tenants/new',
            name: 'SuperAdminTenantCreate',
            component: () => import('@/modules/dashboard/components/superadmin/views/CreateTenant.vue'),
            meta: { requiresRole: 'SuperAdmin' },
        },
        {
            path: 'superadmin/tenants/:id',
            name: 'SuperAdminTenantShow',
            component: () => import('@/modules/dashboard/components/superadmin/views/TenantDetail.vue'),
            meta: { requiresRole: 'SuperAdmin' },
        },
        {
            path: 'tenant/dashboard',
            name: 'TenantDashboard',
            component: () => import('@/modules/dashboard/components/tenant/views/TenantDashboard.vue'),
            meta: { requiresTenantAuth: true },
        },
        {
            path: 'settings',
            name: 'settings',
            component: () => import('@/views/Settings.vue'),
            meta: { requiresAnyAuth: true },
        }
    ]
}
];
