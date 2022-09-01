import { computed, inject, provide, ref } from "vue";

export const LayoutType = {
  VIEW: "view",
  RESULT: "result",
  CONDITION: "condition",
  ACTION: "action",
};

const key = Symbol.for("layout");
const ThreeColsLayouts = new Set([LayoutType.CONDITION, LayoutType.ACTION]);

const createLayoutInstance = () => {
  const layoutMode = ref(LayoutType.VIEW);

  const switchLayout = (mode) => {
    layoutMode.value = mode;
  };

  const isThreeCols = computed(() => ThreeColsLayouts.has(layoutMode.value));

  return {
    isThreeCols,
    layoutMode,
    switchLayout,
  };
};

export function provideLayout() {
  const instance = createLayoutInstance();
  provide(key, instance);
  return instance;
}

export function useLayout() {
  return inject(key);
}
