export default {
  landing: {
    welcome: "Aplicar estrategias de trading es complicado.",
    login: "Iniciar Sesion/Registrarse",
    dashboard: "Interfaz",
    welcomePhrase: "Nosotros las simplificamos.",
    welcomeSubtittle:
      "Genera enlaces de pago y subscripcion sin escribir codigo o usando nuestra API.",
    startButton: "Empieza con Moneeda",
    termsOfService: "Terminos de Servicio",
    cookiesSettings: "Ajustes de las Cookies",
    liveChat: "Chat de soporte",
  },
  admin: {
    navbarStrategies: "Estrategias",
    navbarPlayground: "Laboratorio",
    navbarProfile: "Perfil",
  },
  profileView: {
    connection: {
      title: "Conexión de alertas",
      description:
        "Conecta tus cuentas para poder recibir las notificaciones de las alertas",
      cta: "Connect to {provider}",
      confirmed: "Conectado a {provider} con el usuario {user}",
      or: "o",
      commandExplanation:
        "Conecta tu cuenta de {provider} manualmente ejecutando el siguiente commando en nuestro bot {name}",
      command: "/start {token}",
    },
  },
  strategiesView: {
    strategies: "Estrategias",
    description:
      "Las estrategias son un conjunto de condiciones que definiran el comportamiento de tu bot. Cada estrategia estara unida a un par especifico (por ejemplo: BTC-USD) y un tiempo especifico (por ejemplo: la ultima semana)",
    warning:
      "Si una estrategia esta en activo, tus tokens se veran afectados. Simula los resultados antes para ver el impacto",
    yourStrategies: "Tus Estrategias",
    cardTittle: "Añadir Estrategia",
    cardIcon: "Nueva",
    card: {
      live: "En activo",
      paused: "Pausada",
    },
    strategyModal: {
      createTitle: "Crear nueva estrategia",
      updateTitle: "Actualizar estrategia",
      description:
        "Crea una nueva estrategia para un producto específico con una cantidad base y una cantidad de cotización. Las condiciones y acciones se definirán en el siguiente paso.",
      name: "Nombre",
      inputDescription: "Descripción",
      product: "Producto",
      productSelect: "Selecciona un producto",
      baseAmount: "Cantidad base",
      quoteAmount: "Cantidad de cotización",
      confirmCTA: "Confirmar",
      cancelCTA: "Cancelar",
    },
  },
  playgroundView: {
    tittle: "Laboratorio",
    picker: "Estrategia",
    runSimulation: "Iniciar Simulacion",
    mode: "Modo",
    actions: "Acciones",
    condition: "Añadir Condicion",
    result: "Añadir Resultado",
    selectSimulation: "Selecciona una simulacion",
    simulation: "Simulaciones",
    save: "Guardar",
    noSimulationSelected: "Necesitas seleccionar una simulacion",
    periodicDescription:
      "Ejecuta la simulación periódicamente. Cuando no haya más condiciones pendientes, la estrategia volverá a evaluar las condiciones iniciales.",
    periodic: "Periodico",
    options: "Opciones",
    latestResult: "Último resultado",
    status: {
      active: "Activa",
      paused: "Pausada",
    },
  },
  simulation: {
    simulationResults: "Resultados de la simulación",
    yourStartegyWasRun:
      "La estrategia {strategy} se ha ejecutado con los datos de la simulación {simulation} produciendo los siguientes resultados:",
  },
  strategyEdit: {
    submit: "Guardar",
  },
};
