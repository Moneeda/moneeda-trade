import { inject, provide, ref } from "vue";

// import api from "@/api";

const key = Symbol.for("Simulations");

const createSimulationsInstance = () => {
  const simulations = ref([
    {
      id: "1",
      name: "Simulation 1",
      description: "Simulation 1 description",
      strategy: "1",
      createdAt: "2020-01-01",
      updatedAt: "2020-01-01",
    },
    {
      id: "2",
      name: "Simulation 2",
      description: "Simulation 2 description",
      strategy: "1",
      createdAt: "2020-01-01",
      updatedAt: "2020-01-01",
    },
    {
      id: "3",
      name: "Simulation 3",
      description: "Simulation 3 description",
      strategy: "1",
      createdAt: "2020-01-01",
      updatedAt: "2020-01-01",
    },
  ]);
  const activeSimulation = ref(null);
  const changeSimulation = (simulation) => {
    activeSimulation.value = simulation;
  };

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
