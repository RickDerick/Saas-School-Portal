<template>
  <v-main>
    <v-container class="py-10" fluid>
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-btn
            prepend-icon="mdi-arrow-left"
            variant="outlined"
            class="mr-2"
            :to="{ name: 'SuperAdminTenants' }"
          >Back</v-btn>
          <span class="text-h5 font-weight-medium">Add a school</span>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="submit">
            <h2 class="text-subtitle-1 font-weight-medium mb-2">School details</h2>

            <v-text-field
              v-model="form.name"
              label="School subdomain"
              placeholder="greenwood"
              :hint="form.name ? `${form.name}.yourapp.com` : ''"
              persistent-hint
              :rules="nameRules"
              variant="outlined"
            />

            <v-text-field
              v-model="form.companyName"
              label="School name"
              placeholder="Greenwood Academy"
              class="mt-4"
              :rules="companyNameRules"
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
              label="Logo"
              accept="image/png,image/jpeg,image/webp"
              prepend-icon=""
              prepend-inner-icon="mdi-image"
              :rules="logoRules"
              variant="outlined"
            />

            <v-divider class="my-4" />

            <h2 class="text-subtitle-1 font-weight-medium mb-2">School admin</h2>

            <v-text-field
              v-model="form.adminName"
              label="Admin's name"
              class="mb-2"
              :rules="adminNameRules"
              variant="outlined"
            />
            <v-text-field
              v-model="form.adminEmail"
              label="Admin's email"
              type="email"
              class="mb-2"
              :rules="adminEmailRules"
              variant="outlined"
            />
            <v-text-field
              v-model="form.adminPassword"
              label="Admin's password"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="adminPasswordRules"
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
            />

            <div class="d-flex justify-end">
              <v-btn type="submit" color="primary" :loading="submitting">Create school</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';

const superAdminStore = useSuperAdminAuthStore();
const form = reactive({
  name: '',
  companyName: '',
  primaryColor: '',
  secondaryColor: '',
  accentColor: '',
  logo: null,
  adminName: '',
  adminEmail: '',
  adminPassword: '',
});

const submitting = ref(false);
const showPassword = ref(false);

const nameRules = [(v) => !!v || 'School subdomain is required.'];
const companyNameRules = [];
const colorRules = [(v) => !v || /^#[0-9A-Fa-f]{6}$/.test(v) || 'Enter a valid hex color.'];
const logoRules = [
  (v) => {
    const file = Array.isArray(v) ? v[0] : v;
    return !file || file.size <= 2 * 1024 * 1024 || 'Logo must be 2MB or smaller.';
  },
];
const adminNameRules = [(v) => !!v || "Admin's name is required."];
const adminEmailRules = [(v) => !!v || "Admin's email is required."];
const adminPasswordRules = [
  (v) => !!v || "Admin's password is required.",
  (v) => (v && v.length >= 8) || 'At least 8 characters',
];

async function submit() {
  submitting.value = true;

  try {
    await superAdminStore.createTenant(form);
  } catch (e) {
  } finally {
    submitting.value = false;
  }
}
</script>
