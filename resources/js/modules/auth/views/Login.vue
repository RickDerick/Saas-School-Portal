<template>
  <v-main>
    <v-row no-gutters style="min-height: 100vh;">
      <v-col cols="12" md="6" class="pa-0">
        <AuthLottiePanel />
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-container class="py-16" style="max-width: 600px;">
          <v-card class="pa-6" elevation="2">
            <h1 class="text-h5 font-weight-medium mb-6 text-center">Owner sign in</h1>

            <v-form @submit.prevent="submit">
              <v-text-field v-model="formData.email" label="Email" type="email" class="mb-2" required  variant="outlined"/>
              <v-text-field
                v-model="formData.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                required
                variant="outlined"
              />

              <div class="text-right">
                <router-link :to="{ name: 'forgot-password' }" class="text-caption">Forgot password?</router-link>
              </div>

              <v-btn type="submit" color="primary" size="large" block class="mt-4" :loading="submitting">
                Sign in
              </v-btn>
            </v-form>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';
import AuthLottiePanel from '@/modules/auth/components/AuthLottiePanel.vue';

const router = useRouter();
const auth = useSuperAdminAuthStore();

const formData = ref({
  email: '',
  password: '',
});
const submitting = ref(false);
const showPassword = ref(false);

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
