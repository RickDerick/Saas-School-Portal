<template>
  <v-main>
    <v-container class="py-16" style="max-width: 400px;">
      <h1 class="text-h5 font-weight-medium mb-6 text-center">Sign in</h1>

      <v-form @submit.prevent="submit">
        <v-text-field v-model="formData.email" label="Email" type="email" class="mb-2" required  variant="outlined"/>
        <v-text-field v-model="formData.password" label="Password" type="password" required variant="outlined"/>

        <v-btn type="submit" color="primary" size="large" block class="mt-4" :loading="submitting">
          Sign in
        </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import { useTenantAuthStore } from '@/stores/tenantAuth';

const auth = useTenantAuthStore();

const formData = ref({
  email: '',
  password: '',
});
const submitting = ref(false);

async function submit() {
  submitting.value = true;

  try {
    await auth.login(formData.value);
  } catch (e) {
  } finally {
    submitting.value = false;
  }
}
</script>
