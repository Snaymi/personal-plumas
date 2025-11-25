<script setup lang="ts">
import { AtomSubtitle } from '../atoms'
import  OrganismDashBoardResume  from '../organism/OrganismDashBoardResume.vue'
</script>

<template>
  <div class="flex flex-col p-4 md:p-8 bg-gray-50 min-h-screen">
    <!-- Cabeçalho -->
    <AtomSubtitle class="mb-6" title="Dashboard" />

    <!-- Organismo com os gráficos -->
    <OrganismDashBoardResume />
  </div>
</template>

<style >
/* Ajuste opcional para espaçamento entre blocos */
</style>
