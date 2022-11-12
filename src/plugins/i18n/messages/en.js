export default {
  landing: {
    welcome: "Trading strategies are complicated.",
    login: "Login/Register",
    dashboard: "Dashboard",
    welcomePhrase: "We simplify them.",
    welcomeSubtittle:
      "Generate simple payment and subscription links without writing code or via an API call.",
    startButton: "Get started with moneeda",
    termsOfService: "Terms of Service",
    cookiesSettings: "Change cookie settings",
    liveChat: "Live chat",
  },
  admin: {
    navbarStrategies: "Strategies",
    navbarPlayground: "Playground",
    navbarProfile: "Profile",
  },
  profileView: {
    connection: {
      title: "Alerts provider",
      description: "Connect your alert provider to receive the strategy alerts",
      cta: "Connect to {provider}",
      confirmed: "Already connected to {provider} with user {user}",
      or: "or",
      commandExplanation:
        "Connect your {provider} account using the following command in our bot MoneedaTestBot",
      command: "/start {token}",
    },
  },
  strategiesView: {
    strategies: "Strategies",
    description:
      "Strategies are a set of conditions that are going to define how your bot behaves. Each strategy is linked to a specific pair (ex: BTC-USD) and aspecific simulation data (ex: Last week data).",
    warning:
      "If a strategy is live, your token consumption will be affected accordingly. Simulate the results first to see the impact.",
    yourStrategies: "Your strategies",
    cardTittle: "Add a new strategy",
    cardIcon: "New",
    card: {
      live: "Live",
      paused: "Paused",
    },
    strategyModal: {
      createTitle: "Add a new strategy",
      updateTitle: "Update strategy",
      description:
        "Create a new strategy for a specific product with a base amount and a quote amount. Conditions and actions will be defined in the next step.",
      name: "Name",
      inputDescription: "description",
      product: "Product",
      productSelect: "Select a product",
      baseAmount: "Base amount",
      quoteAmount: "Quote amount",
      confirmCTA: "Confirm",
      cancelCTA: "Cancel",
    },
  },
  playgroundView: {
    tittle: "Playground",
    picker: "Strategy",
    runSimulation: "Run simulation",
    mode: "Mode",
    actions: "Actions",
    condition: "Add condition",
    result: "Add result",
    simulation: "Simulation",
    selectSimulation: "Select a simulation",
    save: "Save",
    periodic: "Periodic",
    periodicDescription:
      "Run the simulation periodically. Once there's no pending condition, the strategy will start from the beginning.",
    options: "Options",
    latestResult: "Latest result",
    status: {
      active: "Active",
      paused: "Paused",
    },
  },
  simulation: {
    simulationResults: "Simulation results",
    yourStartegyWasRun:
      "Your strategy {strategy} was run with the simulation data of {simulation} and the results are the following:",
  },
  strategyEdit: {
    submit: "Guardar",
  },
};
