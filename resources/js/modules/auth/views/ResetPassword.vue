<template>
<v-main>
  <v-container class="py-16" style="max-width: 400px;">
    <v-card class="pa-6" elevation="2">
      <h1 class="text-h5 font-weight-medium mb-6 text-center">Reset Password</h1>

      <v-form @submit.prevent="submit">
        <v-text-field v-model="formData.email" label="Email" type="email" class="mb-2" required variant="outlined"/>
        <v-text-field
          v-model="formData.password"
          label="New password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          class="mb-2"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="formData.password_confirmation"
          label="Confirm new password"
          :type="showPasswordConfirmation ? 'text' : 'password'"
          :append-inner-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPasswordConfirmation = !showPasswordConfirmation"
          required
          variant="outlined"
        />

        <v-btn type="submit" color="primary" size="large" block class="mt-4" :loading="submitting">
          Reset Password
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</v-main>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';

const route = useRoute();
const auth = useSuperAdminAuthStore();

const formData = ref({
  email: route.query.email || '',
  token: route.query.token || '',
  password: '',
  password_confirmation: '',
});
const submitting = ref(false);
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

async function submit() {
  submitting.value = true;

  try {
    await auth.resetPassword(formData.value);
  } catch (e) {
  } finally {
    submitting.value = false;
  }
}
</script>
