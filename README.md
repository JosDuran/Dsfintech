# Frontend Angular – Gestión de Personas

SPA desarrollada en **Angular 16+** que consume un microservicio **Django REST** para la gestión de **Personas**.  
Este proyecto corresponde al desafío frontend y está preparado para ejecutarse en desarrollo y para generar un build optimizado de producción.

---

## 🧩 Funcionalidad implementada (MVP)

### Personas
- ✅ Listar personas (`GET /api/v1/persons/`)
- ✅ Crear persona (`POST /api/v1/persons/`)
- ✅ Editar persona (`GET /api/v1/persons/{id}/`, `PUT/PATCH`)
- ✅ Eliminar persona (`DELETE /api/v1/persons/{id}/`)
- ✅ Confirmación antes de eliminar
- ✅ Formularios reactivos con validaciones
- ✅ Manejo de errores HTTP
- ✅ Indicadores de carga
- ✅ Mensajes de estado vacío

Campos mostrados:
- `first_name`
- `last_name`
- `email`
- `created_at`

---

## 🛠️ Stack tecnológico

- **Angular 16+**
- **TypeScript**
- **Angular Router**
- **HttpClient**
- **RxJS**
- **Bootstrap / TailwindCSS** (según configuración del proyecto)
- Backend esperado: **Django REST Framework**

---

## 📁 Arquitectura del proyecto

.
├── frontend
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.ico
│   ├── README.md
│   ├── src
│   │   ├── app
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── auth
│   │   │   │   └── auth.module.ts
│   │   │   ├── persons
│   │   │   │   ├── pages
│   │   │   │   │   ├── person-form
│   │   │   │   │   │   ├── person-form.component.css
│   │   │   │   │   │   ├── person-form.component.html
│   │   │   │   │   │   ├── person-form.component.spec.ts
│   │   │   │   │   │   └── person-form.component.ts
│   │   │   │   │   └── person-list
│   │   │   │   │       ├── person-list.component.css
│   │   │   │   │       ├── person-list.component.html
│   │   │   │   │       ├── person-list.component.spec.ts
│   │   │   │   │       └── person-list.component.ts
│   │   │   │   ├── persons.module.ts
│   │   │   │   ├── persons-routing.module.ts
│   │   │   │   └── services
│   │   │   │       ├── person.service.spec.ts
│   │   │   │       └── person.service.ts
│   │   │   ├── products
│   │   │   │   ├── products.module.ts
│   │   │   │   └── products-routing.module.ts
│   │   │   └── shared
│   │   │       └── shared.module.ts
│   │   ├── environments
│   │   │   ├── environment.prod.ts
│   │   │   └── environment.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── Microservicio
│   ├── core
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── settings
│   │   │   ├── base.py
│   │   │   ├── dev.py
│   │   │   ├── __init__.py
│   │   │   └── prod.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   ├── docker-compose.yml
│   ├── dockerfile
│   ├── fillppl.py
│   ├── manage.py
│   ├── people
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── __init__.py
│   │   ├── migrations
│   │   │   ├── 0001_initial.py
│   │   │   └── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   └── requirements.txt
└── README.md


---

## 🧭 Rutas disponibles

| Ruta | Descripción |
|----|----|
| `/persons` | Listado de personas |
| `/persons/new` | Crear persona |
| `/persons/:id/edit` | Editar persona |

---

## ⚙️ Configuración de entornos del backend

### `.env` (desarrollo)
```
ruta del env: ./Microservicio/.env
DEBUG=True
SECRET_KEY=xyzw
DATABASE_URL=postgres://postgres:postgres@db:5432/app
DJANGO_SETTINGS_MODULE=core.settings.dev
LOG_LEVEL=DEBUG
ALLOWED_HOSTS=*
CORS_ALLOW_ALL_ORIGINS = True```

### `.env-prod` (produccion)
ruta del env: ./Microservicio/.env-prod

```
DJANGO_SETTINGS_MODULE=core.settings.prod
DEBUG=False
SECRET_KEY=**////4154dsfd
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgres://postgres:postgres@db:5432/app
LOG_LEVEL=INFO
CORS_ALLOW_ALL_ORIGINS=False
```
## ⚙️ Configuración de entornos del frontend

### `.environment.ts` (desarrollo)
ruta del env: ./frontend/src/environment.ts
```

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8000'
};
```

### `.environment.prod.ts` (produccion)
ruta del env: ./frontend/src/environment.prod.ts.ts

```
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.yourdomain.com'
};
```

## ⚙️ Poner en marcha el backend Microservicio

En caso se quieran recrear las migraciones, 

docker compose exec web python manage.py makemigrations people

sino:


```
docker compose up
docker compose exec web python manage.py migrate
docker compose exec web python manage.py fillppl

```



Paso previo si se quiere ejecutar

🚀 Ejecución en desarrollo del frontend/backend
Requisitos



Backend Django corriendo en http://localhost:8000

Pasos
git clone <url-del-repositorio>
cd frontend
docker compose up


La aplicación estará disponible en:

http://localhost:4200

🏗️ Build de producción
ng build --configuration production


El resultado se genera en:

dist/


Este build puede ser servido desde cualquier servidor estático (Nginx, Apache, etc.).

🧪 Validaciones implementadas
Persona

first_name: requerido (1–100)

last_name: requerido (1–100)

email: requerido, formato válido

Los errores se muestran claramente debajo de cada campo.

⚠️ Manejo de errores


Mensajes amigables en UI

Control de estados:

Cargando

Sin resultados

Error de servidor

📌 Estado del proyecto

✔️ CRUD Personas completo

✔️ Arquitectura modular

✔️ Preparado para producción

❌ Productos (no implementado por alcance)

❌ Autenticación JWT (opcional)

📄 Notas finales

Este proyecto cumple con el MVP del desafío frontend, priorizando:

Integración real con API

Buen criterio arquitectónico

Formularios reactivos

Preparación para producción

👤 Autor

Jose Duran
