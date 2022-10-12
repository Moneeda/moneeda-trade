<script setup>
import Navbar from "~/components/admin/AdminNavbar.vue";
import { onMounted } from "@vue/runtime-core";
import { provideLayout } from "~/core/useLayout";
import { provideSimulations } from "~/core/useSimulations";
import { provideStrategies } from "~/core/useStrategies";
import { provideUserInfo } from "~/core/useUserInfo";

provideLayout();
provideSimulations();
provideStrategies();
const { setUserInfo } = provideUserInfo();
onMounted(async () => {
  await setUserInfo();
});
</script>

<template>
  <div class="h-full">
    <header>
      <navbar class="block" />
    </header>
    <main class="bg-adminbg admin-content">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </main>
  </div>
</template>

<style lang="scss">
.admin-content {
  height: calc(100vh - 60px);
}
</style>
