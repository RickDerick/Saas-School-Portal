import SuperAdmin from '@/layouts/SuperAdmin.js';
import TenantAdmins from '@/layouts/TenantAdmins.js';
import TenantTeachers from '@/layouts/TenantTeachers.js';
import TenantAccountants from '@/layouts/TenantAccountants.js';

// Maps a Spatie role name to the function that builds its sidebar nav items.
// Add a new role here and SideBar.vue picks it up automatically — no
// changes needed there. Role names must match exactly what the backend
// seeds (see database/seeders/*.php) — central roles are PascalCase
// (SuperAdmin), tenant roles are lowercase (admin/teacher/accountant).
export const navRegistry = {
    SuperAdmin,
    admin: TenantAdmins,
    teacher: TenantTeachers,
    accountant: TenantAccountants,
};
