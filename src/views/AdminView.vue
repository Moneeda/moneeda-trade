<script setup>
import Navbar from "~/components/admin/AdminNavbar.vue";
import { provideLayout } from "~/core/useLayout";
import { provideSimulations } from "~/core/useSimulations";
import { provideStrategies } from "~/core/useStrategies";

provideLayout();
provideSimulations();
provideStrategies();
</script>

<template>
  <div class="h-full">
    <header>
      <navbar class="block" @menu="toggleMenu" />
    </header>
    <main class="bg-adminbg admin-content">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
.admin-content {
  height: calc(100vh - 60px - 2 * 14px - 2 * 16px);
}
</style>
