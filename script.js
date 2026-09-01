/**
 * ==========================================================================
 * 🛰️ ISS TRACKER — SPACE LIVE
 * Architecture JavaScript Modulaire & Robuste
 * APIs publiques : WhereTheISS.at, Open-Meteo
 * Stockage LocalStorage, Système Multilingue (FR, EN, ES), Conversions d'Unités
 * ==========================================================================
 */

// ==========================================================================
// 1. BASE DE DONNÉES DES PAYS ET COORDONNÉES APPROXIMATIVES
// ==========================================================================
const countries = {
  "Côte d'Ivoire": { latitude: 7.54, longitude: -5.55 },
  "France": { latitude: 46.60, longitude: 1.88 },
  "États-Unis": { latitude: 37.09, longitude: -95.71 },
  "Canada": { latitude: 56.13, longitude: -106.35 },
  "Royaume-Uni": { latitude: 55.37, longitude: -3.43 },
  "Allemagne": { latitude: 51.16, longitude: 10.45 },
  "Espagne": { latitude: 40.46, longitude: -3.74 },
  "Italie": { latitude: 41.87, longitude: 12.56 },
  "Portugal": { latitude: 39.39, longitude: -8.22 },
  "Belgique": { latitude: 50.50, longitude: 4.47 },
  "Suisse": { latitude: 46.81, longitude: 8.22 },
  "Japon": { latitude: 36.20, longitude: 138.25 },
  "Chine": { latitude: 35.86, longitude: 104.19 },
  "Inde": { latitude: 20.59, longitude: 78.96 },
  "Brésil": { latitude: -14.23, longitude: -51.92 },
  "Australie": { latitude: -25.27, longitude: 133.77 },
  "Sénégal": { latitude: 14.49, longitude: -14.45 },
  "Ghana": { latitude: 7.94, longitude: -1.02 },
  "Nigeria": { latitude: 9.08, longitude: 8.67 },
  "Maroc": { latitude: 31.79, longitude: -7.09 },
  "Algérie": { latitude: 28.03, longitude: 1.65 },
  "Afrique du Sud": { latitude: -30.55, longitude: 22.93 }
};

// ==========================================================================
// 2. DICTIONNAIRE DE TRADUCTIONS (FR, EN, ES)
// ==========================================================================
const translations = {
  fr: {
    appTitle: "ISS TRACKER",
    appSubtitle: "Suivez la Station spatiale internationale en temps réel.",
    chooseCountry: "🌍 Choisissez votre pays",
    chooseLanguage: "🌐 Choisissez votre langue",
    startBtn: "🚀 COMMENCER",
    navHome: "Accueil",
    navISS: "ISS",
    navWeather: "Météo",
    navSpace: "Espace",
    navSettings: "Paramètres",
    navAbout: "À propos",
    issPositionTitle: "🛰️ POSITION DE L'ISS",
    issLiveBadge: "LIVE",
    latitude: "Latitude",
    longitude: "Longitude",
    altitude: "Altitude",
    speed: "Vitesse",
    lastUpdate: "Dernière mise à jour",
    userPositionTitle: "📍 Votre position de référence",
    country: "Pays",
    locateMeBtn: "📍 Me localiser (GPS)",
    locateUsingGPS: "Localisation GPS active",
    distanceTitle: "📏 Distance ISS → Vous",
    weatherTitle: "🌤️ MÉTÉO LOCALE",
    temperature: "Température",
    apparentTemp: "Ressenti",
    humidity: "Humidité",
    windSpeed: "Vent",
    weatherConditions: "Conditions",
    rainProb: "Probabilité de pluie",
    skyState: "État du ciel",
    day: "☀️ Jour",
    night: "🌙 Nuit",
    visibilityTitle: "🔭 PROBABILITÉ DE PASSAGE",
    visibilityHigh: "🟢 Probabilité élevée",
    visibilityHighDesc: "Les conditions semblent favorables pour observer l'ISS (ciel dégagé, distance proche).",
    visibilityMed: "🟠 Probabilité moyenne",
    visibilityMedDesc: "L'ISS est relativement proche, mais les conditions météo ou lumineuses ne sont pas idéales.",
    visibilityLow: "🔴 Probabilité faible",
    visibilityLowDesc: "Les conditions actuelles semblent défavorables (ISS éloignée ou ciel trop couvert).",
    step1Distance: "ÉTAPE 1 — DISTANCE",
    step1DistanceDesc: "Distance calculée : ",
    step2Weather: "ÉTAPE 2 — MÉTÉO",
    step2WeatherDesc: "Couverture & conditions météo locales analysées.",
    step3Calc: "ÉTAPE 3 — ESTIMATION",
    step3CalcDesc: "Combinaison distance, météo et clarté du ciel.",
    disclaimerText: "⚠️ Estimation simplifiée : Ne constitue pas une prédiction astronomique officielle. L'observation réelle dépend aussi de l'heure locale et de la trajectoire orbitale exacte.",
    spaceGalleryTitle: "🌌 SPACE GALLERY",
    newImageBtn: "🔄 Nouvelle image",
    settingsTitle: "⚙️ PARAMÈTRES",
    themeMode: "🌙 Thème d'affichage",
    themeDark: "Mode sombre (Spatial)",
    themeLight: "Mode clair (Céleste)",
    unitDistance: "📏 Unité de Distance",
    unitSpeed: "🚀 Unité de Vitesse",
    unitAltitude: "📐 Unité d'Altitude",
    unitTemp: "🌡️ Unité de Température",
    saveSettingsBtn: "💾 Enregistrer",
    settingsSaved: "✓ Paramètres enregistrés avec succès",
    clearDataBtn: "🗑️ Effacer mes données",
    clearDataConfirmTitle: "Effacer les données ?",
    clearDataConfirmDesc: "Toutes vos préférences sauvegardées (pays, langue, unités) seront réinitialisées.",
    btnCancel: "Annuler",
    btnConfirm: "Confirmer la suppression",
    dataCleared: "Données réinitialisées avec succès",
    aboutTitle: "À PROPOS DE ISS TRACKER",
    aboutDesc: "ISS Tracker permet de suivre la position de la Station spatiale internationale en direct et d'afficher des informations précises sur sa trajectoire, sa distance par rapport à vous, la météo locale et une estimation des conditions d'observation.",
    technologiesTitle: "Technologies utilisées :",
    techList: "HTML5, CSS3 Moderne, JavaScript ES6+, API WhereTheISS, API Open-Meteo, LocalStorage.",
    aboutDisclaimer: "Les données de position et de météo dépendent des services publics externes utilisés par l'application.",
    onlineStatus: "🟢 En ligne",
    offlineStatus: "🔴 Hors ligne",
    offlineMessage: "Certaines données ne peuvent pas être actualisées.",
    connectionRestored: "🟢 Connexion rétablie",
    errISS: "⚠️ Impossible de récupérer les données de l'ISS.",
    errWeather: "⚠️ Données météo temporairement indisponibles.",
    errOffline: "📡 Connexion Internet nécessaire pour actualiser les données.",
    errGPS: "⚠️ Impossible d'accéder au GPS de votre appareil."
  },
  en: {
    appTitle: "ISS TRACKER",
    appSubtitle: "Track the International Space Station in real time.",
    chooseCountry: "🌍 Choose your country",
    chooseLanguage: "🌐 Choose your language",
    startBtn: "🚀 GET STARTED",
    navHome: "Home",
    navISS: "ISS",
    navWeather: "Weather",
    navSpace: "Space",
    navSettings: "Settings",
    navAbout: "About",
    issPositionTitle: "🛰️ ISS POSITION",
    issLiveBadge: "LIVE",
    latitude: "Latitude",
    longitude: "Longitude",
    altitude: "Altitude",
    speed: "Speed",
    lastUpdate: "Last update",
    userPositionTitle: "📍 Your Reference Location",
    country: "Country",
    locateMeBtn: "📍 Locate Me (GPS)",
    locateUsingGPS: "GPS Location Active",
    distanceTitle: "📏 Distance ISS → You",
    weatherTitle: "🌤️ LOCAL WEATHER",
    temperature: "Temperature",
    apparentTemp: "Feels like",
    humidity: "Humidity",
    windSpeed: "Wind",
    weatherConditions: "Conditions",
    rainProb: "Rain probability",
    skyState: "Sky condition",
    day: "☀️ Day",
    night: "🌙 Night",
    visibilityTitle: "🔭 PASS VISIBILITY ESTIMATE",
    visibilityHigh: "🟢 High Probability",
    visibilityHighDesc: "Conditions appear favorable to observe the ISS (clear skies, close distance).",
    visibilityMed: "🟠 Medium Probability",
    visibilityMedDesc: "The ISS is relatively close, but weather or sky brightness is not ideal.",
    visibilityLow: "🔴 Low Probability",
    visibilityLowDesc: "Current conditions appear unfavorable (ISS is far or sky is overcast).",
    step1Distance: "STEP 1 — DISTANCE",
    step1DistanceDesc: "Calculated distance: ",
    step2Weather: "STEP 2 — WEATHER",
    step2WeatherDesc: "Local cloud cover & atmospheric conditions analyzed.",
    step3Calc: "STEP 3 — ESTIMATE",
    step3CalcDesc: "Combined distance, cloudiness and sky darkness.",
    disclaimerText: "⚠️ Simplified estimate: This is not an official astronomical prediction. Real observation also depends on exact orbital pass time and horizon angles.",
    spaceGalleryTitle: "🌌 SPACE GALLERY",
    newImageBtn: "🔄 New Image",
    settingsTitle: "⚙️ SETTINGS",
    themeMode: "🌙 Display Theme",
    themeDark: "Dark Mode (Deep Space)",
    themeLight: "Light Mode (Celestial)",
    unitDistance: "📏 Distance Unit",
    unitSpeed: "🚀 Speed Unit",
    unitAltitude: "📐 Altitude Unit",
    unitTemp: "🌡️ Temperature Unit",
    saveSettingsBtn: "💾 Save Preferences",
    settingsSaved: "✓ Settings saved successfully",
    clearDataBtn: "🗑️ Clear My Data",
    clearDataConfirmTitle: "Clear all data?",
    clearDataConfirmDesc: "All your saved preferences (country, language, units) will be reset.",
    btnCancel: "Cancel",
    btnConfirm: "Confirm Reset",
    dataCleared: "Data reset successfully",
    aboutTitle: "ABOUT ISS TRACKER",
    aboutDesc: "ISS Tracker allows you to track the International Space Station live and provides comprehensive data on its orbital path, distance from you, local weather, and visibility conditions.",
    technologiesTitle: "Technologies used:",
    techList: "HTML5, Modern CSS3, Vanilla JS ES6+, WhereTheISS API, Open-Meteo API, LocalStorage.",
    aboutDisclaimer: "Position and weather data rely on external public web services.",
    onlineStatus: "🟢 Online",
    offlineStatus: "🔴 Offline",
    offlineMessage: "Some live data cannot be updated.",
    connectionRestored: "🟢 Connection restored",
    errISS: "⚠️ Unable to fetch ISS telemetry.",
    errWeather: "⚠️ Weather data temporarily unavailable.",
    errOffline: "📡 Internet connection required to refresh telemetry.",
    errGPS: "⚠️ Could not access device GPS."
  },
  es: {
    appTitle: "ISS TRACKER",
    appSubtitle: "Sigue la Estación Espacial Internacional en tiempo real.",
    chooseCountry: "🌍 Elige tu país",
    chooseLanguage: "🌐 Elige tu idioma",
    startBtn: "🚀 COMENZAR",
    navHome: "Inicio",
    navISS: "ISS",
    navWeather: "Clima",
    navSpace: "Espacio",
    navSettings: "Ajustes",
    navAbout: "Acerca de",
    issPositionTitle: "🛰️ POSICIÓN DE LA ISS",
    issLiveBadge: "EN VIVO",
    latitude: "Latitud",
    longitude: "Longitud",
    altitude: "Altitud",
    speed: "Velocidad",
    lastUpdate: "Última actualización",
    userPositionTitle: "📍 Tu ubicación de referencia",
    country: "País",
    locateMeBtn: "📍 Ubicarme (GPS)",
    locateUsingGPS: "Ubicación GPS activa",
    distanceTitle: "📏 Distancia ISS → Tú",
    weatherTitle: "🌤️ CLIMA LOCAL",
    temperature: "Temperatura",
    apparentTemp: "Sensación",
    humidity: "Humedad",
    windSpeed: "Viento",
    weatherConditions: "Condiciones",
    rainProb: "Probabilidad de lluvia",
    skyState: "Estado del cielo",
    day: "☀️ Día",
    night: "🌙 Noche",
    visibilityTitle: "🔭 PROBABILIDAD DE VISIBILIDAD",
    visibilityHigh: "🟢 Probabilidad alta",
    visibilityHighDesc: "Las condiciones parecen favorables para observar la ISS (cielo despejado, distancia cercana).",
    visibilityMed: "🟠 Probabilidad media",
    visibilityMedDesc: "La ISS está relativamente cerca, pero las condiciones climáticas no son ideales.",
    visibilityLow: "🔴 Probabilidad baja",
    visibilityLowDesc: "Las condiciones actuales parecen desfavorables (ISS lejana o cielo cubierto).",
    step1Distance: "PASO 1 — DISTANCIA",
    step1DistanceDesc: "Distancia calculada: ",
    step2Weather: "PASO 2 — CLIMA",
    step2WeatherDesc: "Nubosidad y condiciones atmosféricas locales analizadas.",
    step3Calc: "PASO 3 — ESTIMACIÓN",
    step3CalcDesc: "Combinación de distancia, clima y oscuridad del cielo.",
    disclaimerText: "⚠️ Estimación simplificada: No constituye una predicción astronómica oficial.",
    spaceGalleryTitle: "🌌 GALERÍA ESPACIAL",
    newImageBtn: "🔄 Nueva imagen",
    settingsTitle: "⚙️ AJUSTES",
    themeMode: "🌙 Tema de pantalla",
    themeDark: "Modo oscuro (Espacial)",
    themeLight: "Modo claro (Celestial)",
    unitDistance: "📏 Unidad de Distancia",
    unitSpeed: "🚀 Unidad de Velocidad",
    unitAltitude: "📐 Unidad de Altitud",
    unitTemp: "🌡️ Unidad de Temperatura",
    saveSettingsBtn: "💾 Guardar cambios",
    settingsSaved: "✓ Ajustes guardados correctamente",
    clearDataBtn: "🗑️ Borrar mis datos",
    clearDataConfirmTitle: "¿Borrar todos los datos?",
    clearDataConfirmDesc: "Se restablecerán todas tus preferencias (país, idioma, unidades).",
    btnCancel: "Cancelar",
    btnConfirm: "Confirmar borrado",
    dataCleared: "Datos restablecidos correctamente",
    aboutTitle: "ACERCA DE ISS TRACKER",
    aboutDesc: "ISS Tracker permite seguir la posición de la Estación Espacial Internacional en vivo y muestra datos sobre su trayectoria, distancia, clima local y estimación de visibilidad.",
    technologiesTitle: "Tecnologías utilizadas:",
    techList: "HTML5, CSS3 Moderno, JavaScript ES6+, API WhereTheISS, API Open-Meteo, LocalStorage.",
    aboutDisclaimer: "Los datos de posición y clima dependen de servicios externos públicos.",
    onlineStatus: "🟢 En línea",
    offlineStatus: "🔴 Fuera de línea",
    offlineMessage: "No se pueden actualizar algunos datos en tiempo real.",
    connectionRestored: "🟢 Conexión restablecida",
    errISS: "⚠️ No se pudo obtener la telemetría de la ISS.",
    errWeather: "⚠️ Datos del clima temporalmente no disponibles.",
    errOffline: "📡 Se requiere conexión a Internet para actualizar datos.",
    errGPS: "⚠️ No se pudo acceder al GPS del dispositivo."
  }
};

// ==========================================================================
// 3. GALERIE DE PHOTOS SPATIALES HD
// ==========================================================================
const spaceImages = [
  {
    url: "terre.png",
    title: { fr: "Planète Terre", en: "Planet Earth", es: "Planeta Tierra" },
    desc: { fr: "Vue satellite globale de la Terre", en: "Global satellite view of Earth", es: "Vista satelital global de la Tierra" }
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    title: { fr: "Terre vue de l'orbite basse", en: "Earth from Low Orbit", es: "Tierra desde la órbita baja" },
    desc: { fr: "Atmosphère bleue scintillante et courbure terrestre", en: "Luminescent blue atmosphere and Earth limb", es: "Atmósfera azul luminiscente y curvatura" }
  },
  {
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    title: { fr: "Station spatiale internationale", en: "International Space Station", es: "Estación Espacial Internacional" },
    desc: { fr: "Panneaux solaires dorés flottant à 420 km d'altitude", en: "Golden solar arrays orbiting at 420 km altitude", es: "Paneles solares orbitando a 420 km de altitud" }
  },
  {
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
    title: { fr: "Nébuleuse stellaire cosmique", en: "Cosmic Stellar Nebula", es: "Nebulosa estelar cósmica" },
    desc: { fr: "Nuages de gaz et poussières d'étoiles naissantes", en: "Interstellar gas clouds and nascent stars", es: "Nubes de gas interestelar y estrellas" }
  },
  {
    url: "https://images.unsplash.com/photo-1447433819943-74a20887a81e?q=80&w=1200&auto=format&fit=crop",
    title: { fr: "Galaxie spirale majestueuse", en: "Majestic Spiral Galaxy", es: "Galaxia espiral majestuosa" },
    desc: { fr: "Milliards d'étoiles tourbillonnant dans le cosmos", en: "Billions of stars swirling in the cosmos", es: "Miles de millones de estrellas en el cosmos" }
  },
  {
    url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1200&auto=format&fit=crop",
    title: { fr: "Sortie extravéhiculaire", en: "Spacewalk (EVA)", es: "Caminata espacial" },
    desc: { fr: "Astronaute en apesanteur au-dessus de la planète", en: "Astronaut floating in zero-gravity over Earth", es: "Astronauta en gravedad cero sobre la Tierra" }
  }
];

// ==========================================================================
// 4. ÉTAT GLOBAL DE L'APPLICATION
// ==========================================================================
let appState = {
  language: "fr",
  country: "Côte d'Ivoire",
  userLat: 7.54,
  userLon: -5.55,
  isGPSActive: false,
  theme: "dark",
  units: {
    distance: "km",    // km, m, miles
    speed: "km/h",     // km/h, m/s, mph
    altitude: "km",    // km, m, miles
    temperature: "C"   // C, F
  },
  currentScreen: "home",
  issData: {
    latitude: 0,
    longitude: 0,
    altitude: 420,     // km
    velocity: 27600,   // km/h
    timestamp: 0,
    distanceKm: 0
  },
  weatherData: {
    tempC: null,
    feelsLikeC: null,
    humidity: null,
    windSpeedKmh: null,
    weatherCode: 0,
    rainProb: null,
    isDay: 1
  },
  galleryIndex: 0,
  isOnline: navigator.onLine,
  issFetchTimer: null,
  weatherFetchTimer: null,
  galleryTimer: null
};

// ==========================================================================
// 5. FONCTIONS PRINCIPALES DU CYCLE DE VIE
// ==========================================================================

/**
 * Initialise l'application au chargement
 */
function initializeApp() {
  // Création des étoiles d'arrière-plan sur canvas
  initStarfield();

  // Remplissage des listes de pays
  populateCountrySelects();

  // Chargement des paramètres depuis LocalStorage
  const hasSavedSettings = loadSettings();

  // Si des préférences existent déjà, masquer l'accueil et lancer le dashboard
  if (hasSavedSettings) {
    document.getElementById("welcome-screen").style.display = "none";
    applyTheme(appState.theme);
    changeLanguage(appState.language);
    showScreen(appState.currentScreen || "home");
  } else {
    // Afficher l'écran de bienvenue
    document.getElementById("welcome-screen").style.display = "flex";
    applyTheme("dark");
    changeLanguage("fr");
  }

  // Configuration des écouteurs d'événements
  setupEventListeners();

  // Démarrage des flux de données en temps réel
  loadISSData();
  loadWeather();
  initSpaceGallery();

  // Intervalles de mise à jour
  // ISS toutes les 5 secondes
  appState.issFetchTimer = setInterval(loadISSData, 5000);
  // Météo toutes les 10 minutes
  appState.weatherFetchTimer = setInterval(loadWeather, 10 * 60 * 1000);
  // Galerie spatiale toutes les 30 minutes
  appState.galleryTimer = setInterval(changeSpaceImage, 30 * 60 * 1000);

  // Écoute des événements réseau
  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
}

/**
 * Configure les écouteurs d'événements de l'interface
 */
function setupEventListeners() {
  // Bouton COMMENCER de l'écran de bienvenue
  const startBtn = document.getElementById("welcome-start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const selectedCountry = document.getElementById("welcome-country-select").value;
      const selectedLang = document.getElementById("welcome-lang-select").value;

      appState.country = selectedCountry;
      if (countries[selectedCountry]) {
        appState.userLat = countries[selectedCountry].latitude;
        appState.userLon = countries[selectedCountry].longitude;
        appState.isGPSActive = false;
      }
      appState.language = selectedLang;

      saveSettings();
      changeLanguage(selectedLang);
      document.getElementById("welcome-screen").style.display = "none";
      showScreen("home");
      loadWeather();
      loadISSData();
    });
  }

  // Navigation inférieure (Navbar)
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetScreen = item.getAttribute("data-screen");
      if (targetScreen) {
        showScreen(targetScreen);
      }
    });
  });

  // Boutons Me Localiser (GPS)
  const gpsButtons = document.querySelectorAll(".btn-gps-locate");
  gpsButtons.forEach(btn => {
    btn.addEventListener("click", locateUserWithGPS);
  });

  // Formulaire de paramètres
  const settingsForm = document.getElementById("settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveSettingsFromUI();
      showToast(translations[appState.language].settingsSaved, "success");
    });
  }

  // Bouton Effacer les données (Modale)
  const clearDataBtn = document.getElementById("btn-clear-data");
  if (clearDataBtn) {
    clearDataBtn.addEventListener("click", () => {
      openClearDataModal();
    });
  }

  // Bouton confirmation modale suppression
  const confirmClearBtn = document.getElementById("modal-confirm-clear");
  if (confirmClearBtn) {
    confirmClearBtn.addEventListener("click", () => {
      resetUserData();
      closeClearDataModal();
    });
  }

  // Bouton annulation modale suppression
  const cancelClearBtn = document.getElementById("modal-cancel-clear");
  if (cancelClearBtn) {
    cancelClearBtn.addEventListener("click", closeClearDataModal);
  }

  // Bouton nouvelle image spatiale
  const nextImageBtn = document.getElementById("btn-next-space-image");
  if (nextImageBtn) {
    nextImageBtn.addEventListener("click", () => {
      changeSpaceImage();
    });
  }

  // Bouton bascule de thème rapide dans l'en-tête
  const themeToggleHeader = document.getElementById("header-theme-toggle");
  if (themeToggleHeader) {
    themeToggleHeader.addEventListener("click", () => {
      const newTheme = appState.theme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      appState.theme = newTheme;
      saveSettings();
    });
  }
}

/**
 * Peuple les menus déroulants des pays
 */
function populateCountrySelects() {
  const welcomeSelect = document.getElementById("welcome-country-select");
  const settingsSelect = document.getElementById("settings-country-select");

  const countryKeys = Object.keys(countries);

  [welcomeSelect, settingsSelect].forEach(select => {
    if (!select) return;
    select.innerHTML = "";
    countryKeys.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    });
  });
}

// ==========================================================================
// 6. GESTION DU STOCKAGE LOCAL (LOCALSTORAGE)
// ==========================================================================

/**
 * Charge les paramètres sauvegardés depuis localStorage
 * @returns {boolean} Vrai si des préférences existent
 */
function loadSettings() {
  try {
    const saved = localStorage.getItem("iss_tracker_preferences");
    if (!saved) return false;

    const data = JSON.parse(saved);
    if (data.country && countries[data.country]) {
      appState.country = data.country;
      appState.userLat = data.userLat !== undefined ? data.userLat : countries[data.country].latitude;
      appState.userLon = data.userLon !== undefined ? data.userLon : countries[data.country].longitude;
      appState.isGPSActive = !!data.isGPSActive;
    }
    if (data.language && translations[data.language]) {
      appState.language = data.language;
    }
    if (data.theme) {
      appState.theme = data.theme;
    }
    if (data.units) {
      appState.units = { ...appState.units, ...data.units };
    }

    // Mise à jour de l'UI des paramètres
    updateSettingsUI();
    return true;
  } catch (err) {
    console.error("Erreur lors du chargement des paramètres :", err);
    return false;
  }
}

/**
 * Enregistre l'état actuel des paramètres dans localStorage
 */
function saveSettings() {
  try {
    const dataToSave = {
      country: appState.country,
      userLat: appState.userLat,
      userLon: appState.userLon,
      isGPSActive: appState.isGPSActive,
      language: appState.language,
      theme: appState.theme,
      units: appState.units
    };
    localStorage.setItem("iss_tracker_preferences", JSON.stringify(dataToSave));
  } catch (err) {
    console.error("Erreur lors de la sauvegarde :", err);
  }
}

/**
 * Enregistre les préférences depuis le formulaire des paramètres
 */
function saveSettingsFromUI() {
  const countryVal = document.getElementById("settings-country-select").value;
  const langVal = document.getElementById("settings-lang-select").value;
  const themeVal = document.getElementById("settings-theme-select").value;
  const unitDist = document.getElementById("settings-unit-distance").value;
  const unitSpeed = document.getElementById("settings-unit-speed").value;
  const unitAlt = document.getElementById("settings-unit-altitude").value;
  const unitTemp = document.getElementById("settings-unit-temp").value;

  if (countryVal !== appState.country) {
    appState.country = countryVal;
    if (countries[countryVal]) {
      appState.userLat = countries[countryVal].latitude;
      appState.userLon = countries[countryVal].longitude;
      appState.isGPSActive = false;
    }
    loadWeather();
  }

  appState.language = langVal;
  appState.theme = themeVal;
  appState.units = {
    distance: unitDist,
    speed: unitSpeed,
    altitude: unitAlt,
    temperature: unitTemp
  };

  applyTheme(appState.theme);
  changeLanguage(appState.language);
  saveSettings();
  updateISSPosition();
  updateWeatherUI();
}

/**
 * Met à jour les champs du formulaire paramètres
 */
function updateSettingsUI() {
  const countrySelect = document.getElementById("settings-country-select");
  const langSelect = document.getElementById("settings-lang-select");
  const themeSelect = document.getElementById("settings-theme-select");
  const unitDist = document.getElementById("settings-unit-distance");
  const unitSpeed = document.getElementById("settings-unit-speed");
  const unitAlt = document.getElementById("settings-unit-altitude");
  const unitTemp = document.getElementById("settings-unit-temp");

  if (countrySelect) countrySelect.value = appState.country;
  if (langSelect) langSelect.value = appState.language;
  if (themeSelect) themeSelect.value = appState.theme;
  if (unitDist) unitDist.value = appState.units.distance;
  if (unitSpeed) unitSpeed.value = appState.units.speed;
  if (unitAlt) unitAlt.value = appState.units.altitude;
  if (unitTemp) unitTemp.value = appState.units.temperature;
}

/**
 * Réinitialise complètement les données utilisateur
 */
function resetUserData() {
  try {
    localStorage.removeItem("iss_tracker_preferences");
  } catch (e) {}

  appState.language = "fr";
  appState.country = "Côte d'Ivoire";
  appState.userLat = 7.54;
  appState.userLon = -5.55;
  appState.isGPSActive = false;
  appState.theme = "dark";
  appState.units = { distance: "km", speed: "km/h", altitude: "km", temperature: "C" };

  applyTheme("dark");
  changeLanguage("fr");
  updateSettingsUI();

  document.getElementById("welcome-screen").style.display = "flex";
  showScreen("home");
  showToast(translations.fr.dataCleared, "info");
}

// ==========================================================================
// 7. GÉOLOCALISATION GPS
// ==========================================================================

function locateUserWithGPS() {
  if (!navigator.geolocation) {
    showToast(translations[appState.language].errGPS, "error");
    return;
  }

  showToast("📍 Recherche de votre position GPS...", "info");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      appState.userLat = Number(position.coords.latitude.toFixed(4));
      appState.userLon = Number(position.coords.longitude.toFixed(4));
      appState.isGPSActive = true;
      appState.country = translations[appState.language].locateUsingGPS;

      saveSettings();
      updateUserPositionUI();
      updateISSPosition();
      loadWeather();
      showToast("📍 Position GPS synchronisée !", "success");
    },
    (error) => {
      console.warn("Erreur GPS :", error);
      showToast(translations[appState.language].errGPS, "error");
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

// ==========================================================================
// 8. TÉLÉMÉTRIE ISS EN TEMPS RÉEL (APIs PUBLIQUES)
// ==========================================================================

/**
 * Récupère les coordonnées et données orbitales de l'ISS
 */
async function loadISSData() {
  if (!navigator.onLine) {
    updateOnlineBadge(false);
    return;
  }

  try {
    // API Principale : WhereTheISS.at (rapide, détaillée et sans clé)
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    if (!response.ok) throw new Error("HTTP " + response.status);

    const data = await response.json();

    appState.issData.latitude = data.latitude;
    appState.issData.longitude = data.longitude;
    appState.issData.altitude = data.altitude; // km
    appState.issData.velocity = data.velocity; // km/h
    appState.issData.timestamp = data.timestamp * 1000;

    updateISSPosition();
    updateOnlineBadge(true);
  } catch (error) {
    console.warn("Échec API WhereTheISS, tentative de repli Open-Notify :", error);
    tryFallbackISS();
  }
}

/**
 * API de secours pour l'ISS (Open-Notify)
 */
async function tryFallbackISS() {
  try {
    const fallbackRes = await fetch("https://api.open-notify.org/iss-now.json");
    if (!fallbackRes.ok) throw new Error("Fallback failed");
    const data = await fallbackRes.json();

    if (data && data.iss_position) {
      appState.issData.latitude = parseFloat(data.iss_position.latitude);
      appState.issData.longitude = parseFloat(data.iss_position.longitude);
      appState.issData.altitude = 420; // Valeur orbitale moyenne
      appState.issData.velocity = 27600; // Vitesse orbitale moyenne
      appState.issData.timestamp = Date.now();

      updateISSPosition();
      updateOnlineBadge(true);
    }
  } catch (err2) {
    console.error("Impossible de joindre les APIs ISS :", err2);
    // Affichage toast d'erreur discret sans alert
    const lastUpdateElem = document.getElementById("iss-last-update");
    if (lastUpdateElem) {
      lastUpdateElem.textContent = "Erreur de connexion";
    }
  }
}

/**
 * Met à jour l'affichage de la position de l'ISS, de la carte et de la distance
 */
function updateISSPosition() {
  const { latitude, longitude, altitude, velocity, timestamp } = appState.issData;

  // 1. Mise à jour des valeurs textuelles
  const latElems = document.querySelectorAll(".iss-lat-val");
  const lonElems = document.querySelectorAll(".iss-lon-val");
  const altElems = document.querySelectorAll(".iss-alt-val");
  const speedElems = document.querySelectorAll(".iss-speed-val");
  const updateElems = document.querySelectorAll(".iss-update-val");

  latElems.forEach(el => el.textContent = formatCoords(latitude, 'lat'));
  lonElems.forEach(el => el.textContent = formatCoords(longitude, 'lon'));
  altElems.forEach(el => el.textContent = convertAltitude(altitude));
  speedElems.forEach(el => el.textContent = convertSpeed(velocity));

  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
  updateElems.forEach(el => el.textContent = timeStr);

  // 2. Calcul et affichage de la distance Haversine
  const distanceKm = calculateDistance(
    appState.userLat,
    appState.userLon,
    latitude,
    longitude
  );
  appState.issData.distanceKm = distanceKm;

  const distElems = document.querySelectorAll(".iss-dist-val");
  distElems.forEach(el => el.textContent = convertDistance(distanceKm));

  // 3. Calcul de la probabilité de passage / visibilité
  calculateVisibilityProbability(distanceKm, appState.weatherData);

  // 4. Positionnement du point rouge sur la carte terrestre (terre.png)
  updateMapMarkers(latitude, longitude);

  // 5. Mise à jour des infos utilisateur
  updateUserPositionUI();
}

/**
 * Met à jour les marqueurs CSS sur l'image de la Terre (terre.png)
 */
function updateMapMarkers(issLat, issLon) {
  const issMarker = document.getElementById("iss-map-marker");
  const userMarker = document.getElementById("user-map-marker");

  // Formule de projection équirectangulaire cylindrique adaptée
  // x = ((lon + 180) / 360) * 100%
  // y = ((90 - lat) / 180) * 100%
  const issX = ((issLon + 180) / 360) * 100;
  const issY = ((90 - issLat) / 180) * 100;

  if (issMarker) {
    issMarker.style.left = `${issX}%`;
    issMarker.style.top = `${issY}%`;
  }

  if (userMarker) {
    const userX = ((appState.userLon + 180) / 360) * 100;
    const userY = ((90 - appState.userLat) / 180) * 100;
    userMarker.style.left = `${userX}%`;
    userMarker.style.top = `${userY}%`;
  }
}

/**
 * Met à jour les textes relatifs à la position utilisateur
 */
function updateUserPositionUI() {
  const countryElems = document.querySelectorAll(".user-country-val");
  const latElems = document.querySelectorAll(".user-lat-val");
  const lonElems = document.querySelectorAll(".user-lon-val");

  countryElems.forEach(el => el.textContent = appState.country);
  latElems.forEach(el => el.textContent = formatCoords(appState.userLat, 'lat'));
  lonElems.forEach(el => el.textContent = formatCoords(appState.userLon, 'lon'));
}

// ==========================================================================
// 9. CALCUL DE LA DISTANCE (FORMULE DE HAVERSINE)
// ==========================================================================

/**
 * Calcule la distance orthodromique entre deux points géodésiques en km
 * @param {number} lat1 Latitude point 1
 * @param {number} lon1 Longitude point 1
 * @param {number} lat2 Latitude point 2
 * @param {number} lon2 Longitude point 2
 * @returns {number} Distance en kilomètres
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon moyen de la Terre en km
  const toRad = (angle) => (angle * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const surfaceDistance = R * c;

  // Prise en compte de l'altitude de l'ISS (environ 420 km) par Pythagore sphérique
  const totalDistance = Math.sqrt(
    Math.pow(surfaceDistance, 2) + Math.pow(appState.issData.altitude || 420, 2)
  );

  return Math.round(totalDistance);
}

// ==========================================================================
// 10. MÉTÉO LOCALE (API OPEN-METEO)
// ==========================================================================

/**
 * Récupère les données météo du point de référence utilisateur
 */
async function loadWeather() {
  if (!navigator.onLine) return;

  try {
    const lat = appState.userLat;
    const lon = appState.userLon;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP " + response.status);

    const data = await response.json();
    const cur = data.current;

    appState.weatherData = {
      tempC: cur.temperature_2m,
      feelsLikeC: cur.apparent_temperature,
      humidity: cur.relative_humidity_2m,
      windSpeedKmh: cur.wind_speed_10m,
      weatherCode: cur.weather_code,
      rainProb: cur.precipitation_probability !== undefined ? cur.precipitation_probability : 0,
      isDay: cur.is_day !== undefined ? cur.is_day : 1
    };

    updateWeatherUI();
    // Recalcul de l'estimation de visibilité avec la nouvelle météo
    calculateVisibilityProbability(appState.issData.distanceKm, appState.weatherData);
  } catch (error) {
    console.warn("Erreur lors de la récupération météo :", error);
  }
}

/**
 * Met à jour les éléments visuels de la météo
 */
function updateWeatherUI() {
  const w = appState.weatherData;
  const lang = appState.language;
  const t = translations[lang];

  const tempElems = document.querySelectorAll(".weather-temp-val");
  const feelsElems = document.querySelectorAll(".weather-feels-val");
  const humElems = document.querySelectorAll(".weather-hum-val");
  const windElems = document.querySelectorAll(".weather-wind-val");
  const condElems = document.querySelectorAll(".weather-cond-val");
  const rainElems = document.querySelectorAll(".weather-rain-val");
  const skyElems = document.querySelectorAll(".weather-sky-val");

  if (w.tempC !== null) {
    tempElems.forEach(el => el.textContent = convertTemperature(w.tempC));
    feelsElems.forEach(el => el.textContent = convertTemperature(w.feelsLikeC));
    humElems.forEach(el => el.textContent = `${w.humidity} %`);
    windElems.forEach(el => el.textContent = convertSpeed(w.windSpeedKmh));
    condElems.forEach(el => el.textContent = getWeatherDescription(w.weatherCode, lang));
    rainElems.forEach(el => el.textContent = `${w.rainProb || 0} %`);
    skyElems.forEach(el => el.textContent = w.isDay ? t.day : t.night);
  }
}

/**
 * Convertit le code WMO Open-Meteo en description textuelle claire
 */
function getWeatherDescription(code, lang) {
  const codes = {
    0: { fr: "☀️ Ciel dégagé", en: "☀️ Clear sky", es: "☀️ Cielo despejado" },
    1: { fr: "🌤️ Principalement dégagé", en: "🌤️ Mainly clear", es: "🌤️ Mayormente despejado" },
    2: { fr: "⛅ Partiellement nuageux", en: "⛅ Partly cloudy", es: "⛅ Parcialmente nublado" },
    3: { fr: "☁️ Couvert", en: "☁️ Overcast", es: "☁️ Nublado" },
    45: { fr: "🌫️ Brouillard", en: "🌫️ Foggy", es: "🌫️ Niebla" },
    48: { fr: "🌫️ Brouillard givrant", en: "🌫️ Depositing rime fog", es: "🌫️ Niebla con escarcha" },
    51: { fr: "🌦️ Bruine légère", en: "🌦️ Light drizzle", es: "🌦️ Llovizna ligera" },
    61: { fr: "🌧️ Pluie légère", en: "🌧️ Slight rain", es: "🌧️ Lluvia ligera" },
    63: { fr: "🌧️ Pluie modérée", en: "🌧️ Moderate rain", es: "🌧️ Lluvia moderada" },
    65: { fr: "🌧️ Forte pluie", en: "🌧️ Heavy rain", es: "🌧️ Lluvia fuerte" },
    71: { fr: "🌨️ Chute de neige", en: "🌨️ Snow fall", es: "🌨️ Nevada" },
    80: { fr: "🌦️ Averses de pluie", en: "🌦️ Rain showers", es: "🌦️ Chubascos" },
    95: { fr: "⛈️ Orage", en: "⛈️ Thunderstorm", es: "⛈️ Tormenta" }
  };
  return codes[code] ? codes[code][lang] : { fr: "☁️ Variable", en: "☁️ Variable", es: "☁️ Variable" }[lang];
}

// ==========================================================================
// 11. ALGORITHME D'ESTIMATION DE LA VISIBILITÉ DE PASSAGE
// ==========================================================================

/**
 * Évalue la probabilité de visibilité de l'ISS
 * @param {number} distance Distance en km
 * @param {object} weather Données météo
 */
function calculateVisibilityProbability(distance, weather) {
  const lang = appState.language;
  const t = translations[lang];

  // Étape 1 : Analyse de la distance
  // Proche : < 1000 km, Moyenne : 1000 - 2500 km, Éloignée : > 2500 km
  let distanceScore = 0; // 0 = loin, 1 = moyen, 2 = proche
  if (distance < 1000) {
    distanceScore = 2;
  } else if (distance < 2500) {
    distanceScore = 1;
  } else {
    distanceScore = 0;
  }

  // Étape 2 : Analyse de la météo (ciel dégagé vs pluie/nuages)
  const isCloudyOrRainy = weather.weatherCode >= 3 || (weather.rainProb && weather.rainProb > 40);
  const isClear = weather.weatherCode <= 1;

  let weatherScore = 1; // 0 = mauvais, 1 = moyen, 2 = excellent
  if (isClear) weatherScore = 2;
  else if (isCloudyOrRainy) weatherScore = 0;

  // Étape 3 : Calcul combiné
  // Score total sur 4
  const totalScore = distanceScore + weatherScore;

  let level = "low"; // low, medium, high
  let headline = t.visibilityLow;
  let desc = t.visibilityLowDesc;

  if (distanceScore === 2 && weatherScore >= 1) {
    level = "high";
    headline = t.visibilityHigh;
    desc = t.visibilityHighDesc;
  } else if ((distanceScore === 1 && weatherScore >= 1) || (distanceScore === 2 && weatherScore === 0)) {
    level = "medium";
    headline = t.visibilityMed;
    desc = t.visibilityMedDesc;
  } else {
    level = "low";
    headline = t.visibilityLow;
    desc = t.visibilityLowDesc;
  }

  // Mise à jour de l'UI
  const banner = document.getElementById("visibility-banner");
  const titleElem = document.getElementById("visibility-headline");
  const descElem = document.getElementById("visibility-desc");
  const stepDistElem = document.getElementById("step-dist-text");
  const stepWeatherElem = document.getElementById("step-weather-text");

  if (banner && titleElem && descElem) {
    banner.className = `visibility-banner ${level}`;
    titleElem.textContent = headline;
    descElem.textContent = desc;
  }

  if (stepDistElem) {
    stepDistElem.textContent = `${t.step1DistanceDesc} ${convertDistance(distance)} (${distance < 1000 ? 'Proche < 1000km' : distance < 2500 ? 'Zone intermédiaire' : 'Éloignée'})`;
  }
  if (stepWeatherElem) {
    stepWeatherElem.textContent = `${getWeatherDescription(weather.weatherCode, lang)} • ${weather.isDay ? t.day : t.night}`;
  }
}

// ==========================================================================
// 12. FONCTIONS DE CONVERSIONS D'UNITÉS
// ==========================================================================

/**
 * Convertit une distance en km vers l'unité choisie
 * @param {number} km Distance en km
 * @returns {string} Texte formaté avec unité
 */
function convertDistance(km) {
  if (km === null || km === undefined || isNaN(km)) return "--";
  const unit = appState.units.distance;

  if (unit === "m") {
    const meters = Math.round(km * 1000);
    return `${meters.toLocaleString()} m`;
  } else if (unit === "miles") {
    const miles = Math.round(km * 0.621371);
    return `${miles.toLocaleString()} mi`;
  }
  // Défaut : km
  return `${Math.round(km).toLocaleString()} km`;
}

/**
 * Convertit une vitesse en km/h vers l'unité choisie
 * @param {number} kmh Vitesse en km/h
 * @returns {string} Texte formaté
 */
function convertSpeed(kmh) {
  if (kmh === null || kmh === undefined || isNaN(kmh)) return "--";
  const unit = appState.units.speed;

  if (unit === "m/s") {
    const ms = Math.round(kmh / 3.6);
    return `${ms.toLocaleString()} m/s`;
  } else if (unit === "mph") {
    const mph = Math.round(kmh * 0.621371);
    return `${mph.toLocaleString()} mph`;
  }
  // Défaut : km/h
  return `${Math.round(kmh).toLocaleString()} km/h`;
}

/**
 * Convertit une altitude en km vers l'unité choisie
 * @param {number} km Altitude en km
 * @returns {string} Texte formaté
 */
function convertAltitude(km) {
  if (km === null || km === undefined || isNaN(km)) return "--";
  const unit = appState.units.altitude;

  if (unit === "m") {
    const meters = Math.round(km * 1000);
    return `${meters.toLocaleString()} m`;
  } else if (unit === "miles") {
    const miles = (km * 0.621371).toFixed(1);
    return `${miles} mi`;
  }
  // Défaut : km
  return `${Number(km).toFixed(1)} km`;
}

/**
 * Convertit une température en Celsius vers l'unité choisie
 * @param {number} c Température en °C
 * @returns {string} Texte formaté
 */
function convertTemperature(c) {
  if (c === null || c === undefined || isNaN(c)) return "--";
  const unit = appState.units.temperature;

  if (unit === "F") {
    const f = Math.round((c * 9) / 5 + 32);
    return `${f} °F`;
  }
  // Défaut : °C
  return `${Math.round(c)} °C`;
}

/**
 * Formate des coordonnées géographiques avec symbole N/S/E/O
 */
function formatCoords(val, type) {
  if (val === null || val === undefined || isNaN(val)) return "--";
  const num = Number(val);
  if (type === 'lat') {
    const dir = num >= 0 ? 'N' : 'S';
    return `${Math.abs(num).toFixed(2)}° ${dir}`;
  } else {
    const dir = num >= 0 ? 'E' : 'O';
    return `${Math.abs(num).toFixed(2)}° ${dir}`;
  }
}

// ==========================================================================
// 13. GALERIE SPATIALE & IMAGES
// ==========================================================================

function initSpaceGallery() {
  updateGalleryUI();
}

/**
 * Change l'image spatiale affichée avec effet de transition douce
 */
function changeSpaceImage() {
  const imgElem = document.getElementById("space-gallery-img");
  if (!imgElem) return;

  // Effet de fondu en sortie
  imgElem.classList.add("fading");

  setTimeout(() => {
    // Sélection aléatoire d'une image différente
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * spaceImages.length);
    } while (nextIndex === appState.galleryIndex && spaceImages.length > 1);

    appState.galleryIndex = nextIndex;
    updateGalleryUI();

    // Effet de fondu en entrée
    imgElem.classList.remove("fading");
  }, 400);
}

function updateGalleryUI() {
  const imgElem = document.getElementById("space-gallery-img");
  const titleElem = document.getElementById("space-gallery-title");
  const descElem = document.getElementById("space-gallery-desc");

  const item = spaceImages[appState.galleryIndex];
  if (!item) return;

  const lang = appState.language;

  if (imgElem) {
    imgElem.src = item.url;
    imgElem.alt = item.title[lang] || item.title.fr;
  }
  if (titleElem) {
    titleElem.textContent = item.title[lang] || item.title.fr;
  }
  if (descElem) {
    descElem.textContent = item.desc[lang] || item.desc.fr;
  }
}

// ==========================================================================
// 14. SYSTÈME MULTILINGUE & TRADUCTION
// ==========================================================================

/**
 * Applique la langue sélectionnée à toute l'interface
 * @param {string} lang Code langue ('fr', 'en', 'es')
 */
function changeLanguage(lang) {
  if (!translations[lang]) lang = "fr";
  appState.language = lang;
  const t = translations[lang];

  // Traduction de tous les éléments possédant data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Traduction des boutons / placeholders spécifiques
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (t[key]) {
      el.title = t[key];
    }
  });

  // Mise à jour de la galerie et des cartes
  updateGalleryUI();
  updateISSPosition();
  updateWeatherUI();
}

// ==========================================================================
// 15. GESTION DES ÉCRANS & NAVIGATION (SPA SANS RECHARGEMENT)
// ==========================================================================

/**
 * Affiche l'écran demandé et active l'icône correspondante
 * @param {string} screenId Identifiant de l'écran ('home', 'iss', 'weather', 'space', 'settings', 'about')
 */
function showScreen(screenId) {
  appState.currentScreen = screenId;

  // Masquer tous les écrans
  document.querySelectorAll(".screen").forEach(scr => {
    scr.classList.remove("active");
  });

  // Afficher l'écran ciblé
  const targetScreen = document.getElementById(`screen-${screenId}`);
  if (targetScreen) {
    targetScreen.classList.add("active");
  }

  // Mettre à jour l'état actif dans la navbar
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-screen") === screenId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Défiler vers le haut
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================================
// 16. GESTION DU THÈME SOMBRE / CLAIR
// ==========================================================================

/**
 * Bascule entre le thème sombre spatial et le thème clair
 * @param {string} theme 'dark' ou 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const themeToggleHeader = document.getElementById("header-theme-toggle");
  if (themeToggleHeader) {
    themeToggleHeader.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// ==========================================================================
// 17. ÉTAT DE CONNEXION RÉSEAU & TOAST NOTIFICATIONS
// ==========================================================================

function handleNetworkChange() {
  const isOnline = navigator.onLine;
  appState.isOnline = isOnline;
  updateOnlineBadge(isOnline);

  const t = translations[appState.language];
  if (isOnline) {
    showToast(t.connectionRestored, "success");
    loadISSData();
    loadWeather();
  } else {
    showToast(t.errOffline, "error");
  }
}

function updateOnlineBadge(isOnline) {
  const pill = document.getElementById("header-status-pill");
  const text = document.getElementById("header-status-text");
  const t = translations[appState.language];

  if (pill && text) {
    if (isOnline) {
      pill.classList.remove("offline");
      text.textContent = t.onlineStatus;
    } else {
      pill.classList.add("offline");
      text.textContent = t.offlineStatus;
    }
  }
}

/**
 * Affiche une notification Toast élégante dans l'application (pas d'alert())
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

// ==========================================================================
// 18. MODALE DE SUPPRESSION DES DONNÉES (AUCUN CONFIRM() NATIF)
// ==========================================================================

function openClearDataModal() {
  const modal = document.getElementById("clear-data-modal");
  if (modal) modal.classList.add("active");
}

function closeClearDataModal() {
  const modal = document.getElementById("clear-data-modal");
  if (modal) modal.classList.remove("active");
}

// ==========================================================================
// 19. CANEVAS D'ÉTOILES ANIMÉES (STARFIELD DE FOND)
// ==========================================================================

function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;

      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  render();
}

// ==========================================================================
// 20. DÉMARRAGE AUTOMATIQUE AU CHARGEMENT DU DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", initializeApp);
