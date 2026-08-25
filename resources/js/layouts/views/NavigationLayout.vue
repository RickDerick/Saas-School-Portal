<template>
    <app-bar />
    <side-bar />
    <router-view />
</template>
<script setup>
import AppBar from '@/layouts/components/AppBar.vue';
import SideBar from '@/layouts/components/SideBar.vue';
</script>