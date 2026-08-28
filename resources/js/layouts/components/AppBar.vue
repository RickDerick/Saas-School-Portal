<template>
    <v-app-bar
        app
        color="secondary"
        prominent
    >
        <v-spacer />

        <v-btn icon variant="text">
            <v-badge color="error" dot overlap>
                <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
        </v-btn>

        <v-menu location="bottom end">
            <template #activator="{ props }">
                <v-btn icon variant="text" v-bind="props">
                    <v-avatar color="secondary" size="36">
                        <v-img
                            v-if="currentUser?.avatar"
                            :src="currentUser.avatar"
                            :alt="currentUser?.name"
                        />
                        <span v-else class="text-subtitle-2">{{ initials }}</span>
                    </v-avatar>
                </v-btn>
            </template>

            <v-card min-width="220">
                <v-list>
                    <v-list-item
                        :title="currentUser?.name"
                        :subtitle="currentUser?.email"
                    />
                </v-list>

                <v-divider />

                <v-list>
                    <v-list-item
                        title="Settings"
                        prepend-icon="mdi-cog-outline"
                        :to="{ name: 'settings' }"
                    />
                    <v-list-item
                        title="Logout"
                        prepend-icon="mdi-logout"
                        @click="logout"
                    />
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';
import { useTenantAuthStore } from '@/stores/tenantAuth';

const superAdminAuthStore = useSuperAdminAuthStore();
const tenantAuthStore = useTenantAuthStore();

const currentUser = computed(() => superAdminAuthStore.user || tenantAuthStore.user);

function logout() {
    if (superAdminAuthStore.isAuthenticated) {
        superAdminAuthStore.logout();
    } else {
        tenantAuthStore.logout();
    }
}

const initials = computed(() => {
    const name = currentUser.value?.name;
    if (!name) return '';

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
});
</script>
