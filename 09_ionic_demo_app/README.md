# Première application Ionic

## Note d'historique
Ionic se base sur des frameworks précédents, maintenant désuets :
- [PhoneGag](https://fr.wikipedia.org/wiki/Adobe_PhoneGap)
- [Cordova](https://fr.wikipedia.org/wiki/Apache_Cordova)


## Typescript

L'équipe Ionic recommande l'utilisation d'Ionic. Par défaut, la création d'un projet Ionic utilise [Typescript](https://www.typescriptlang.org/).

## Styles d'API

VueJS supportent deux [styles d'API](https://fr.vuejs.org/guide/introduction.html#api-styles). Avec Ionic, nous allons utiliser le style plus concis de Composition API.

## Démarrage

1. Création du projet. Voir [documentation Ionic](https://ionicframework.com/docs/). [Démarrage avec Ionic](https://ionicframework.com/docs/developing/starting)
~~~bash
$ ionic start ionic-demo blank
~~~
? Framework: Vue
? Create free Ionic account: No

2. Démarrage serveur local
~~~bash
$ cd ionic-demo
$ ionic serve
~~~

# Composants

Plusieurs composants sont intégrés dans la page blanche d'Ionic :
- [IonContent](https://ionicframework.com/docs/api/content)
- [IonHeader](https://ionicframework.com/docs/api/header#basic-usage)
- [IonPage](https://ionicframework.com/docs/vue/navigation#ionpage)
- [IonToolbar](https://ionicframework.com/docs/api/toolbar)
- [IonTitle](https://ionicframework.com/docs/api/title#basic)

# Navigation

Ionic supporte la navigation et réutilise en arrière *vue-router*. L'injection des vues dans l'application utilise le composant [IonRouterOutlet](https://ionicframework.com/docs/vue/navigation#ionrouteroutlet)

~~~js
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
~~~

## Exercice

### Démarrage

1. Créer une seconde page *HomePage2.vue*

2. Ajouter cette page dans *router/index.js*

### Ajout d'images
Dans *HomePage.vue* et *HomePage2.vue*, ajouter une image différente.
Cette image utilise le composante [IonImg](https://ionicframework.com/docs/api/img#basic-usage)

~~~html
<ion-img src="/image1.jpg" alt="https://picsum.photos/200"></ion-img>
~~~
~~~html
 <ion-img src="/image2.jpg" alt="https://picsum.photos/200"></ion-img>
~~~

### Ajout de boutons

Dans *HomePage.vue* et *HomePage2.vue*, ajouter un bouton pour provoquer la navigation vers l'autre page. Le composant utilisé est [IonButton](https://ionicframework.com/docs/api/button). A noter que la directive "routerLink" n'est pas documentée dans la documentation de IonButton.

~~~html
<ion-button router-link="/home">Click Me</ion-button>
~~~

### Navigation 

A l'aide des deux boutons, naviguer entre les deux pages et observer les transitions. Noter également que les images ne sont pas rechargées. Ionic conserve les vues non utilisées dans la page afin de les afficher rapidement.

Comparer avec les transitions proposées par [Material Design](https://m3.material.io/styles/motion/transitions/transition-patterns)

### Composant Alert

Le composant [Alert](https://ionicframework.com/docs/api/alert) permet d'afficher une modale. Utiliser ce composant pour offrir un bouton de navigation vers la première et seconde page. Ce composant peut être instantié via le template. Il peut aussi être créé programmatiquement afin d'associer le contrôle des boutons.

~~~js
const presentAlert = async () => {
  const alert = await alertController.create({
    header: 'A Short Title Is Best',
    subHeader: 'A Sub Header Is Optional',
    message: 'A message should be a short, complete sentence.',
    buttons: [{
      text: 'Page 2',
      role: 'redirect',
      handler: () => {
        console.log('Redirecting to page 2');
        alert.dismiss(); // important de fermer l'alerte avant de naviguer. Autrement cette alerte reste ouverte lors d'un retour éventuel.
        router.push('/page2');
      }
    }],
  });

  await alert.present();
~~~

### Styles de plateforme

Les composants Ionic [peuvent être stylés](https://ionicframework.com/docs/theming/platform-styles) selon plusieurs modes. Ceci permet de rendre l'application plus proche du style utilisé par les applications natives de la plateforme sur laquelle l'application est déployée.

Ionic permet de styler les composants selon Google ([material design](https://m3.material.io/components)) ou selon [iOS](https://developer.apple.com/design/human-interface-guidelines/getting-started).
Ionic ne comprend pas de style spécifique pour [Microsoft](https://fluent2.microsoft.design/components/web/react/).


Dans *main.ts* :
~~~js
const app = createApp(App)
  .use(IonicVue, {mode: 'md'})
  .use(router);
~~~

### Darkmode

Ionic supporte le [mode sombre](https://ionicframework.com/docs/theming/dark-mode).

Dans *main.ts* :
~~~js
import '@ionic/vue/css/palettes/dark.always.css';
~~~

## Menu

Ionic offre un [menu de navigation](https://ionicframework.com/docs/api/menu). Le placement hors de la zone de routage permet d'avoir un menu global pour toutes les vues.

Dans *App.vue* :

~~~js
<template>
  <ion-app>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Meteo</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item button @click="router.push('/meteo'); closeMenu()">
            <ion-label>Météo actuelle</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet />
  </ion-app>
</template>
~~~

Pour la fermeture du menu : 

~~~js
import { menuController } from '@ionic/vue';

const closeMenu = async () => {
  await menuController.close();
};
~~~