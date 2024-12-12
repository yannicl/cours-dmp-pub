
# Laboratoire 2

Prénom : (à remplir)

Nom : (à remplir)

Numéro d'étudiant : (à remplir)

Url du site : (à remplir)

Résultat : / 10

Commentaire :

## Objectif

Créer une application multi-page à l'aide du framework VueJS.

Cette application permet l'affichage d'une liste d'information ainsi qu'une option de recherche dans la liste.

A titre d'exemple, voici une [implémentation de référence](https://yannicl.github.io/bibliotheque).

## Étapes

1. Création d'un projet
```npm create vue@latest```
~~~
✔ Project name: … labo2
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

3. Modifier le projet généré pour offrir une page listant une liste de livre.
4. Ajouter une entrée de recherche permettant de filtrer la liste sur base du texte saisi.
5. Rendre cliquable chaque élément de la liste.
6. Afficher une page de détail pour chaque livre.
7. Tester localement l'application.
8. Compiler l'application
9. Déployer les fichiers compilés sur un site public (par exemple sur GitHub)

## Exigences

1. Le code livré doit être formatté, lisible, sans section exclue comme commentaire.
2. La liste est affichée à l'aide de la directive [v-for](https://fr.vuejs.org/api/built-in-directives.html#v-for).
3. La recherche est appliquée sur la liste à l'aide d'une [propriété calculée](https://fr.vuejs.org/guide/essentials/computed).


## Livrables

1. Ce document avec les champs à remplir dûment remplis.
2. Un zip du code source sans le répertoire node_modules, dist, dev-dist
