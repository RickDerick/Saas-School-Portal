<template>
  <div class="d-flex align-center justify-center w-100 h-100 bg-primary">
    <DotLottieVue autoplay loop :src="loginAnimation" style="max-width: 600px; width: 100%;" />
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import loginAnimation from '@/assets/lottie/login.lottie?url';
</script>
