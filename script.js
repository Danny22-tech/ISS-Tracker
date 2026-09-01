var ISS_API = "https://api.wheretheiss.at/v1/satellites/25544";
var WEATHER_API = "https://api.open-meteo.com/v1/forecast";
var GEO_API = "https://api.bigdatacloud.net/data/reverse-geocode-client";
var COUNTRY_API = "https://countries.dev/alpha/";

var issLatitude = null;
var issLongitude = null;
var issAltitude = null;
var userLatitude = null;
var userLongitude = null;
var issTimer = null;
var currentLang = "fr";
var currentCountry = "CI";
var lastCountryCode = "";

var texts = {
    fr: {
        welcome: "Suivre la Station Spatiale Internationale en direct",
        start: "Commencer",
        labelCountry: "Pays",
        labelLanguage: "Langue",
        navHome: "Accueil",
        navInfo: "Info",
        navSettings: "Paramètres",
        save: "Enregistrer",
        saved: "Préférences enregistrées.",
        mapHint: "Point rouge = position réelle de l'ISS",
        weatherHint: "Météo au point au sol de l'ISS (Open-Meteo)",
        countryHint: "Pays sous (ou près de) l'ISS quand c'est possible",
        locate: "📍 Autoriser la position",
        online: "🟢 ONLINE",
        offline: "🔴 OFFLINE",
        onlineDetail: "🟢 ONLINE - CONNEXION STABLE",
        offlineDetail: "🔴 OFFLINE - RÉSEAU INDISPONIBLE",
        apiReady: "API prête",
        apiIssError: "Impossible de récupérer les données de l'ISS.",
        apiWeatherError: "Les données météo sont momentanément indisponibles.",
        apiCountryError: "Les informations pays sont momentanément indisponibles.",
        needNet: "Connexion Internet nécessaire.",
        geoDenied: "Géolocalisation refusée. Distance non calculée.",
        geoError: "Impossible d'obtenir votre position.",
        geoWait: "En attente de votre position...",
        geoOk: "Distance calculée",
        geoNeedIss: "Position ISS en attente...",
        ocean: "Océan / hors terre",
        na: "Non disponible",
        probaEmpty: "Les données nécessaires pour une vraie prévision de passage (TLE + calcul d'orbite) ne sont pas utilisées ici. Aucune probabilité inventée n'est affichée.",
        probaNear: "Ceci n'est PAS une prévision de passage. C'est seulement un indicateur de proximité : plus l'ISS est proche de votre position au sol, plus le pourcentage est élevé.",
        whatsapp: "💬 Contacter sur WhatsApp",
        apk: "📱 Télécharger l'APK",
        settingsTitle: "⚙️ PARAMÈTRES",
        infoHtml:
            "<p>J'ai commencé ce projet pour suivre la Station Spatiale Internationale.</p>" +
            "<p>J'ai réalisé une grande partie de la structure. J'ai commencé le design. J'ai travaillé sur le système de navigation. J'ai préparé les emplacements des données. J'ai travaillé sur les API. J'ai commencé à donner un petit côté IA au projet.</p>" +
            "<p>Mais j'ai dû arrêter temporairement une partie du développement parce que la rentrée scolaire est arrivée. Je dois maintenant travailler mes cours, étudier davantage et renforcer mes connaissances. Le projet n'est donc pas totalement terminé. Je compte continuer progressivement.</p>" +
            "<p>Le design a été commencé mais certains éléments peuvent encore être améliorés.</p>" +
            "<p>L'application utilise différentes API pour les données spatiales, la météo, la géolocalisation et les informations sur les pays :</p>" +
            "<p>• Position ISS : API publique Where The ISS At (pas une API NASA directe).<br>" +
            "• Météo : Open-Meteo, au point au sol de l'ISS.<br>" +
            "• Pays : géocodage inverse BigDataCloud + données pays countries.dev.<br>" +
            "• Image de la Terre : carte NASA Blue Marble (domaine public), utilisée seulement comme fond de carte.</p>" +
            "<p>L'application possède également une version APK prévue dans le dossier APK. Le bouton Télécharger l'APK pointe vers APK/ISS.apk.</p>" +
            "<p>Aucune donnée n'est inventée : si une API ne fournit pas une information, l'application affiche — ou Non disponible.</p>"
    },
    en: {
        welcome: "Track the International Space Station live",
        start: "Start",
        labelCountry: "Country",
        labelLanguage: "Language",
        navHome: "Home",
        navInfo: "Info",
        navSettings: "Settings",
        save: "Save",
        saved: "Preferences saved.",
        mapHint: "Red dot = real ISS position",
        weatherHint: "Weather at the ISS ground point (Open-Meteo)",
        countryHint: "Country under (or near) the ISS when possible",
        locate: "📍 Allow location",
        online: "🟢 ONLINE",
        offline: "🔴 OFFLINE",
        onlineDetail: "🟢 ONLINE - STABLE CONNECTION",
        offlineDetail: "🔴 OFFLINE - NETWORK UNAVAILABLE",
        apiReady: "API ready",
        apiIssError: "Unable to fetch ISS data.",
        apiWeatherError: "Weather data is temporarily unavailable.",
        apiCountryError: "Country information is temporarily unavailable.",
        needNet: "Internet connection required.",
        geoDenied: "Location permission denied. Distance not calculated.",
        geoError: "Unable to get your position.",
        geoWait: "Waiting for your position...",
        geoOk: "Distance calculated",
        geoNeedIss: "Waiting for ISS position...",
        ocean: "Ocean / not over land",
        na: "Not available",
        probaEmpty: "The data needed for a real pass forecast (TLE + orbit calculation) is not used here. No made-up probability is shown.",
        probaNear: "This is NOT a pass forecast. It is only a proximity indicator: the closer the ISS ground point is to you, the higher the percentage.",
        whatsapp: "💬 Contact on WhatsApp",
        apk: "📱 Download APK",
        settingsTitle: "⚙️ SETTINGS",
        infoHtml:
            "<p>I started this project to track the International Space Station.</p>" +
            "<p>I built a large part of the structure. I started the design. I worked on navigation. I prepared the data slots. I worked on the APIs. I started adding a small AI touch to the project.</p>" +
            "<p>I had to pause part of the development because the school year started. I now need to study more and strengthen my knowledge. The project is therefore not fully finished. I plan to continue step by step.</p>" +
            "<p>The design was started, but some elements can still be improved.</p>" +
            "<p>The app uses different APIs for space data, weather, geolocation and country information:</p>" +
            "<p>• ISS position: public Where The ISS At API (not a direct NASA API).<br>" +
            "• Weather: Open-Meteo, at the ISS ground point.<br>" +
            "• Country: BigDataCloud reverse geocoding + countries.dev country data.<br>" +
            "• Earth image: NASA Blue Marble map (public domain), used only as a map background.</p>" +
            "<p>The app also has an APK version planned in the APK folder. The Download APK button points to APK/ISS.apk.</p>" +
            "<p>No data is invented: if an API does not provide a value, the app shows — or Not available.</p>"
    }
};

function setText(id, value) {
    var el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

function showError(message) {
    var box = document.getElementById("error-message");
    if (!message) {
        box.classList.add("hidden");
        box.textContent = "";
        return;
    }
    box.textContent = message;
    box.classList.remove("hidden");
}

function formatNumber(value, digits) {
    if (typeof value !== "number" || isNaN(value)) {
        return "—";
    }
    return value.toFixed(digits);
}

function orDash(value) {
    if (value === null || value === undefined || value === "") {
        return "—";
    }
    return value;
}

function changeLanguage(lang) {
    currentLang = lang;
    var t = texts[lang] || texts.fr;
    document.documentElement.lang = lang;

    document.getElementById("welcome-text").textContent = t.welcome;
    document.getElementById("start-button").textContent = t.start;
    document.getElementById("label-country").textContent = t.labelCountry;
    document.getElementById("label-language").textContent = t.labelLanguage;
    document.getElementById("settings-label-country").textContent = t.labelCountry;
    document.getElementById("settings-label-language").textContent = t.labelLanguage;
    document.getElementById("settings-title").textContent = t.settingsTitle;
    document.getElementById("save-settings").textContent = t.save;
    document.getElementById("nav-home").textContent = t.navHome;
    document.getElementById("nav-info").textContent = t.navInfo;
    document.getElementById("nav-settings").textContent = t.navSettings;
    document.getElementById("map-hint").textContent = t.mapHint;
    document.getElementById("weather-hint").textContent = t.weatherHint;
    document.getElementById("country-hint").textContent = t.countryHint;
    document.getElementById("locate-button").textContent = t.locate;
    document.getElementById("whatsapp-link").textContent = t.whatsapp;
    document.getElementById("apk-link").textContent = t.apk;
    document.getElementById("info-content").innerHTML = t.infoHtml;
    document.getElementById("probability-explain").textContent = t.probaEmpty;

    stateNetwork();
}

function saveSettings() {
    localStorage.setItem("iss-country", currentCountry);
    localStorage.setItem("iss-language", currentLang);
}

function startApp() {
    currentCountry = document.getElementById("country").value;
    currentLang = document.getElementById("language").value;
    saveSettings();
    changeLanguage(currentLang);

    document.getElementById("screen-1").classList.add("hidden");
    document.getElementById("app-shell").classList.remove("hidden");

    document.getElementById("settings-country").value = currentCountry;
    document.getElementById("settings-language").value = currentLang;

    getUserLocation();
    loadISS();

    if (issTimer) {
        clearInterval(issTimer);
    }
    issTimer = setInterval(function () {
        loadISS();
    }, 12000);
}

function gereclick(id) {
    var pages = ["screen-home", "screen-info", "screen-settings"];
    var i;
    for (i = 0; i < pages.length; i++) {
        document.getElementById(pages[i]).classList.add("hidden");
    }
    document.getElementById(id).classList.remove("hidden");

    document.getElementById("nav-home").classList.remove("active");
    document.getElementById("nav-info").classList.remove("active");
    document.getElementById("nav-settings").classList.remove("active");

    if (id === "screen-home") {
        document.getElementById("nav-home").classList.add("active");
    }
    if (id === "screen-info") {
        document.getElementById("nav-info").classList.add("active");
    }
    if (id === "screen-settings") {
        document.getElementById("nav-settings").classList.add("active");
    }
}

function stateNetwork() {
    var t = texts[currentLang] || texts.fr;
    var status = document.getElementById("network-status");
    var detail = document.getElementById("network-detail");
    var api = document.getElementById("api-status");

    if (navigator.onLine) {
        status.textContent = t.online;
        status.className = "network-ok";
        detail.textContent = t.onlineDetail;
        detail.style.color = "#86efac";
        api.textContent = t.apiReady;
        api.className = "api-ok";
        showError("");
    } else {
        status.textContent = t.offline;
        status.className = "network-off";
        detail.textContent = t.offlineDetail;
        detail.style.color = "#fca5a5";
        api.textContent = t.needNet;
        api.className = "api-off";
        showError(t.needNet);
    }
}

async function loadISS() {
    var t = texts[currentLang] || texts.fr;
    if (!navigator.onLine) {
        document.getElementById("api-status").textContent = t.needNet;
        document.getElementById("api-status").className = "api-off";
        return;
    }

    try {
        var response = await fetch(ISS_API);
        if (!response.ok) {
            throw new Error("iss");
        }
        var data = await response.json();

        issLatitude = data.latitude;
        issLongitude = data.longitude;
        issAltitude = data.altitude;

        setText("latitude", formatNumber(data.latitude, 4) + "°");
        setText("longitude", formatNumber(data.longitude, 4) + "°");
        setText("altitude", data.altitude !== undefined ? formatNumber(data.altitude, 1) + " km" : "—");
        setText("velocity", data.velocity !== undefined ? formatNumber(data.velocity, 1) + " km/h" : "—");
        setText("visibility", orDash(data.visibility));
        setText("footprint", data.footprint !== undefined ? formatNumber(data.footprint, 1) + " km" : "—");
        setText("solar-lat", data.solar_lat !== undefined ? formatNumber(data.solar_lat, 2) + "°" : "—");
        setText("solar-lon", data.solar_lon !== undefined ? formatNumber(data.solar_lon, 2) + "°" : "—");

        if (data.timestamp) {
            var date = new Date(data.timestamp * 1000);
            setText("timestamp", date.toLocaleString());
        } else {
            setText("timestamp", "—");
        }

        var orbit = [];
        if (data.name) {
            orbit.push(data.name.toUpperCase());
        }
        if (data.id) {
            orbit.push("NORAD " + data.id);
        }
        if (data.daynum !== undefined) {
            orbit.push("jour " + formatNumber(data.daynum, 2));
        }
        if (data.units) {
            orbit.push(data.units);
        }
        setText("orbit-info", orbit.length ? orbit.join(" · ") : "—");

        document.getElementById("api-status").textContent = t.apiReady;
        document.getElementById("api-status").className = "api-ok";
        showError("");

        updateMap();
        updateDistance();
        updateProbability();
        loadWeather(issLatitude, issLongitude);
        loadCountry(issLatitude, issLongitude);
    } catch (error) {
        document.getElementById("api-status").textContent = t.apiIssError;
        document.getElementById("api-status").className = "api-off";
        showError(t.apiIssError);
    }
}

async function loadWeather(lat, lon) {
    var t = texts[currentLang] || texts.fr;
    if (!navigator.onLine || lat === null || lon === null) {
        return;
    }

    var url = WEATHER_API +
        "?latitude=" + lat +
        "&longitude=" + lon +
        "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,precipitation,rain,showers,snowfall,weather_code,cloud_cover,shortwave_radiation";

    try {
        var response = await fetch(url);
        if (!response.ok) {
            throw new Error("weather");
        }
        var data = await response.json();
        var cur = data.current;
        var units = data.current_units || {};

        if (!cur) {
            throw new Error("weather");
        }

        setText("temperature", cur.temperature_2m !== undefined ? cur.temperature_2m + " " + (units.temperature_2m || "°C") : "—");
        setText("feels-like", cur.apparent_temperature !== undefined ? cur.apparent_temperature + " " + (units.apparent_temperature || "°C") : "—");
        setText("humidity", cur.relative_humidity_2m !== undefined ? cur.relative_humidity_2m + " %" : "—");
        setText("wind", cur.wind_speed_10m !== undefined ? cur.wind_speed_10m + " " + (units.wind_speed_10m || "km/h") : "—");
        setText("wind-dir", cur.wind_direction_10m !== undefined ? cur.wind_direction_10m + "°" : "—");
        setText("gusts", cur.wind_gusts_10m !== undefined ? cur.wind_gusts_10m + " " + (units.wind_gusts_10m || "km/h") : "—");
        setText("pressure", cur.surface_pressure !== undefined ? cur.surface_pressure + " " + (units.surface_pressure || "hPa") : "—");
        setText("precipitation", cur.precipitation !== undefined ? cur.precipitation + " " + (units.precipitation || "mm") : "—");
        setText("rain", cur.rain !== undefined ? cur.rain + " " + (units.rain || "mm") : "—");
        setText("showers", cur.showers !== undefined ? cur.showers + " " + (units.showers || "mm") : "—");
        setText("snow", cur.snowfall !== undefined ? cur.snowfall + " " + (units.snowfall || "cm") : "—");
        setText("weather-code", cur.weather_code !== undefined ? String(cur.weather_code) : "—");
        setText("clouds", cur.cloud_cover !== undefined ? cur.cloud_cover + " %" : "—");
        setText("radiation", cur.shortwave_radiation !== undefined ? cur.shortwave_radiation + " " + (units.shortwave_radiation || "W/m²") : "—");
    } catch (error) {
        showError(t.apiWeatherError);
    }
}

async function loadCountry(lat, lon) {
    var t = texts[currentLang] || texts.fr;
    if (!navigator.onLine || lat === null || lon === null) {
        return;
    }

    try {
        var geoUrl = GEO_API + "?latitude=" + lat + "&longitude=" + lon + "&localityLanguage=" + currentLang;
        var geoRes = await fetch(geoUrl);
        if (!geoRes.ok) {
            throw new Error("geo");
        }
        var geo = await geoRes.json();

        var code = geo.countryCode || "";
        var name = geo.countryName || "";

        if (!code || !name) {
            setText("country-name", t.ocean);
            setText("capital", "—");
            setText("continent", "—");
            setText("region", orDash(geo.localityInfo && geo.localityInfo.informative ? undefined : geo.principalSubdivision));
            setText("population", "—");
            setText("currency", "—");
            setText("languages", "—");
            setText("country-code", "—");
            lastCountryCode = "";
            return;
        }

        setText("country-name", name);
        setText("country-code", code);
        setText("region", orDash(geo.principalSubdivision || geo.locality));

        if (code === lastCountryCode) {
            return;
        }
        lastCountryCode = code;

        var countryRes = await fetch(COUNTRY_API + encodeURIComponent(code));
        if (!countryRes.ok) {
            setText("capital", "—");
            setText("continent", "—");
            setText("population", "—");
            setText("currency", "—");
            setText("languages", "—");
            return;
        }

        var country = await countryRes.json();
        var capital = "—";
        if (typeof country.capital === "string") {
            capital = country.capital;
        } else if (country.capital && country.capital[0]) {
            capital = country.capital[0];
        }

        var continent = country.region || "—";
        var region = country.subregion || country.region || document.getElementById("region").textContent;
        var population = country.population !== undefined ? Number(country.population).toLocaleString(currentLang) : "—";

        var currency = "—";
        if (Array.isArray(country.currencies) && country.currencies[0]) {
            currency = (country.currencies[0].name || country.currencies[0].code || "—");
            if (country.currencies[0].symbol) {
                currency += " (" + country.currencies[0].symbol + ")";
            }
        }

        var langs = "—";
        if (Array.isArray(country.languages)) {
            var names = [];
            var i;
            for (i = 0; i < country.languages.length; i++) {
                if (country.languages[i].name) {
                    names.push(country.languages[i].name);
                }
            }
            if (names.length) {
                langs = names.join(", ");
            }
        }

        setText("capital", capital);
        setText("continent", continent);
        setText("region", region);
        setText("population", population);
        setText("currency", currency);
        setText("languages", langs);
        setText("country-code", country.alpha2Code || code);
    } catch (error) {
        showError(t.apiCountryError);
    }
}

function updateMap() {
    if (issLatitude === null || issLongitude === null) {
        return;
    }

    var container = document.getElementById("map-container");
    var point = document.getElementById("iss-point");
    var width = container.clientWidth;
    var height = container.clientHeight;

    if (!width || !height) {
        return;
    }

    var x = (issLongitude + 180) / 360 * width;
    var y = (90 - issLatitude) / 180 * height;

    point.style.left = x + "px";
    point.style.top = y + "px";
}

function calculDistance(lat1, lon1, lat2, lon2) {
    var r = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return r * c;
}

function updateDistance() {
    var t = texts[currentLang] || texts.fr;

    if (userLatitude === null || userLongitude === null) {
        return;
    }
    if (issLatitude === null || issLongitude === null) {
        setText("distance-status", t.geoNeedIss);
        return;
    }

    var km = calculDistance(userLatitude, userLongitude, issLatitude, issLongitude);
    var line = km;
    if (issAltitude !== null) {
        var slant = Math.sqrt(km * km + issAltitude * issAltitude);
        setText("distance", formatNumber(km, 0) + " km (" + formatNumber(slant, 0) + " km 3D)");
    } else {
        setText("distance", formatNumber(km, 0) + " km");
    }
    setText("distance-status", t.geoOk);
}

function updateProbability() {
    var t = texts[currentLang] || texts.fr;
    var box = document.getElementById("probability");
    var explain = document.getElementById("probability-explain");

    if (userLatitude === null || userLongitude === null || issLatitude === null || issLongitude === null) {
        box.textContent = "—";
        explain.textContent = t.probaEmpty;
        return;
    }

    var km = calculDistance(userLatitude, userLongitude, issLatitude, issLongitude);
    var score = 100 - (km / 40);
    if (score < 0) {
        score = 0;
    }
    if (score > 100) {
        score = 100;
    }
    box.textContent = Math.round(score) + "%";
    explain.textContent = t.probaNear;
}

function getUserLocation() {
    var t = texts[currentLang] || texts.fr;
    setText("distance-status", t.geoWait);

    if (!navigator.geolocation) {
        setText("distance-status", t.geoError);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (pos) {
            userLatitude = pos.coords.latitude;
            userLongitude = pos.coords.longitude;
            setText("user-latitude", formatNumber(userLatitude, 4) + "°");
            setText("user-longitude", formatNumber(userLongitude, 4) + "°");
            updateDistance();
            updateProbability();
        },
        function (err) {
            if (err && err.code === 1) {
                setText("distance-status", t.geoDenied);
            } else {
                setText("distance-status", t.geoError);
            }
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

function toggleMusic() {
    var audio = document.getElementById("bg-music");
    if (audio.paused) {
        var playPromise = audio.play();
        if (playPromise && playPromise.catch) {
            playPromise.catch(function () {
                showError(currentLang === "en" ? "Add MUSIQUE/Music.mp3 to play music." : "Ajoutez MUSIQUE/Music.mp3 pour lancer la musique.");
            });
        }
    } else {
        audio.pause();
    }
}

function initApp() {
    var savedLang = localStorage.getItem("iss-language");
    var savedCountry = localStorage.getItem("iss-country");

    if (savedLang) {
        document.getElementById("language").value = savedLang;
        currentLang = savedLang;
    }
    if (savedCountry) {
        document.getElementById("country").value = savedCountry;
        currentCountry = savedCountry;
    }

    changeLanguage(currentLang);
    stateNetwork();

    document.getElementById("start-button").addEventListener("click", startApp);
    document.getElementById("nav-home").addEventListener("click", function () {
        gereclick("screen-home");
    });
    document.getElementById("nav-info").addEventListener("click", function () {
        gereclick("screen-info");
    });
    document.getElementById("nav-settings").addEventListener("click", function () {
        gereclick("screen-settings");
    });
    document.getElementById("save-settings").addEventListener("click", function () {
        currentCountry = document.getElementById("settings-country").value;
        currentLang = document.getElementById("settings-language").value;
        document.getElementById("country").value = currentCountry;
        document.getElementById("language").value = currentLang;
        saveSettings();
        changeLanguage(currentLang);
        document.getElementById("settings-message").textContent = texts[currentLang].saved;
        if (issLatitude !== null) {
            loadCountry(issLatitude, issLongitude);
        }
    });
    document.getElementById("locate-button").addEventListener("click", getUserLocation);
    document.getElementById("music-toggle").addEventListener("click", toggleMusic);
    window.addEventListener("online", stateNetwork);
    window.addEventListener("offline", stateNetwork);
    window.addEventListener("resize", updateMap);

    if (savedLang && savedCountry) {
        startApp();
    }
}

document.addEventListener("DOMContentLoaded", initApp);
