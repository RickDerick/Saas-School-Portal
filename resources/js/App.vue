<template>
  <v-app>
    <NavigationProgressBar />
    <router-view />
  </v-app>
</template>

<script setup>
import NavigationProgressBar from '@/components/NavigationProgressBar.vue';
</script>