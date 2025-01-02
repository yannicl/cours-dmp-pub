![entete](../header-dmp.png)

# Application meteo

## Objectifs

- Plugin Geolocation et Http de Capacitor
- Consommation d'une API Rest


## Démarrage

1. Création du projet.

~~~bash
$ ionic start my-meteo-app tabs --type vue
~~~

# Composants

# Plugins Capacitor

Ajout du [framework Capacitor](https://capacitorjs.com/docs/getting-started/with-ionic) au framework Ionic.

Ce framework permet l'utilisation de nombreux [plugins](https://capacitorjs.com/docs/plugins).

## [Geolocation](https://capacitorjs.com/docs/apis/geolocation)

Le plugin utilisé permet d'obtenir la localisation courante de l'utilisateur. Cela permet d'obtenir la météo locale.

Ce plugin est simple à utiliser.

~~~js
const printCurrentPosition = async () => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates); 
  } catch (error) {
    locationNotAvailable.value = true;
  }
};
~~~

## [CapacitorHttp](https://capacitorjs.com/docs/apis/http)

Ce plugin est utilisé pour effectuer les appels d'API.

~~~js
const options = {
    url: 'https://api.open-meteo.com/v1/forecast',
    params: {
      latitude: String(latitude),
      longitude: String(longitude),
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      forecast_days: '5',
      timezone: 'America/New_York'
    },
  };
const response: HttpResponse = await CapacitorHttp.get(options);
~~~

### [Configuration](https://capacitorjs.com/docs/apis/http#configuration)
Dans *capacitor.config.ts*
~~~js
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'my-meteo-app',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};
~~~

### [Typescript interface](https://www.typescriptlang.org/docs/handbook/2/objects.html)

Typescript permet de définir une interface pour la réponse d'une API Rest. Cette interface permet une certaine validation en plus de documenter le code.

~~~js
interface Daily {
    time: Array<string>,
    weather_code: Array<string>,
    temperature_2m_max: Array<number>,
    temperature_2m_min: Array<number>
};

const response: HttpResponse = await CapacitorHttp.get(options);

const dailyResponse = response.data.daily as Daily
~~~


# API Meteo

L'API Meteo utilisée est celle de [Open Meteo](https://open-meteo.com/).

## Weather Codes

Open Meteo utilise un code standardisé pour décrire le temps qu'il fait. Ce code est un nombre de 0 à 99. Pour chaque code, une icone de openweathermap a été associée.

- https://openweathermap.org/weather-conditions#Icon-list

Le fichier *WeatherCodes.ts* permet de récupérer l'icône et la description associée pour un code de météo. 

