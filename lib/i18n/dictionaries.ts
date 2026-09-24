export const dictionaries = {
  en: {
    // Header
    aboutF1: "About Formula One",
    latestNews: "Latest News",
    teams: "Teams",
    drivers: "Drivers",
    calendar: "Calendar",
    historicData: "Historic Data",
    login: "Login",
    register: "Register",
    logout: "Logout",
    
    // Theme
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    themeSystem: "System",
    
    // Footer
    latestResults: "LATEST RESULTS",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    terms: "Terms and conditions",
    cookies: "Cookie Policy",
    faq: "F.A.Q",
    allRightsReserved: "© 2024 Motoring Community. All rights reserved.",
    
    // Page titles
    driversTitle: "Formula One 2026 Drivers",
    teamsTitle: "Formula One 2026 Constructors",
    calendarTitle: "Formula One 2026 Calendar",
    
    // Misc
    viewAllNews: "VIEW ALL F1 NEWS",
    noDataAvailable: "No data available",
    position: "Position",
    teamName: "Team Name",
    driverName: "Driver Name",
    constructor: "Constructor",
    nationality: "Nationality",
    timeStatus: "Time/Status",
    points: "Points",
    wins: "Wins",

    // Calendar Sessions & Legend
    freePractice1: "Free Practice 1",
    freePractice2: "Free Practice 2",
    freePractice3: "Free Practice 3",
    sprintQualifying: "Sprint Qualifying",
    sprintRace: "Sprint Race",
    qualifying: "Qualifying",
    race: "Race",
    round: "Round",
    spainTime: "Spain Time",
    spainTimeNotice: "All times displayed in Spain peninsular time (CET / CEST)",
    sessionPast: "Finished",
    sessionLive: "Live",
    sessionUpcoming: "Upcoming",
    raceFinished: "Finished",
    raceNext: "Next Race"
  },
  es: {
    // Header
    aboutF1: "Sobre la Fórmula Uno",
    latestNews: "Últimas Noticias",
    teams: "Escuderías",
    drivers: "Pilotos",
    calendar: "Calendario",
    historicData: "Datos Históricos",
    login: "Iniciar Sesión",
    register: "Registrarse",
    logout: "Cerrar Sesión",
    
    // Theme
    themeDark: "Modo Oscuro",
    themeLight: "Modo Claro",
    themeSystem: "Sistema",
    
    // Footer
    latestResults: "ÚLTIMOS RESULTADOS",
    contactUs: "Contacto",
    privacyPolicy: "Política de Privacidad",
    terms: "Términos y condiciones",
    cookies: "Política de Cookies",
    faq: "Preguntas Frecuentes",
    allRightsReserved: "© 2024 Motoring Community. Todos los derechos reservados.",
    
    // Page titles
    driversTitle: "Pilotos Fórmula Uno 2026",
    teamsTitle: "Escuderías Fórmula Uno 2026",
    calendarTitle: "Calendario Fórmula Uno 2026",
    
    // Misc
    viewAllNews: "VER TODAS LAS NOTICIAS F1",
    noDataAvailable: "Datos no disponibles",
    position: "Posición",
    teamName: "Nombre de Escudería",
    driverName: "Nombre de Piloto",
    constructor: "Escudería",
    nationality: "Nacionalidad",
    timeStatus: "Tiempo/Estado",
    points: "Puntos",
    wins: "Victorias",

    // Calendar Sessions & Legend
    freePractice1: "Libres 1",
    freePractice2: "Libres 2",
    freePractice3: "Libres 3",
    sprintQualifying: "Clasif. Sprint",
    sprintRace: "Carrera Sprint",
    qualifying: "Clasificación",
    race: "Carrera",
    round: "Ronda",
    spainTime: "Hora España",
    spainTimeNotice: "Todos los horarios en hora peninsular española (CET / CEST)",
    sessionPast: "Finalizada",
    sessionLive: "En Directo",
    sessionUpcoming: "Próxima",
    raceFinished: "Finalizado",
    raceNext: "Próxima Carrera"
  }
};

export type Language = keyof typeof dictionaries;
export type TranslationKey = keyof typeof dictionaries['en'];
