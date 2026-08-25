<template>
  <v-app>
    <v-container fluid class="fill-height d-flex align-center justify-center">
      <v-card class="fallback-card pa-8" elevation="6">
        <div class="d-flex flex-column align-center text-center">
          <v-icon size="72" color="accent">mdi-alert-circle-outline</v-icon>
          <h1 class="text-h4 mt-4">404 — Page Not Found</h1>
          <p class="text-subtitle-1 mb-6">The page you requested doesn't exist or has been moved.</p>

          <div class="actions">
            <v-btn color="primary" large to="/">Go Home</v-btn>
            <v-btn outlined large class="ml-4" @click="contactSupport">Contact Support</v-btn>
          </div>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function contactSupport() {
  window.location.href = 'mailto:support@icpak.or.ke'
}
</script>

<style scoped>
.fallback-card {
  max-width: 720px;
  width: 100%;
  border-radius: 12px;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>
  