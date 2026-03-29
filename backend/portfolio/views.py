from django.core.mail import EmailMessage
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def contact_view(request):
    name = request.data.get("name", "").strip()
    email = request.data.get("email", "").strip()
    subject = request.data.get("subject", "").strip()
    message = request.data.get("message", "").strip()

    if not all([name, email, subject, message]):
        return Response({
            "status": "error",
            "message": "Tous les champs sont requis"
        }, status=400)

    full_message = f"""Nouveau message depuis le portfolio de Yanisse Kyliane Yao

Nom : {name}
Email : {email}
Sujet : {subject}

Message :
{message}
"""

    try:
        mail = EmailMessage(
            subject=f"[Portfolio] {subject}",
            body=full_message,
            from_email=settings.EMAIL_HOST_USER,
            to=['kyliyanisse@gmail.com'],
            reply_to=[f"{name} <{email}>"],
        )
        mail.send(fail_silently=False)

        logger.info(f"Email envoyé depuis {email} — sujet: {subject}")
        return Response({"status": "success", "message": "Email envoyé"})

    except Exception as e:
        logger.error(f"Erreur SMTP: {e}", exc_info=True)
        return Response({
            "status": "error",
            "message": f"Erreur lors de l'envoi: {str(e)}"
        }, status=500)
