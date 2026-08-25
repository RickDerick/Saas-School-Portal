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

      <v-table v-if="loading || tenants.length">
        <thead>
          <tr>
            <th>Subdomain</th>
            <th>Company name</th>
            <th>Admin Email</th>
            <th>Domain</th>
            <th>Created</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr v-for="n in 5" :key="n">
              <td><v-skeleton-loader type="text" /></td>
              <td><v-skeleton-loader type="text" /></td>
              <td><v-skeleton-loader type="text" /></td>
              <td><v-skeleton-loader type="text" /></td>
              <td><v-skeleton-loader type="text" /></td>
              <td class="text-right">
                <v-skeleton-loader type="text" class="ml-auto" width="96" />
              </td>
            </tr>
          </template>
          <tr
            v-else
            v-for="tenant in tenants"
            :key="tenant.id"
            class="cursor-pointer"
            @click="router.push({ name: 'SuperAdminTenantDetails', params: { id: tenant.id } })"
          >
            <td>{{ tenant.id }}</td>
            <td>{{ tenant.company_name }}</td>
            <td>{{ tenant.email }}</td>
            <td>{{ tenant.domains?.[0]?.domain }}</td>
            <td>{{ formatDate(tenant.created_at) }}</td>
            <td class="text-right" @click.stop>
              <v-btn
                icon="mdi-eye-outline"
                variant="text"
                density="comfortable"
                title="View"
                color="info"
                :to="{ name: 'SuperAdminTenantDetails', params: { id: tenant.id } }"
              />
              <v-btn
                icon="mdi-pencil-outline"
                variant="text"
                density="comfortable"
                color="success"
                title="Edit"
                :to="{ name: 'SuperAdminTenantEdit', params: { id: tenant.id } }"
              />
              <v-btn
                icon="mdi-delete-outline"
                variant="text"
                density="comfortable"
                color="error"
                title="Delete"
                @click="confirmDelete(tenant)"
              />
            </td>
          </tr>
        </tbody>
      </v-table>

      <p v-else-if="!loading" class="text-body-1 text-medium-emphasis">
        No schools yet.
        <router-link :to="{ name: 'SuperAdminTenantCreate' }">Add the first one</router-link>.
      </p>

      <v-dialog v-model="deleteDialog" max-width="420">
        <v-card>
          <v-card-title class="text-h6">Delete school?</v-card-title>
          <v-card-text>
            This will permanently delete
            <strong>{{ tenantToDelete?.company_name || tenantToDelete?.id }}</strong>
            and its entire database. This cannot be undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
            <v-btn color="error" :loading="deleting" @click="deleteTenant">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/superAdminApi';
import { CentralUrls } from '@/stores/constants';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';

const router = useRouter();
const superAdminStore = useSuperAdminAuthStore();
const tenants = ref([]);
const loading = ref(true);
const error = ref('');

const deleteDialog = ref(false);
const tenantToDelete = ref(null);
const deleting = ref(false);

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '';
}

function confirmDelete(tenant) {
  tenantToDelete.value = tenant;
  deleteDialog.value = true;
}

async function deleteTenant() {
  deleting.value = true;

  try {
    await superAdminStore.deleteTenant(tenantToDelete.value.id);
    tenants.value = tenants.value.filter((t) => t.id !== tenantToDelete.value.id);
    deleteDialog.value = false;
  } catch (e) {
  } finally {
    deleting.value = false;
  }
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
