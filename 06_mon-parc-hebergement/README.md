![entete](../header-dmp.png)

# Application Parc Nature - Section hébergement

## Objectifs

- consommation d'API Rest, gestion d'erreur lors de l'appel

## Installation

1. Décompresser le zip fourni
2. npm install

## Démarrage

1. Démarrer l'application avec Vite
~~~bash
npm run dev
~~~
2. Démarrer le backend avec node
~~~bash
npm run backend
~~~

## Fonctionnement

### Observer le fonctionnement du composant *HebergementCard*

Usage de [props](https://fr.vuejs.org/guide/components/props.html) pour passer l'information du composant parent au composant enfant.

Usage d'[événements](https://fr.vuejs.org/guide/components/events.html) pour traiter des actions sur le composant enfant au niveau du parent

### Observer le fonctionnement du composant *HebergementView*

Usage de [fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) pour faire les appels de l'API.

Plus d'explication sur [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Usage du mot clé javascript [await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await)

Usage de l'interface [FormData](https://developer.mozilla.org/fr/docs/Web/API/FormData) pour envoyer un formulaire.