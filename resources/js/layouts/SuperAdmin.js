export default function SuperAdmin()
 {
    return [
        {
            name: 'Dashboard',
            icon: 'mdi-view-dashboard',
            route: { name: 'SuperAdminDashboard' },
            available: true
        },
        {
            name: 'Tenants',
            icon: 'mdi-account-multiple',
            route: { name: 'SuperAdminTenants' },
            available: true
        }
    ]

}