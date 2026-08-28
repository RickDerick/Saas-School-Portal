<template>
    <v-progress-linear
        v-if="navigationProgress.isNavigating"
        indeterminate
        color="primary"
        height="3"
        style="position: fixed; top: 0; left: 0; right: 0; z-index: 3000;"
    />
</template>

<script setup>
import { useNavigationProgressStore } from '@/stores/navigationProgress';

const navigationProgress = useNavigationProgressStore();
</script>
