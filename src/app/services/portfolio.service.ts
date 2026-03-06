import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://backend-django-9.onrender.com/api';

  constructor(private http: HttpClient) {}

  sendMessage(formData: ContactForm): Observable<any> {
    const url = `${this.apiUrl}/contact/`;
    console.log("=== ENVOI VERS L'API ===");
    console.log("URL:", url);
    console.log("Données brutes:", formData);
    console.log("Type de données:", typeof formData);
    
    // Vérifier que toutes les données sont présentes
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      console.error("❌ Données manquantes:", formData);
    }
    
    return this.http.post(url, formData).pipe(
      tap(response => {
        console.log("✅ Réponse reçue du service:", response);
      }),
      catchError(error => {
        console.error("❌ Erreur dans le service:", error);
        throw error;
      })
    );
  }
}
