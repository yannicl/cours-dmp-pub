![entete](../header-dmp.png)

# Application Carnet d'adresses

## Objectifs

- navigation
- multiples vues
- service global
- recherche parmi une liste

## Installation

1. Décompresser le zip fourni
2. npm install

## Exercices

### Affichage de la liste des contacts

1. Injecter le service d'annuaire (directoryService) défini dans *main.js* dans la vue HomeView.
2. Utiliser ce service pour récupérer la liste des livres dans une propriété *contacts*.
3. Observer que la liste des contacts s'affiche

### Vue paramétrée

1. Observer le fichier *router/index.js*, la route /detail/:email contient un paramètre.
2. Dans la vue DetailView, injecter le service d'annuaire (directoryService)
3. Utiliser le [paramètre de route](https://router.vuejs.org/guide/essentials/dynamic-matching.html) pour rechercher via le service le contact
~~~js
data() {
  return {
    contact: this.directoryService.getContactDetail(this.$route.params.email)
  }
}
~~~

### Affichage du détail du contact

Compléter l'affichage des détails du contact.

### Recherche parmi la liste des contacts

Utiliser une propriété paramétrée pour rechercher parmi les contacts. Un champs de saisie doit être lié avec une propriété.

Astuce! Voici une proposition de filtre de recherche. *searchQuery* est la propriété liée avec la valeur du champs de saisie.

~~~js
this.directoryService.getAllContacts().filter(
        (contact) => (contact.firstName + " " + contact.lastName).toLowerCase().includes(this.searchQuery.toLowerCase()))
~~~