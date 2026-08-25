<template>
  <v-main>
    <v-container class="py-10" fluid>
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-btn
            prepend-icon="mdi-arrow-left"
            variant="outlined"
            class="mr-2"
            :to="{ name: 'SuperAdminTenantDetails', params: { id: route.params.id } }"
          >Back</v-btn>
          <span class="text-h5 font-weight-medium">Edit school</span>
        </v-card-title>

        <v-alert v-if="error" type="error" density="compact" class="mx-4">
          {{ error }}
        </v-alert>

        <v-card-text v-if="loaded">
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="form.companyName"
              label="School name"
              placeholder="Greenwood Academy"
              :rules="companyNameRules"
              variant="outlined"
            />

            <v-text-field
              v-model="form.email"
              label="Contact email"
              type="email"
              class="mt-2"
              :rules="emailRules"
              variant="outlined"
            />

            <v-row class="mt-2">
              <v-col cols="4">
                <v-text-field
                  v-model="form.primaryColor"
                  label="Primary color"
                  placeholder="#4F46E5"
                  :rules="colorRules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="form.secondaryColor"
                  label="Secondary color"
                  placeholder="#4F46E5"
                  :rules="colorRules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="form.accentColor"
                  label="Accent color"
                  placeholder="#4F46E5"
                  :rules="colorRules"
                  variant="outlined"
                />
              </v-col>
            </v-row>

            <v-file-input
              v-model="form.logo"
              label="Replace logo"
              accept="image/png,image/jpeg,image/webp"
              prepend-icon=""
              prepend-inner-icon="mdi-image"
              :rules="logoRules"
              variant="outlined"
            />

            <div class="d-flex justify-end">
              <v-btn type="submit" color="primary" :loading="submitting">Save changes</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/superAdminApi';
import { CentralUrls } from '@/stores/constants';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';

const route = useRoute();
const superAdminStore = useSuperAdminAuthStore();

const form = reactive({
  companyName: '',
  email: '',
  primaryColor: '',
  secondaryColor: '',
  accentColor: '',
  logo: null,
});

const loaded = ref(false);
const submitting = ref(false);
const error = ref('');

const companyNameRules = [];
const emailRules = [(v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email.'];
const colorRules = [(v) => !v || /^#[0-9A-Fa-f]{6}$/.test(v) || 'Enter a valid hex color.'];
const logoRules = [
  (v) => {
    const file = Array.isArray(v) ? v[0] : v;
    return !file || file.size <= 2 * 1024 * 1024 || 'Logo must be 2MB or smaller.';
  },
];

async function submit() {
  submitting.value = true;

  try {
    await superAdminStore.updateTenant(route.params.id, form);
  } catch (e) {
  } finally {
    submitting.value = false;
  }
}

(async () => {
  try {
    const { data } = await api.get(`${CentralUrls.tenants}/${route.params.id}`);
    form.companyName = data.tenant.company_name;
    form.email = data.tenant.email;
    form.primaryColor = data.tenant.primary_color;
    form.secondaryColor = data.tenant.secondary_color;
    form.accentColor = data.tenant.accent_color;
  } catch (e) {
    error.value = e.response?.data?.message || 'Could not load this school.';
  } finally {
    loaded.value = true;
  }
})();
</script>
