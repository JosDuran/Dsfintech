from .base import *

# Desarrollo
DEBUG = True

ALLOWED_HOSTS = ["*"]

# CORS (si luego instalas django-cors-headers)
# CORS_ALLOW_ALL_ORIGINS = True

# Seguridad relajada en dev
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
CORS_ALLOW_ALL_ORIGINS = True
