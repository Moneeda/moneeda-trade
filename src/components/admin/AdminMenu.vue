<script>
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const RoutesMap = new Map([
  ["1", "strategies"],
  ["2", "playground"],
  ["3", "profile"],
]);

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeRoute = ref(
      [...RoutesMap.entries()].find(([, val]) => val === route.name)
    );
    const activeEntry = ref(activeRoute.value?.[0] || "1");

    watch(
      () => route.name,
      (name) => {
        activeRoute.value = [...RoutesMap.entries()].find(
          ([, val]) => val === name
        );
        activeEntry.value = activeRoute.value?.[0] || "1";
      }
    );

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
    <el-menu-item index="1"> {{ $t("admin.navbarStrategies") }} </el-menu-item>
    <el-menu-item index="2"> {{ $t("admin.navbarPlayground") }} </el-menu-item>
    <el-menu-item index="3"> {{ $t("admin.navbarProfile") }} </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu--moneeda {
  border-bottom: 0;
}
</style>
