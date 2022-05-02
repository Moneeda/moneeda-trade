import { inject, provide, ref } from "vue";
import api from "~/api";

// import api from "@/api";

const key = Symbol.for("Simulations");

const createSimulationsInstance = () => {
  const simulations = ref([]);
  const activeSimulation = ref(null);
  const changeSimulation = (simulation) => {
    activeSimulation.value = simulation;
  };

  const retrieveSimulations = async (defaultToFirst = true) => {
    const sims = await api.simulations().all();
    simulations.value = sims.map((sim) => ({ ...sim, label: sim.name }));
    if (defaultToFirst && sims.length > 0) {
      changeSimulation(sims[0]);
    }
  };

  retrieveSimulations();

  return {
    simulations,
    activeSimulation,
    changeSimulation,
  };
};

export function provideSimulations() {
  const instance = createSimulationsInstance();
  provide(key, instance);
  return instance;
}

export function useSimulations() {
  return inject(key);
}
