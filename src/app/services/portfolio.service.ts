import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
      return throwError('Tous les champs sont requis');
    }
    
    // Ajouter des headers explicites
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    return this.http.post(url, formData, httpOptions).pipe(
      tap(response => {
        console.log("✅ Réponse reçue du service:", response);
      }),
      catchError(error => {
        console.error("❌ Erreur dans le service:", error);
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        return throwError(error);
      })
    );
  }
}
