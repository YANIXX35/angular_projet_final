#!/usr/bin/env python
import os
import sys
import django

# Ajouter le chemin du projet
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings

print("=== TEST DE CONFIGURATION SMTP ===")
print(f"EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
print(f"EMAIL_HOST: {settings.EMAIL_HOST}")
print(f"EMAIL_PORT: {settings.EMAIL_PORT}")
print(f"EMAIL_USE_TLS: {settings.EMAIL_USE_TLS}")
print(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
print(f"EMAIL_HOST_PASSWORD: {'*' * len(settings.EMAIL_HOST_PASSWORD) if settings.EMAIL_HOST_PASSWORD else 'None'}")
print()

print("=== ENVOI D'EMAIL DE TEST ===")
try:
    result = send_mail(
        "Test SMTP - Portfolio Django",
        "Ceci est un test de configuration SMTP depuis Django.\n\nSi vous recevez cet email, la configuration est correcte.",
        settings.EMAIL_HOST_USER,
        ["kyliyanisse@gmail.com"],
        fail_silently=False
    )
    print(f"✅ Email envoyé avec succès! Résultat: {result}")
except Exception as e:
    print(f"❌ Erreur lors de l'envoi: {e}")
    print(f"Type d'erreur: {type(e).__name__}")
    
print("\n=== FIN DU TEST ===")
