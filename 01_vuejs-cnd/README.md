![entete](../header-dmp.png)

# Vue depuis un CDN 

## Objectif

Utiliser Vue.JS dans une page web sans outil de compilation

## Mise en place de l'environnement

1. Créer un répertoire vue-cdn. Chaque exercice sera dans son propre répertoire exerciceX sous le répertoire vue-cdn
~~~
vue-cdn
|---exercice1
|---exercice2
~~~
2. Configurer le plugin liveserver pour exposer le répertoire vue-cdn
~~~json
{
    "liveServer.settings.root": "/vue-cdn/"
}
~~~
3. Pour chaque exercice, le fichier de travail est vuejs.html 

## Exercice 1

Utiliser VueJS pour afficher un message "Hello Vue". Le message est affiché en utilisant [l'interpolation de texte de VueJS](https://fr.vuejs.org/guide/essentials/template-syntax.html#text-interpolation).
[L'état](https://fr.vuejs.org/api/options-state.html) contient le message dans une propriété *message*.


En pur javascript, l'équivalent serait ceci :
~~~html
<div id="app"></div>

<script type="module">
    const app = document.getElementById('app');
    const message = 'Hello from plain Javascript !';
    app.innerHTML = message;
</script>
~~~

## Exercice 2

Créer une page web avec 1 bouton et deux input text. Le bouton déclenche une alerte "Bouton pressé" lorsque cliqué. Pour le premier input text, lorsqu'un caractère y est introduit, ce caractère est répliqué en texte dans la page web à côté. Pour le second input text, le contenu est répliqué dans la page web à côté lorsque le caractère Enter est introduit.

[L'état](https://fr.vuejs.org/api/options-state.html) des deux textes est maintenu deux propriétés (par exemple value et value2)
Le code de chacune des 3 actions est isolée dans une [méthode](https://fr.vuejs.org/api/options-state.html#methods). Cette fonction est liée à l'élément via la [directive](https://fr.vuejs.org/guide/essentials/template-syntax.html#directives) [v-on](https://fr.vuejs.org/api/built-in-directives.html#v-on)

En pur javascript, l'équivalent serait ceci :
~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PlainJS</title> 
</head>
<body>
<div id="app">
        <div>
            <button onclick="alert('Pressed button...')"> Alert </button>
        </div>
        <p>
            <input type="text" onkeydown="keepValue(event)"> : <span id="value"></span>
        </p>
        <p>
            <input type="text" onkeydown="keepValue2(event)"> : <span id="value2"></span>
        </p>
</div>

<script>
    const app = document.getElementById('app');
    const value = document.getElementById('value');
    const value2 = document.getElementById('value2');

    function keepValue(event) {
        value.innerHTML = event.target.value;
    }

    function keepValue2(event) {
        if (event.key !== 'Enter') return;
        value2.innerHTML = event.target.value;
    }
</script>
</body>
</html>
~~~

## Exercice 3

Créer une page web avec deux boutons. Chaque fois que le premier bouton est cliqué, un compteur est incrémenté. Un texte indique la valeur du compteur ainsi que s'il s'agit d'un nombre pair ou impair. Le deuxième bouton permet de montrer/masquer un bloc de texte.

L'état est maintenu dans une variable "counter" et "show".
Pour ceci, en plus de la directive v-on, utiliser aussi les directives [v-if](https://fr.vuejs.org/api/built-in-directives.html#v-if) et [v-else](https://fr.vuejs.org/api/built-in-directives.html#v-else)

## Exercice 4

Créer une page web avec deux boutons. Un texte sur la page indique la valeur courante d'un compteur. Le compteur est initialisé à 0. Le premier bouton incrémente le compteur de 1. Le second compteur augmente le compte de 5. Lorsque la valeur du compteur dépasse 37, la valeur du compteur est réinitialisée à 0 après 5 secondes.

L'état du compteur est maintenu dans une variable *value*.

En pur javascript, l'équivalent serait ceci :
~~~html
<!DOCTYPE html>
<html>
<head>
    <title>Button Counter</title>
</head>
<body>
    <h1>Button Counter</h1>
    <p id="counter">0</p>
    <button id="addFive">Add 5</button>
    <button id="addOne">Add 1</button>

    <script>
        // Initialize the counter variable
        let counter = 0;

        // Function to update the counter value and display it on the page
        function updateCounter() {
            document.getElementById("counter").textContent = counter;
        }

        // Function to reset the counter to 0 after 5 seconds
        function resetCounter() {
            counter = 0;
            updateCounter();
        }

        // Event listener for the "Add 5" button
        document.getElementById("addFive").addEventListener("click", function() {
            counter += 5;
            updateCounter();
            if (counter >= 37) {
                setTimeout(resetCounter, 5000);
            }
        });

        // Event listener for the "Add 1" button
        document.getElementById("addOne").addEventListener("click", function() {
            counter += 1;
            updateCounter();
            if (counter >= 37) {
                setTimeout(resetCounter, 5000);
            }
        });
    </script>
</body>
</html>
~~~


## Exercice 5
En javascript, créez une page avec 3 blocs. Une fois cliqué, le premier bloc change de couleur du vert au rouge, le deuxième bloc change de couleur du jaune au bleu et le troisième bloc change de couleur de l'orange au magenta. Lorsque vous cliquez à nouveau, la couleur d'origine est restaurée.

Utiliser un état contenant une variable tableau *blocks* contenant la couleur originale, la couleur modifiée et un booléen indiquant si le bloc a été cliqué. Utiliser la directive [v-for](https://fr.vuejs.org/api/built-in-directives.html#v-for) pour afficher les blocs. Le bloc est colorié via un [style css lié par objet](https://fr.vuejs.org/guide/essentials/class-and-style.html#binding-inline-styles). 

En pur javascript, l'équivalent serait ceci :
~~~html
<!DOCTYPE html>
<html>
<head>
    <title>Color Changing Blocks</title>
    <style>
        .block {
            width: 100px;
            height: 100px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="block" id="block1" onclick="changeColor('block1', 'green', 'red')" style="background-color: green;"></div>
    <div class="block" id="block2" onclick="changeColor('block2', 'yellow', 'blue')" style="background-color: yellow;"></div>
    <div class="block" id="block3" onclick="changeColor('block3', 'orange', 'magenta')" style="background-color: orange;"></div>

    <script>
        function changeColor(blockId, originalColor, newColor) {
            var block = document.getElementById(blockId);
            if (block.style.backgroundColor === originalColor) {
                block.style.backgroundColor = newColor;
            } else {
                block.style.backgroundColor = originalColor;
            }
        }
    </script>
</body>
</html>
~~~

## Exercice 6
Utiliser la directive v-for pour afficher une liste de donnée dans un tableau.

## Exercice 7
Afficher de façon aléatoire 4 couleurs parmi la liste suivante. Chaque nom de couleur est affichée dans sa propre couleur.

~~~js
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
~~~

## Exercice 8
Utiliser [computed](https://fr.vuejs.org/api/reactivity-core.html#computed) pour trier un tableau de donnée en fonction d'une colonne.
Le nom de la colonne peut être choisi via un élément select (dropdown).

## Exercice 9
Comme l'exercice 8 en utilisant Bootstrap pour formatter le tableau et l'élement select.