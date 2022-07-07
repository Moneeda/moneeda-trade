<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const RoutesMap = new Map([
  ["1", "strategies"],
  ["2", "playground"],
]);

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeRoute = [...RoutesMap.entries()].find(
      ([, val]) => val === route.name
    );
    const activeEntry = ref(activeRoute?.[0] || "1");

    const handleOpen = (id) => {
      if (!RoutesMap.has(id)) {
        return;
      }

      router.push({ name: RoutesMap.get(id) });
      return;
    };

    return {
      activeEntry,
      handleOpen,
    };
  },
});
</script>

<template>
  <el-menu
    mode="horizontal"
    :default-active="activeEntry"
    class="el-menu--moneeda"
    :ellipsis="false"
    @select="handleOpen"
  >
    <el-menu-item index="1"> {{ $t("navbarStrategies") }} </el-menu-item>
    <el-menu-item index="2"> {{ $t("navbarPlayground") }} </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu--moneeda {
  border-bottom: 0;
}
</style>
