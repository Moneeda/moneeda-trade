<script>
import { defineComponent, useRoute } from "vue";

export default defineComponent({
  setup() {
    const route = useRoute();
    const e = route.value.query.e;

    return {
      e,
    };
  },
});
</script>

<template>
  <div>Error! {{ e }}</div>
</template>
