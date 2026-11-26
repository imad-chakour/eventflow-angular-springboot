# EventFlow - Application de Gestion d'Événements et Campagnes Marketing

Application full-stack microservices pour la gestion d'événements et de campagnes marketing, construite avec Spring Boot et Angular

## 📋 Table des matières

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Docker](#docker)
- [Microservices](#microservices)
- [API Gateway](#api-gateway)
- [Frontend](#frontend)
- [Configuration](#configuration)
- [Fonctionnalités](#fonctionnalités)

## 🏗️ Architecture

Cette application suit une architecture microservices avec les composants suivants :

```
┌─────────────────┐
│   Angular App   │ (Frontend - Port 4200)
│   (Frontend)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Gateway    │ (Port 1111)
│ (Spring Cloud)  │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼          ▼
┌──────┐ ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│User  │ │Event │  │Camp. │  │Anal. │  │Notif.│
│Service│ │Service│ │Service│ │Service│ │Service│
└──────┘ └──────┘  └──────┘  └──────┘  └──────┘
    │         │          │          │          │
    └─────────┴──────────┴──────────┴──────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Eureka Server │ (Port 8761)
            │  (Discovery)  │
            └───────────────┘
                    │
                    ▼
            ┌───────────────┐
            │ Config Server │ (Port 8888)
            └───────────────┘
```

## 🛠️ Technologies

### Backend
- **Spring Boot 3.5.7** - Framework principal
- **Spring Cloud** - Microservices et service discovery
- **Spring Cloud Gateway** - API Gateway réactif
- **Eureka Server** - Service discovery
- **Spring Cloud Config** - Configuration centralisée
- **Spring Data JPA** - Persistance des données
- **Spring Security + JWT** - Authentification et autorisation
- **Feign Client** - Communication inter-services
- **Resilience4j** - Circuit breaker et retry
- **Spring Mail** - Envoi d'emails
- **Java 17**

### Frontend
- **Angular 21** - Framework frontend
- **Angular SSR** - Server-Side Rendering
- **RxJS** - Programmation réactive
- **TypeScript 5.9**
- **JWT Decode** - Gestion des tokens JWT

### Infrastructure
- **Maven** - Gestion des dépendances Java
- **npm** - Gestion des dépendances Node.js
- **PostgreSQL** - Base de données (recommandé)

## 📁 Structure du projet

```
myapp_spring_boot_angular/
├── backend/
│   ├── eurekaserver/          # Service Discovery (Port 8761)
│   ├── configserver/          # Configuration Server (Port 8888)
│   ├── reactivegateway/       # API Gateway (Port 1111)
│   ├── userservice/           # Service Utilisateurs (Port 7020)
│   ├── eventservice/          # Service Événements (Port 9030)
│   ├── campaignservice/       # Service Campagnes (Port 9020)
│   ├── analyticsservice/      # Service Analytics (Port 9010)
│   └── notificationservice/   # Service Notifications (Port 7010)
└── frontend/                   # Application Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/          # Services, guards, modèles
    │   │   ├── features/      # Composants par fonctionnalité
    │   │   └── shared/        # Composants partagés
    │   └── environments/
    └── package.json
```

## 📦 Prérequis

- **Java 17+** et **Maven 3.6+**
- **Node.js 18+** et **npm 9+**
- **PostgreSQL 12+** (ou autre base de données compatible)
- **IDE** (IntelliJ IDEA / VS Code recommandé)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd myapp_spring_boot_angular
```

### 2. Configuration de la base de données

Créez une base de données PostgreSQL pour chaque microservice (ou utilisez des schémas séparés) :

```sql
CREATE DATABASE eventflow_users;
CREATE DATABASE eventflow_events;
CREATE DATABASE eventflow_campaigns;
CREATE DATABASE eventflow_analytics;
CREATE DATABASE eventflow_notifications;
```

### 3. Configuration des variables d'environnement

Pour le **Notification Service**, configurez les variables d'environnement :

```bash
export MAIL_PASSWORD=votre_mot_de_passe_application_gmail
export GITHUB_TOKEN=votre_token_github  # Pour Config Server
```

### 4. Installation des dépendances Frontend

```bash
cd frontend
npm install
```

## ▶️ Démarrage

### Ordre de démarrage recommandé

#### 1. Services d'infrastructure

```bash
# Terminal 1 - Eureka Server
cd backend/eurekaserver
mvn spring-boot:run

# Terminal 2 - Config Server
cd backend/configserver
mvn spring-boot:run
```

**Vérification :**
- Eureka Dashboard : http://localhost:8761
- Config Server (Docker) : http://localhost:18888

#### 2. Microservices métier

```bash
# Terminal 3 - User Service
cd backend/userservice
mvn spring-boot:run

# Terminal 4 - Event Service
cd backend/eventservice
mvn spring-boot:run

# Terminal 5 - Campaign Service
cd backend/campaignservice
mvn spring-boot:run

# Terminal 6 - Analytics Service
cd backend/analyticsservice
mvn spring-boot:run

# Terminal 7 - Notification Service
cd backend/notificationservice
mvn spring-boot:run
```

#### 3. API Gateway

```bash
# Terminal 8 - Reactive Gateway
cd backend/reactivegateway
mvn spring-boot:run
```

#### 4. Frontend

```bash
# Terminal 9 - Angular Frontend
cd frontend
npm start
```

**Application accessible sur :** http://localhost:4200

## Docker

Docker Desktop avec Docker Compose v2 est requis. Depuis la racine du dépôt :

```bash
docker compose up --build
```

Le stack démarre Oracle Free, Eureka, Config Server, les cinq services métier, l'API Gateway et le frontend Angular SSR. Les services Spring se compilent dans des images Java 17 ; le frontend est construit pour la production puis servi par son serveur Node SSR.

- Frontend : http://localhost:8080
- API Gateway (Docker) : http://localhost:1112
- Eureka : http://localhost:18761 (port configurable with `EUREKA_HOST_PORT`)
- Config Server (Docker) : http://localhost:18888
- Oracle : `localhost:11521/FREEPDB1` (port configurable with `ORACLE_HOST_PORT`)

Eureka remains on port `8761` inside Docker; its host port is `18761` by default so you can run a local Eureka instance from your IDE on `8761` at the same time. The Docker Config Server is available on host port `18888` (configurable with `CONFIGSERVER_HOST_PORT`), leaving `8888` available for an IDE-launched Config Server. Similarly, the Docker Gateway is available on host port `1112`, leaving `1111` available for an IDE-launched Gateway.

The Docker frontend uses relative API URLs so browsers call the same host as the frontend. On a shared OCI instance, keep these Docker ports bound to `127.0.0.1` and configure the existing reverse proxy to send `/api/` to the Gateway and all other paths to the frontend. Prefer a separate domain or subdomain for this project; add these locations to that domain's existing Nginx `server` block:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:1112;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

If either local port is already in use, set `GATEWAY_HOST_PORT` or `FRONTEND_HOST_PORT` in `.env`; update the corresponding Nginx upstream port to match. When running the frontend with `npm start`, it uses `http://localhost:1111`. To have an IDE-launched Gateway discover the services running in Docker, set `EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://localhost:18761/eureka/` in its run configuration.

Les services utilisent un schéma Oracle partagé destiné au développement local. Docker configure Hibernate pour mettre à jour ce schéma (`ddl-auto=update`) afin de créer les tables des services au démarrage ; utilisez plutôt des migrations de schéma contrôlées en production. Les identifiants par défaut sont uniquement des valeurs de développement ; personnalisez-les dans un fichier `.env` (à partir de `.env.example`) avant tout déploiement. Renseignez également `MAIL_USERNAME` et `MAIL_PASSWORD` pour activer l'envoi d'e-mails.

Le User Service et le Gateway doivent partager le même `JWT_SECRET` Base64 d'au moins 256 bits. Générez-en un pour votre environnement avec `openssl rand -base64 32`, puis définissez-le dans `.env`.

Pour arrêter le stack, utilisez `docker compose down`. Les données Oracle sont conservées dans un volume Docker ; `docker compose down -v` les supprime.

## 🔌 Microservices

| Service | Port | Description | Endpoints principaux |
|---------|------|-------------|----------------------|
| **Eureka Server** | 8761 | Service Discovery | http://localhost:8761 |
| **Config Server** | 8888 (Docker host: 18888) | Configuration centralisée | http://localhost:18888 |
| **Reactive Gateway** | 1111 (Docker host: 1112) | API Gateway | http://localhost:1112 |
| **User Service** | 7020 | Gestion des utilisateurs | `/api/users` |
| **Event Service** | 9030 | Gestion des événements | `/api/events` |
| **Campaign Service** | 9020 | Gestion des campagnes | `/api/campaigns` |
| **Analytics Service** | 9010 | Statistiques et analyses | `/api/analytics` |
| **Notification Service** | 7010 | Envoi de notifications | `/api/notifications` |

## 🌐 API Gateway

Toutes les requêtes frontend passent par le **Spring Cloud Gateway** (port 1111) qui :
- Route les requêtes vers les microservices appropriés
- Gère l'authentification JWT
- Applique les filtres CORS
- Gère la résilience (circuit breaker, retry)

**Configuration des routes :**
- `/api/users/**` → User Service
- `/api/events/**` → Event Service
- `/api/campaigns/**` → Campaign Service
- `/api/analytics/**` → Analytics Service
- `/api/notifications/**` → Notification Service

## 💻 Frontend

### Structure

- **Features** : Composants organisés par fonctionnalité
  - `events/` - Gestion des événements
  - `campaigns/` - Gestion des campagnes
  - `analytics/` - Tableaux de bord analytics
  - `notifications/` - Gestion des notifications
  - `users/` - Authentification et gestion utilisateurs
  - `home/` - Page d'accueil avec raccourcis

- **Core** : Services et configuration
  - `auth.service.ts` - Gestion de l'authentification
  - `auth.guard.ts` - Guards de protection des routes
  - `config/api.config.ts` - Configuration de l'API

### Scripts disponibles

```bash
npm start              # Serveur de développement
npm run build          # Build de production
npm run serve:ssr:frontend  # Serveur SSR
```

## ⚙️ Configuration

### Base de données

Chaque microservice utilise sa propre base de données. Configurez les connexions dans `application.properties` de chaque service.

### JWT

Le secret JWT est configuré dans :
- `userservice` : Génération des tokens
- `reactivegateway` : Validation des tokens

**Secret par défaut :** `A4kVIT9eXHnjs8dRXXg3om0HXbQ/MAAev34MH89QM5o=`

⚠️ **Important :** Changez ce secret en production !

### Email (Notification Service)

Le service de notification utilise Gmail SMTP. Configuration requise :
1. Activer "Accès aux applications moins sécurisées" OU
2. Utiliser un "Mot de passe d'application" (recommandé)
3. Définir la variable d'environnement `MAIL_PASSWORD`

Voir `backend/notificationservice/CONFIGURATION_GMAIL.md` pour plus de détails.

## ✨ Fonctionnalités

### Authentification
- ✅ Inscription utilisateur
- ✅ Connexion avec JWT
- ✅ Gestion des rôles (ADMIN, MARKETING_MANAGER, USER)
- ✅ Protection des routes avec guards

### Gestion des Événements
- ✅ CRUD complet des événements
- ✅ Inscription aux événements
- ✅ Gestion de la capacité
- ✅ Types d'événements (Webinaire, Salon, Promotion, Conférence, Atelier)
- ✅ Formats (Virtuel, Physique, Hybride)

### Gestion des Campagnes
- ✅ CRUD complet des campagnes
- ✅ Statuts (PLANIFIEE, ACTIVE, TERMINEE, ANNULEE)
- ✅ Canaux de communication (EMAIL, SMS, PUSH)
- ✅ Association avec événements

### Analytics
- ✅ Tableaux de bord statistiques
- ✅ Analyses des performances

### Notifications
- ✅ Envoi d'emails
- ✅ Notifications automatiques (inscriptions, campagnes)
- ✅ Gestion des statuts

### Administration
- ✅ Gestion des utilisateurs (Admin uniquement)
- ✅ Attribution des rôles

## 🔐 Sécurité

- **JWT** pour l'authentification
- **Spring Security** pour la protection des endpoints
- **CORS** configuré dans le Gateway
- **Guards Angular** pour la protection des routes frontend

## 📝 Notes importantes

1. **Ordre de démarrage** : Démarrez toujours Eureka et Config Server en premier
2. **Base de données** : Assurez-vous que PostgreSQL est démarré avant les microservices
3. **Variables d'environnement** : Configurez `MAIL_PASSWORD` et `GITHUB_TOKEN` si nécessaire
4. **Ports** : Vérifiez que tous les ports sont disponibles avant le démarrage

## 🐛 Dépannage

### Les services ne s'enregistrent pas dans Eureka
- Vérifiez que Eureka Server est démarré
- Vérifiez la configuration `eureka.client.service-url.defaultZone`

### Erreurs de connexion à la base de données
- Vérifiez que PostgreSQL est démarré
- Vérifiez les credentials dans `application.properties`

### Erreurs CORS
- Vérifiez la configuration CORS dans `reactivegateway`

### Erreurs JWT
- Vérifiez que le secret JWT est identique dans `userservice` et `reactivegateway`

## 📚 Documentation supplémentaire

- `backend/eventservice/FLUX_INSCRIPTION_EVENEMENTS.md` - Flux d'inscription aux événements
- `backend/notificationservice/CONFIGURATION_GMAIL.md` - Configuration Gmail
- `backend/notificationservice/DEBUG_AUTHENTICATION_GMAIL.md` - Dépannage Gmail

## 👥 Auteur

Développé dans le cadre d'un projet académique.

## 📊 Statistiques GitHub

Ce projet est configuré pour que **Java soit le langage dominant** dans les statistiques GitHub. Les fichiers frontend (TypeScript, HTML, CSS) sont exclus du comptage linguistique via `.gitattributes`.

Pour forcer la mise à jour des statistiques sur GitHub :
1. Faites un commit vide : `git commit --allow-empty -m "Update language stats"`
2. Poussez vers GitHub : `git push`

## 📄 Licence

Ce projet est à des fins éducatives.

---

**Version :** 1.0.0  
**Dernière mise à jour :** Décembre 2024
