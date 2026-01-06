from .base import *

# Producción
DEBUG = False

ALLOWED_HOSTS = ["your-domain.com"]  # luego lo pasas por env

# Seguridad básica
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
