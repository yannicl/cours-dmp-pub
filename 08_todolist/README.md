# Application liste de tâches

## Démarrage

~~~bash
$ npm create vue@latest
~~~

~~~
✔ Project name: todolist
✔ Add TypeScript? … (No) / Yes
✔ Add JSX Support? … (No) / Yes
✔ Add Vue Router for Single Page Application development? … (No) / Yes
✔ Add Pinia for state management? … (No) / Yes
✔ Add Vitest for Unit testing? … (No) / Yes
✔ Add an End-to-End Testing Solution? … (No) / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / (Yes)
✔ Add Prettier for code formatting? … (No) / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … (No) / Yes
~~~

### Ajout de Bootstrap

Modifier le fichier *index.html*

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  </body>
  
</html>
~~~

### Ajout de [Bootstrap-icons](https://icons.getbootstrap.com/)

~~~bash
$ npm install bootstrap-icons
~~~

### Ajout de [vue-uuid](https://www.npmjs.com/package/vue-uuid/)

~~~bash
$ npm install vue-uuid
~~~

~~~js
import { uuid } from 'vue-uuid';
uuid.v4() // exemple : 67c378b7-a96c-485a-8732-e10fd3ad033a
~~~

## Composants

### Navbar

Créer un [composant](https://vuejs.org/guide/essentials/component-basics.html) *Navbar.vue*. Ce composant VueJS est essentiellement un emballage autour du composant [Navbar](https://getbootstrap.com/docs/5.3/components/navbar/) de Bootstrap.

~~~vue
<script setup>

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        ...
    </nav>
</template>

<style scoped>

</style>
~~~

Ce composant s'insère avant le bloc main dans *App.vue*

~~~vue
<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
  </header>
  <Navbar/>
  <main>
    <div class="container">
    </div>
  </main>
</template>

<style scoped></style>
~~~

### TaskItem

Ce composant VueJS représente une tâche et assure sa représentation visuelle.

Une tâche comporte :
- Un ID
- Un statut prioritaire/régulier
- Un titre
- Un bouton pour fermer la tâche
- Un bouton pour prioriser ou déprioriser une tâche
- Un bouton pour réouvrir la tâche
- Un bouton pour effacer la tâche

Le cycle de vie d'une tâche est :
- Ouverte
- Fermée
- Fermée et archivée

### TaskList

Ce composant VueJS comprend la liste des tâches. C'est dans ce composant que toute la logique sera implémentée.
Ce composant (parent) utilise le composant (enfant) TaskItem.

~~~vue
<script>
import TaskItem from './TaskItem.vue'
export default {
    components: {
        TaskItem: TaskItem
    }
}
</script>
~~~

## Implémentation

### Boutons

Les boutons du composant enfant (TaskItem) émettent des [événements](https://vuejs.org/guide/components/events.html) qui seront écoutés par le parent.

#### Enfant
~~~vue
<script>
export default {
  methods: {
    closeTask() {
      emit('closeEvent');
    }
  }
}
</script>
~~~

#### Parent
~~~
@closeEvent="closeTask(task.id)
~~~

### Initialisation du composant enfant

Les éléments passés du composant parent au composant enfant sont déclarés à l'aide de [props](https://vuejs.org/guide/components/props.html)

#### Enfant
~~~js
<script setup>
defineProps(['title', 'isDone', 'isMarked'])
</script>
~~~
#### Parent
~~~js
<TaskItem title="Une première tâche" :isDone="false" :isMarked="false"></TaskItem>
~~~

### Liste des tâches

La liste des tâches est implémentée sous forme d'un tableau.

~~~vue
<script>
export default {
    data() {
        return {
            tasks: [],
        }
    },
}
</script>
~~~

De ce fait, les actions sur les tâches sont des opérations sur le tableau.

~~~vue
<script>
export default {
  methods: {
    closeTask(id) {
        this.tasks.find((task) => (task.id == id)).isDone = true;
    },
    deleteTask(id) {
        this.tasks.splice(this.tasks.findIndex((task) => (task.id == id)), 1);
    },
  }
}
</script>
~~~


### Formulaire de création d'une tâche

Au niveau du formulaire, le champ input va utiliser la directive v-model. Voir [Liaisons des entrées utilisateur d'un formulaire](https://fr.vuejs.org/guide/essentials/forms.html).

~~~html
<form>
    <div class="mb-3 mt-2 row">
        <div class="col-sm-9 mt-1">
            <input class="form-control" type="text" v-model="newTask" placeholder="Nouvelle tâche">
        </div>
        <div class="col-sm-3 mt-1">
            <button type="button" class="btn btn-primary" @click="addTask"><i class="bi bi-play"></i>Créer</button>
        </div>
    </div>
</form>
~~~

~~~vue
<script>
export default {
    data() {
        return {
            tasks: [],
            newTask: ''
        }
    },
    methods: {
        addTask() {
            if (this.newTask.trim() !== '') {
                this.tasks.push({
                    title: this.newTask.trim(),
                    id: uuid.v4(),
                    isDone: false,
                    isMarked: false
                });
                this.newTask = '';
            }
        }
    }
}
</script>
~~~

### Sauvegarde de l'état

Sans sauvegarde de l'état, un rafraichissement du navigateur ou une fermeture du navigateur cause la perte complète de l'état courant et le retour à l'état initial. 

Une option pour la sauvegarde de l'état sur l'appareil local est offerte par [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

La sauvegarde :
~~~js
localStorage.setItem('tasks', JSON.stringify(tasks));
~~~

Le chargement :
~~~js
this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
~~~

La sauvegarde profite avantageusement de la fonctionnalité des [Observateurs](https://fr.vuejs.org/guide/essentials/watchers)

~~~js
watch: {
        tasks: {
            handler(newValue) {
                console.log("tasks changed");
                localStorage.setItem('tasks', JSON.stringify(newValue));
            },
            deep : true
        },
    },
~~~

Le chargement profite avantageusement des [hooks du cycle de vie](https://fr.vuejs.org/guide/essentials/lifecycle.html) des composants.

~~~js
mounted() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    console.log(this.tasks);
},
~~~