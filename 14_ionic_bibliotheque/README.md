![entete](../header-dmp.png)

# Application bibliothèque avec Ionic

## API REST

Selon [Wikipedia](https://fr.wikipedia.org/wiki/Representational_state_transfer)


## mockapi.io

Voir leur [documentation](https://github.com/mockapi-io/docs/wiki)

### Débutons un projet

- Créer une API d'essai avec mockapi.io.
- Nouveau projet "bibliotheque".
- Nouvelle ressource "books"

#### Schema

| Champs    | Type | Mock |
| -------- | ------- | ------- | 
| id  | Object ID    | |
| title | String     | Faker.js/random.words |
| writer    | String    | Faker.js/name.fullName |
| date    | Date    | Faker.js/date.past |
| editor    | String    | Faker.js/company.name |
| codeBarre    | String    | Faker.js/phone.imei |

## Application Ionic

### Catalogue

#### Composants

Plusieurs composants sont utilisés pour le catalogue :
- [IonBackButton](https://ionicframework.com/docs/api/back-button)
- [IonInfiniteScroll](https://ionicframework.com/docs/api/infinite-scroll)
- [IonToast](https://ionicframework.com/docs/api/toast)


#### Fonctionnement

La liste des livres est chargée progresssivement à l'aide d'appel de l'API. En cas d'erreur, un toast est affiché.

Pour ceci, la fonctionnalité de pagination de l'API REST est utilisée. Voir [Pagination](https://github.com/mockapi-io/docs/wiki/Quick-start-guide#pagination)

```js
async loadPage() {
      
      const url = new URL('https://???.mockapi.io/books');
      url.searchParams.append('page', this.page);
      url.searchParams.append('limit', 10);

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' }
        });
        if (!res.ok) {
          throw new Error('API response was not ok');
        }
        const data = await res.json();
        this.books.push(...data);
        this.page++;
      } catch (error) {
        const toast = await toastController.create({
          message: 'Erreur lors de la récupération des données',
          duration: 5000,
          position: 'bottom',
        });

        await toast.present();
      }
    }
```

Le code doit être amélioré pour gérer les situations suivantes :
- la fin de la liste est atteinte. Pour ceci, utiliser une variable *endOfList* qui passe de *false* à *true* lorsqu'une requête retourne une liste vide.
- une requête est déjà en cours, il ne faut pas en faire une autre. Pour ceci, utiliser une variable *loadingData* qui mise à vrai au début de la méthode et faux à la fin. Cette variable agit comme verrou simple.

### Détail d'un livre

#### Composants

Plusieurs composants sont utilisés pour cette page :
- [ion-progress-bar](https://ionicframework.com/docs/api/progress-bar)
- [ion-card](https://ionicframework.com/docs/api/card)
- [ion-alert](https://ionicframework.com/docs/api/alert#controller-alerts)

#### Fonctionnement

Le détail d'un livre est chargé à l'aide d'appel de l'API. En cas d'erreur, une alerte est affiché. L'alerte permet à l'utilisateur de retourner au catalogue.

Pour ceci, la fonctionnalité de récupération à l'aide de l'ID de l'API REST est utilisée. Voir les [méthodes disponibles](https://github.com/mockapi-io/docs/wiki/Quick-start-guide#relations-between-resources)

~~~js
async loadBook() {

      const url = new URL('https://67886a002c874e66b7d51cd5.mockapi.io/books/' + this.$route.params.id);

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' }
        });
        if (!res.ok) {
          throw new Error('API response was not ok');
        }
        const data = await res.json();
        this.book = data;
      } catch (error) {
        
        const alertButtons = [
          {
            text: 'Retour à la liste',
            handler: () => {
              this.router.push('/catalog');
            },
          }
        ];
        const alert = await alertController.create({
          header: 'Erreur',
          message: 'La recherche n\'a pas abouti, désolé.',
          buttons: alertButtons,
        });
        await alert.present();
      }
    }
~~~


### Navigation

Observer la navigation et le fait que les vues restent en mémoire.