<template>
    <v-navigation-drawer
        app
        color="primary"
        v-model="drawer"
        permanent
        width="256"
    >
        <v-list nav>
            <v-list-item
                v-for="item in navItems"
                :key="item.name"
                :to="item.route"
                :prepend-icon="item.icon"
                :title="item.name"
            />
        </v-list>
    </v-navigation-drawer>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';
import { useTenantStore } from '@/stores/tenant';
import { navRegistry } from '@/layouts/navRegistry';

const superAdminAuthStore = useSuperAdminAuthStore();
const tenantAuthStore = useTenantStore();
const drawer = ref(true);

// Only one of these is ever populated in a real session — central domain
// vs. tenant domain never overlap — so combining them is safe.
const navItems = computed(() => {
    const roles = [...superAdminAuthStore.roles, ...tenantAuthStore.roles];
    const role = roles.find((role) => navRegistry[role]);
    if (!role) return [];

    return navRegistry[role]().filter((item) => item.available === true);
});
</script>
