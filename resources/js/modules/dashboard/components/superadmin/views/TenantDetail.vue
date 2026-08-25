<template>
  <v-main>
    <v-container class="py-10" style="max-width: 640px;">
      <v-alert v-if="error" type="error" density="compact" class="mb-4">
        {{ error }}
      </v-alert>

      <template v-if="tenant">
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/superAdminApi';
import { CentralUrls } from '@/stores/constants';

const route = useRoute();
const tenant = ref(null);
const error = ref('');

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
  try {
    const { data } = await api.get(`${CentralUrls.tenants}/${route.params.id}`);
    tenant.value = data.tenant;
  } catch (e) {
    error.value = e.response?.data?.message || 'Could not load this school.';
  }
});
</script>
