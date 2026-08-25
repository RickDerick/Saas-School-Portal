<template>
  <v-main>
    <v-container class="py-10" style="max-width: 900px;">
      <div class="d-flex align-center justify-space-between mb-6">
        <h1 class="text-h5 font-weight-medium">Schools</h1>
        <v-btn color="primary" :to="{ name: 'SuperAdminTenantCreate' }">Add school</v-btn>
      </div>

      <v-alert v-if="error" type="error" density="compact" class="mb-4">
        {{ error }}
      </v-alert>

      <v-table v-if="tenants.length">
        <thead>
          <tr>
            <th>Subdomain</th>
            <th>Company name</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tenant in tenants"
            :key="tenant.id"
            class="cursor-pointer"
            @click="router.push({ name: 'SuperAdminTenantShow', params: { id: tenant.id } })"
          >
            <td>{{ tenant.id }}</td>
            <td>{{ tenant.company_name }}</td>
            <td>{{ tenant.email }}</td>
            <td>{{ tenant.domains?.[0]?.domain }}</td>
            <td>{{ formatDate(tenant.created_at) }}</td>
          </tr>
        </tbody>
      </v-table>

      <p v-else-if="!loading" class="text-body-1 text-medium-emphasis">
        No schools yet.
        <router-link :to="{ name: 'SuperAdminTenantCreate' }">Add the first one</router-link>.
      </p>
    </v-container>
  </v-main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/superAdminApi';
import { CentralUrls } from '@/stores/constants';

const router = useRouter();
const tenants = ref([]);
const loading = ref(true);
const error = ref('');

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '';
}

onMounted(async () => {
  try {
    const { data } = await api.get(CentralUrls.tenants);
    tenants.value = data.tenants;
  } catch (e) {
    error.value = e.response?.data?.message || 'Could not load schools.';
  } finally {
    loading.value = false;
  }
});
</script>
