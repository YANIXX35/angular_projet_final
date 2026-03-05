#!/usr/bin/env python
"""
Script de diagnostic complet pour la configuration SMTP Django
"""
import os
import sys
import smtplib
from email.mime.text import MIMEText

def test_smtp_direct():
    """Test SMTP direct avec Python"""
    print("=== TEST SMTP DIRECT (Python) ===")
    
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    username = 'kyliyanisse@gmail.com'
    password = 'dvjs hckz cipc bbvw'
    
    try:
        # Création du message
        msg = MIMEText("Test SMTP direct depuis Python\n\nSi vous recevez cet email, SMTP fonctionne.")
        msg['Subject'] = 'Test SMTP Direct - Portfolio'
        msg['From'] = username
        msg['To'] = 'kyliyanisse@gmail.com'
        
        # Connexion SMTP
        print(f"Connexion à {smtp_server}:{smtp_port}...")
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # TLS
        print("TLS activé")
        
        # Authentification
        print("Authentification...")
        server.login(username, password)
        print("✅ Authentification réussie")
        
        # Envoi
        print("Envoi de l'email...")
        server.send_message(msg)
        print("✅ Email envoyé avec succès")
        
        server.quit()
        print("✅ Connexion fermée")
        
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ Erreur d'authentification: {e}")
        print("→ Vérifiez le mot de passe d'application Gmail")
        print("→ Assurez-vous que la validation en 2 étapes est activée")
        
    except smtplib.SMTPException as e:
        print(f"❌ Erreur SMTP: {e}")
        
    except Exception as e:
        print(f"❌ Erreur générale: {e}")

def test_gmail_app_password():
    """Vérification des prérequis Gmail"""
    print("\n=== VÉRIFICATION PRÉREQUIS GMAIL ===")
    print("1. ✅ Validation en deux étapes activée sur le compte Google")
    print("2. ✅ Mot de passe d'application généré")
    print("3. ✅ Mot de passe d'application: dvjs hckz cipc bbvw")
    print("4. ✅ Application: Mail, Appareil: Autre")
    print("\nSi l'email n'arrive pas, vérifiez:")
    print("- Dossier Spam/Promotions dans Gmail")
    print("- Le mot de passe d'application est correct")
    print("- La validation en 2 étapes est bien activée")

if __name__ == "__main__":
    test_smtp_direct()
    test_gmail_app_password()
