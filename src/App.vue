<script setup>
import { onMounted } from "@vue/runtime-core";
import { provideAuth0 } from "./core/useAuth";
const auth0 = provideAuth0();
onMounted(async () => {
  if (!auth0) {
    return;
  }
  await auth0.createClient();
});
</script>

<template>
  <RouterView />
</template>
