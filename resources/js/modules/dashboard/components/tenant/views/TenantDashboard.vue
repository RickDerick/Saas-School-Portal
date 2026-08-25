<template>
    <component :is="dashboardComponent" v-if="dashboardComponent" />
    <v-main v-else>
        <v-container class="py-16" style="max-width: 400px;">
            <p class="text-body-1 text-medium-emphasis">No dashboard available for your role.</p>
        </v-container>
    </v-main>
</template>

<script setup>
import { computed } from 'vue';
import { useTenantAuthStore } from '@/stores/tenantAuth';
import TenantAdminDashboard from '@/modules/dashboard/views/TenantAdminDashboard.vue';
import TenantTeachersDashboard from '@/modules/dashboard/views/TenantTeachersDashboard.vue';
import TenantAccountantDashboard from '@/modules/dashboard/views/TenantAccountantDashboard.vue';

const tenantAuthStore = useTenantAuthStore();

// Same role -> component idea as layouts/navRegistry.js, just for the
// dashboard body instead of the sidebar.
const dashboardMap = {
    admin: TenantAdminDashboard,
    teacher: TenantTeachersDashboard,
    accountant: TenantAccountantDashboard,
};

const dashboardComponent = computed(() => {
    const role = tenantAuthStore.roles.find((role) => dashboardMap[role]);
    return role ? dashboardMap[role] : null;
});
</script>
