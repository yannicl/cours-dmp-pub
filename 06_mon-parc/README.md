![entete](../header-dmp.png)

# Application Parc Nature

## Objectifs

- navigation
- multiple vues, vue gardée, barre de menu
- service global
- consommation d'API Rest, gestion d'erreur lors de l'appel

## Installation

1. Création d'un projet
```npm create vue@latest```
~~~
✔ Project name: … parc
✔ Add TypeScript? … (No) / Yes
✔ Add JSX Support? … (No) / Yes
✔ Add Vue Router for Single Page Application development? … No / (Yes)
✔ Add Pinia for state management? … (No) / Yes
✔ Add Vitest for Unit testing? … (No) / Yes
✔ Add an End-to-End Testing Solution? … (No) / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … (No) / Yes
✔ Add Prettier for code formatting? … (No) / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … (No) / Yes
~~~

## Vue router
### Installation
Soit via le menu d'installation ou en ligne de commande

~~~sh
$ npm install vue-router
~~~

### Configuration
#### *main.js*
~~~js
import router from './router'

app.use(router)
~~~

##### *App.vue*
Cette vue utilise [RouterView](https://router.vuejs.org/guide/#RouterView-and-RouterLink) et le composant personnalisé NavBar

~~~js
import { RouterView } from 'vue-router'

export default {

  components: {
    RouterView,
    NavBar
  }
}

<template>
  <header>
    <NavBar :currentRouteName="this.$route.name"/>
  </header>
  <main>
    <RouterView />
  </main>

</template>
~~~

### *router/index.js*

Cette configuration permet d'enregistrer des routes pour chacunes des vues. Dans ce projet, il y a :
- une page d'accueil
- une page de météo
- une page pour un registre de départ
- une page pour réserver un hébergement
- une page pour afficher les informations de l'usager

Cette configuration utilise le patron d'injection de dépendance offert par [provide/inject](https://fr.vuejs.org/guide/components/provide-inject)

~~~js
import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/meteo',
      name: 'meteo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MeteoView.vue')
    },
    {
      path: '/registre',
      name: 'registre',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegistreDepartView.vue')
    },
    {
      path: '/hebergement',
      name: 'hebergement',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HebergementView.vue')
    },
    {
      path: '/compte',
      name: 'compte',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserView.vue')
    }
  ]
});
router.beforeEach((to, from) => {
  const user = inject('user')
  console.log(user.user)
  if (user.hasValidAccess()) {
  //if (false) {
    return true;
  } else {
    console.log(to);
    if (to.name == 'home') {
      return true;
    } else {
      return false;
    }
  }
  
})

export default router

~~~


## Navigation

### Composant Navbar

Ce composant affiche des liens via [RouterLink](https://router.vuejs.org/api/#RouterLink) à l'aide d'une barre de [navigation de Bootstrap](https://getbootstrap.com/docs/5.3/components/navbar/#nav). Ce composant dépend du service utilisateur.

~~~js
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <img alt="Mon Parc" class="logo" src="@/assets/logo.png" width="60" height="60" />
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Débuter</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :class="{ disabled: !this.$user.hasValidAccess() }" to="/meteo">Meteo</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :class="{ disabled: !this.$user.hasValidAccess() }" to="/registre">Registre de
              départ</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :class="{ disabled: !this.$user.hasValidAccess() }" to="/hebergement">Hébergement</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <form class="d-flex">
          <RouterLink class="btn btn-outline-success me-2" :class="{ disabled: !this.$user.hasValidAccess() }" to="/compte">Mon groupe</RouterLink>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {

  components: {
    RouterLink
  },

  props: {
   currentRouteName: String,
  },
    

  mounted() {
    console.log(this.$user.print());
  }
}
</script>
<style scoped></style>
~~~

## Service

### *services/UserService.js*
~~~js
export class UserService {

    user = JSON.parse(localStorage.getItem('user') || null);

    hasValidAccess() {
        return this.user != null && this.user.access.valid == true;
    }

    async checkin(code) {
        // retirer pour l'instant
    }
}
~~~

### *main.js*

~~~js
// service global
app.config.globalProperties.$user = new UserService();

// mecanisme inject/provide
app.provide('user', app.config.globalProperties.$user);
~~~

## Pages

### Page Accueil *views/HomeView.vue*

~~~js
<template>
  <div class="global-container">
    <div class="container text-center pt-5">
      <h1>Débutez votre aventure.</h1>
      <p class="fs-2">Cette application vous accompagnera <br /> dans votre séjour.</p>
      <p class="">
        <button type="button" class="btn btn-lg btn-light fw-bold border-white bg-white" data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          Débuter
        </button>
      </p>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Code d'accès journalier</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="codeAcces" class="form-label">Veuillez saisir votre code d'accès journalier. Ce code est
                  inscrit sur votre billet d'entrée.</label>
                <input type="text" class="form-control" id="codeAcces" v-model="code" placeholder="XXXX-XXXX-XXXX">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Retour</button>
              <button type="button" class="btn btn-primary" @click="submitCode" data-bs-dismiss="modal">Continuer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      code : ""
    }
  },

  methods: {
    submitCode() {
      this.$user.checkin(this.code).then((result) => {
        this.$router.push("/compte");
      });
      return true;
    }
  }
}
</script>

<style scoped>
.global-container {
  background-image: url("@/assets/cover.jpeg");
  background-color: #0e3101;
  /* Used if the image is unavailable */
  background-repeat: no-repeat, repeat;
  background-position: center;
  /* Center the image */
  height: 100vh;
}
</style>

~~~

### Page Hébergement

Cette page affiche la disponibilité (en nombre de lits) de différents refuges offerts dans le parc.

Un appel REST permet d'obtenir la disponibilité. L'url et la réponse de cet appel est :

~~~js
GET http://localhost:3000/hebergements

{
    'disponibilites': [5, 4, 9, 10]
}
~~~

Chacun des refuges est affiché à l'aide d'un composant personnalisé *HebergementCard.vue*

Ce composant reçoit les informations en props et émet des événements lorsque les boutons sont cliqués.

~~~js
<script>
export default {
    emits: ['bookedEvent', 'unbookedEvent'],
    props : {
        id: String,
        imgSrc: String,
        isBooked: Boolean,
        isDisabled: Boolean,
        title: String,
        availableBeds: Number
    }
}
</script>
~~~

## Consommation de service distant - [Appel REST](https://www.redhat.com/fr/topics/api/what-is-a-rest-api)

L'API Web utilisée pour faire l'appel est l'[API Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API).

### *UserService.js*
~~~js
async checkin(code) {

    this.loading = true;
    let formData = new FormData();
    formData.append('code', code);

    try {
        const response = await fetch("http://localhost:3000/compte", {
            method: "POST",
            body: formData
        })
        this.user = await response.json();
        localStorage.setItem('user', JSON.stringify(this.user));
    } catch (err) {
        this.user = null;
    } finally {
        this.loading = false
    }

}
~~~

