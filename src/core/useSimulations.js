import { inject, provide, ref } from "vue";
import simulationTests from "../assets/data/simulationTests";

// import api from "@/api";

const key = Symbol.for("Simulations");

const createSimulationsInstance = () => {
  const simulations = ref(simulationTests);
  const activeSimulation = ref(null);

  const changeSimulation = (simulationId) => {
    activeSimulation.value = simulations.value.find(
      (s) => s.id === simulationId
    );
  };

  const getValidSimulations = (product, period) => {
    return simulations.value.filter(
      (simulation) =>
        simulation.products.includes(product) &&
        simulation.periods.includes(period)
    );
  };

  return {
    simulations,
    activeSimulation,
    getValidSimulations,
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
