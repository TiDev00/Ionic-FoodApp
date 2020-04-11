# Thierno Ibrahima Cissé / Master 2 GLSI

## Application FoodApp pour la gestion des de déjeuner dans une entreprise

### Installation et configuration de l'application :

* Télécharger le fichier projet zip ou le cloner à partir de github
* Extraire le fichier zip
* Démarrer la ligne de commande et se placer dans le dossier du projet
* Télécharger les dépendances nécessaires au démarrage de l'appli grâce à la commande :
  ```
  > npm install
  ```
* Une fois les dépendances installées ouvrir le fichier environment.ts contenu dans le dossier src/environments
* Remplacer l'adresse URL à la ligne 10 par l'adresse de votre machine en ajoutant comme numéro de port 1337 et enregistrer
  
    
### Démarrage de l'application :

* Avant de démarrer l'application il faudra au préalable démarrer l'application Ionic-Strapi-FoodApp

* Une fois la configuration terminée, enregistrer le fichier puis démarrer l'application avec :
     ```
    > ionic serve
    ```
* Arrivé sur la page de login vous pouvez connecter soit comme administrateur ou simple employé ou vous inscrire comme nouvel employé 

  * Pour vous connecter comme administrateur, vous pouvez passer par un compte déjà créée avec les infos suivants :
    * identifiant : admin00
    * mot de passe : admin12
  * Pour vous connecter comme simple utilisateur, vous pouvez passer par un compte déjà créée avec les infos suivants :
    * identifiant : bobo01
    * mot de passe : bobo12
  * Enfin vous pouvez vous inscrire comme nouvel utilisateur en cliquant sur INSCRIPTION et en remplissant le formulaire. Après inscription, vous pourrez vous connecter avec le nouveau compte créée
