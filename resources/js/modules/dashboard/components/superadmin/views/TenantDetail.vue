<template>
  <v-main>
    <v-container class="py-10">
      <div class="d-flex align-center mb-6">
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="outlined"
          class="mr-6"
          :to="{ name: 'SuperAdminTenants' }"
        >Back</v-btn>
        <span class="text-h6 font-weight-medium">School details</span>
      </div>

      <v-alert v-if="error" type="error" density="compact" class="mb-4">
        {{ error }}
      </v-alert>

      <template v-if="loading">
        <v-skeleton-loader type="heading" class="mb-6" width="45%" />

        <v-table>
          <tbody>
            <tr v-for="n in 5" :key="n">
              <th style="width: 160px;"><v-skeleton-loader type="text" width="100" /></th>
              <td><v-skeleton-loader type="text" width="50%" /></td>
            </tr>
          </tbody>
        </v-table>

        <v-skeleton-loader type="button" class="mt-6" width="180" />
      </template>

      <template v-else-if="tenant">
        <h1 class="text-h5 font-weight-medium mb-6">{{ tenant.company_name || tenant.id }}</h1>

        <v-table>
          <tbody>
            <tr><th>Subdomain</th><td>{{ tenant.id }}</td></tr>
            <tr><th>Company name</th><td>{{ tenant.company_name }}</td></tr>
            <tr><th>Contact email</th><td>{{ tenant.email }}</td></tr>
            <tr><th>Domain</th><td>{{ tenant.domains?.[0]?.domain }}</td></tr>
            <tr><th>Created</th><td>{{ formatDate(tenant.created_at) }}</td></tr>
          </tbody>
        </v-table>

        <v-btn class="mt-6" variant="outlined" :href="loginUrl">
          Open school's login
        </v-btn>
      </template>
    </v-container>
  </v-main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTenantStore } from '@/stores/tenant';

const tenantStore = useTenantStore();
const route = useRoute();
const tenant = computed(() => tenantStore.tenantDetails);
const loading = computed(() => tenantStore.loading);
const error = computed(() => tenantStore.error);
const routeParams = computed(() => route.params);

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '';
}

const loginUrl = computed(() => {
  const domain = tenant.value?.domains?.[0]?.domain;
  if (!domain) return '#';
  const { protocol, port } = window.location;
  return `${protocol}//${domain}${port ? ':' + port : ''}/login`;
});

onMounted(async () => {
  return await tenantStore.getTenantDetails(routeParams.value.id);
});
</script>
