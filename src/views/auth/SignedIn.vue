<template>
  <div class="h-[100vh] w-full grid place-items-center">
    <div class="w-full text-center">
      <img src="@/assets/img/logo.svg" alt="Logo" class="h-[40px] mx-auto" />
      <div class="mt-4 text-highlight">Login in...</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useAuth0 } from "@/core/useAuth";

export default defineComponent({
  setup() {
    const { handleCallback } = useAuth0();

    onMounted(() => {
      handleCallback();
    });
  },
});
</script>
