import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  level: string;
  level_display: string;
  category: string;
  category_display: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  technologies_list: string[];
  github_link: string;
  demo_link: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

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
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Profile API
  getProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profile/`);
  }

  // Skills API
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills/`);
  }

  // Projects API
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/`);
  }

  // Contact API
  sendContact(contactData: ContactForm): Observable<Contact> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Contact>(`${this.apiUrl}/contact/`, contactData, { headers });
  }

  // API Root (pour vérifier la connexion)
  getApiInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
}
