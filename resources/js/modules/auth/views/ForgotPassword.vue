<template>
<v-main>
  <v-container class="py-16" style="max-width: 400px;">
    <v-card class="pa-6" elevation="2">
      <h1 class="text-h5 font-weight-medium mb-6 text-center">Reset Password</h1>
      <p class="text-center mb-6">Enter your email address and we'll send you a link to reset your password.</p>

      <v-form @submit.prevent="submit">
        <v-text-field v-model="formData.email" label="Email" type="email" class="mb-2" required  variant="outlined"/>

        <v-btn type="submit" color="primary" size="large" block class="mt-4" :loading="submitting">
          Send Reset Link
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</v-main>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';   
 const router = useRouter();
const auth = useSuperAdminAuthStore();
const formData = ref({
  email: '',
});
const submitting = ref(false);
async function submit() {
  submitting.value = true;

  try {
    await auth.forgotPassword(formData.value);
  } catch (e) {
  } finally {
    submitting.value = false;
  }
}
</script>