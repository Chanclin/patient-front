# Patient Frontend

Bienvenue dans le projet **Patient Frontend** pour la gestion des patients de FhunHospital. Ce projet implémente l'interface utilisateur de l'application utilisant **Angular** et **Angular Material** pour consommer l'API RESTful du backend et fournir une expérience utilisateur complète.

## Table des matières

- [Description du projet](#description-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Contact](#contact)

## Description du projet

Ce frontend permet aux utilisateurs de gérer les patients de FhunHospital à travers une interface graphique. Il communique avec le backend via des appels API pour gérer les informations des patients et leurs contacts. Il est conçu avec **Angular** et utilise **Angular Material** pour une interface moderne et responsive.

## Fonctionnalités

- **Afficher la liste des patients** : Visualiser tous les patients enregistrés.
- **Ajouter un patient** : Permet à l'utilisateur de créer un nouveau patient avec ses informations et contacts.
- **Afficher les détails d'un patient** : Voir les informations détaillées d'un patient spécifique.
- **Modifier un patient** : Mettre à jour les informations d'un patient.
- **Supprimer un patient** : Supprimer un patient et ses contacts associés.
- **Ajouter un contact à un patient** : Ajouter un nouveau contact (email, mobile, fixe) pour un patient.
- **Modifier un contact** : Mettre à jour un contact d’un patient.
- **Supprimer un contact** : Retirer un contact d’un patient.

## Technologies utilisées

- **Frontend** : Angular
- **Composants UI** : Angular Material
- **HTTP** : HttpClient pour la communication avec l'API RESTful
- **Routing** : Angular Router pour la gestion de la navigation entre les pages

## Installation

1. **Clonez le dépôt** :

   ```bash
   git clone https://github.com/username/patient-frontend.git
   ```

2. **Installez les dépendances** :

   Utilisez npm pour installer les dépendances nécessaires :

   ```bash
   npm install
   ```

3. **Démarrer l'application** :

   Pour démarrer l'application en mode développement, utilisez la commande suivante :

   ```bash
   ng serve
   ```

   L'application sera disponible à l'adresse suivante : [http://localhost:4200](http://localhost:4200).

## Utilisation

L'interface utilisateur permet de gérer les patients et leurs contacts avec les fonctionnalités suivantes :

- **Page d'accueil** : Affiche la liste des patients avec des options pour ajouter, modifier ou supprimer un patient.
- **Page de création/édition de patient** : Formulaire pour ajouter ou modifier un patient.
- **Page de détail d'un patient** : Affiche les détails complets d'un patient, y compris ses contacts.
- **Gestion des contacts** : Ajouter, modifier ou supprimer des contacts associés à un patient.

## Structure du projet

Voici la structure des principaux dossiers et fichiers du projet :

```
src/
├── app/
│   ├── components/           # Composants Angular (ex. patient-list, patient-detail)
│   ├── environments/         # Fichiers de configuration d'environnement
│   ├── models/               # Modèles TypeScript pour les données
│   ├── pages/                # Pages de l'application
│   ├── services/             # Services pour la gestion des API
│   ├── shared/               # Composants partagés
│   ├── app.component.css     # Styles du composant principal
│   ├── app.component.html    # Template HTML du composant principal
│   ├── app.component.spec.ts # Tests unitaires du composant principal
│   ├── app.component.ts      # Composant principal
│   ├── app.config.ts         # Configuration de l'application
│   ├── app.routes.ts         # Configuration du routage
├── index.html                # Page HTML d'accueil
├── main.ts                   # Point d'entrée principal de l'application
└── styles.css                # Styles globaux de l'application

```

## Contact

Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter.

- **Nom** : MAKOSSO Chancelin
- **Email** : chancelinmakosso@gmail.com
- **GitHub** : [Mon profil](https://github.com/Chanclin/)

```
