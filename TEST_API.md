# 🎯 TEST RAPIDE DE L'API

## 📋 Test avec curl (PowerShell)

```powershell
$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$body = @{
    name = "Test Déployé"
    email = "test@deploy.com"
    subject = "API Test"
    message = "Votre backend Django fonctionne parfaitement sur Render !"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://backend-django-9.onrender.com/api/contact/" -Method POST -Headers $headers -Body $body
    Write-Host "✅ Succès: $response"
} catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)"
    Write-Host "Status: $($_.Exception.Response.StatusCode)"
}
```

## 🌐 Test dans le navigateur

1. Ouvrez le navigateur
2. Allez sur: `https://backend-django-9.onrender.com/api/contact/`
3. Vous devriez voir une erreur 405 (normal, car POST requis)

## 📱 Test avec Postman/Insomnia

**URL:** `https://backend-django-9.onrender.com/api/contact/`
**Méthode:** POST
**Headers:** 
- Content-Type: application/json
- Accept: application/json

**Body (JSON):**
```json
{
    "name": "Test Déployé",
    "email": "test@deploy.com",
    "subject": "API Test",
    "message": "Votre backend Django fonctionne parfaitement sur Render !"
}
```

## 🔧 Vérifier les logs Render

Allez sur: https://dashboard.render.com/web/backend-django-9
Cliquez sur "Logs" pour voir les erreurs en temps réel.
