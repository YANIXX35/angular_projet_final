from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def contact_view(request):
    print("=== DÉBUT DE REQUÊTE CONTACT ===")
    print("Méthode:", request.method)
    print("DONNÉES REÇUES :", request.data)
    print("Headers:", request.headers)
    
    name = request.data.get("name")
    email = request.data.get("email")
    subject = request.data.get("subject")
    message = request.data.get("message")
    
    print(f"Nom: {name}")
    print(f"Email: {email}")
    print(f"Sujet: {subject}")
    print(f"Message: {message}")
    
    # Validation des données
    if not all([name, email, subject, message]):
        print("❌ Erreur: Champs manquants")
        return Response({
            "status": "error",
            "message": "Tous les champs sont requis"
        }, status=400)
    
    # Construction du message
    full_message = f"""
Nouveau message depuis le portfolio

Nom : {name}
Email : {email}
Sujet : {subject}

Message :
{message}
    """
    
    print("Préparation envoi d'email...")
    print(f"Expéditeur: {settings.EMAIL_HOST_USER}")
    print(f"Destinataire: kyliyanisse@gmail.com")
    
    try:
        # Envoi de l'email
        result = send_mail(
            subject=subject,
            message=full_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=['kyliyanisse@gmail.com'],
            fail_silently=False
        )
        
        print(f"✅ Email envoyé avec succès! Résultat: {result}")
        
        return Response({
            "status": "success",
            "message": "Email envoyé"
        })
        
    except Exception as e:
        print(f"❌ Erreur lors de l'envoi d'email: {e}")
        logger.error(f"Erreur SMTP: {e}", exc_info=True)
        return Response({
            "status": "error",
            "message": f"Erreur lors de l'envoi: {str(e)}"
        }, status=500)
