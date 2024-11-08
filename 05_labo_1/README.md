
# Laboratoire 1

Prénom : (à remplir)

Nom : (à remplir)

Numéro d'étudiant : (à remplir)

Url du site : (à remplir)

Résultat : / 10

Commentaire :

## Objectif

Créer une application web progressive (PWA) disponible hors-ligne à l'aide du framework Vue.JS.

Cette application permet un affichage hors-ligne d'une liste d'information.

A titre d'exemple, voici une [implémentation de référence](https://yannicl.github.io/).

## Étapes

1. Création d'un projet
```npm create vue@latest```
~~~
✔ Project name: … labo1
✔ Add TypeScript? … No / (Yes)
✔ Add JSX Support? … (No) / Yes
✔ Add Vue Router for Single Page Application development? … (No) / Yes
✔ Add Pinia for state management? … (No) / Yes
✔ Add Vitest for Unit testing? … (No) / Yes
✔ Add an End-to-End Testing Solution? … (No) / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … (No) / Yes
✔ Add Prettier for code formatting? … (No) / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … (No) / Yes
~~~

2. Installer la librairie vite-plugin-pwa et configurer la comme dans l'exercice PWA
3. Modifier le projet générer pour offrir une page listant une liste quelqonque (par exemple, une liste de personnes ou une liste de produits). Cette liste doit être affichées sous forme de "cartes" stylées avec [Bootstrap](https://getbootstrap.com/). 
4. Tester localement l'application.
5. Compiler l'application
6. Déployer les fichiers compilés sur un site public (par exemple sur GitHub)

## Exigences

1. La liste doit avoir au moins 10 éléments.
2. Chaque élément doit avoir une image associée.
3. L'affichage doit être adapté selon la taille de l'écran.
4. La PWA doit être installable et fonctionner hors ligne.
5. Le code livré doit être formatté, lisible, sans section exclue comme commentaire.
6. La liste est affichée à l'aide de la directive [v-for](https://fr.vuejs.org/api/built-in-directives.html#v-for).
7. Un tri est appliqué sur la liste à l'aide d'une [propriété calculée](https://fr.vuejs.org/guide/essentials/computed).


## Livrables

1. Ce document avec les champs à remplir dûment remplis.
2. Un zip du code source sans le répertoire node_modules, dist, dev-dist
