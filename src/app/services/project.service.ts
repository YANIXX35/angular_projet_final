import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getProjects(): Project[] {
    return [
      {
        id: 1,
        title: 'Italia Construction',
        description: 'Site web professionnel complet pour Italia Construction (Schiavone Group), entreprise de promotion immobilière et BTP basée à Grand-Bassam. Le site comprend un carousel hero, des pages À propos, Services, Projets (galerie photo/vidéo YouTube), Blog, Connexion et Contact. Développé avec PHP et Django REST API.',
        shortDescription: 'Site web BTP complet — Italia Construction, Grand-Bassam',
        technologies: ['PHP', 'Django', 'MySQL', 'REST API'],
        githubLink: 'https://github.com/YANIXX35/batiment',
        liveLink: '',
        image: 'assets/projects/batiment.jpg',
        featured: true
      },
      {
        id: 2,
        title: 'Vente de Véhicules',
        description: 'Application web de vente de véhicules développée avec Django. Catalogue de véhicules, fiches détaillées, système de recherche et filtres avancés. Interface complète côté client et administration.',
        shortDescription: 'Site de vente de véhicules en Django — catalogue et fiches produit',
        technologies: ['Django', 'Python', 'MySQL', 'HTML/CSS'],
        githubLink: 'https://github.com/YANIXX35/django_yanisse_final',
        liveLink: 'https://django-yanisse-final.onrender.com/',
        image: 'assets/projects/vehicules.jpg',
      },
      {
        id: 3,
        title: 'Module Odoo ERP',
        description: 'Module personnalisé pour Odoo ERP. Intégration de fonctionnalités métier spécifiques, reports personnalisés, et automatisation des processus d\'entreprise.',
        shortDescription: 'Module personnalisé Odoo ERP — Python + XML',
        technologies: ['Odoo', 'Python', 'XML', 'PostgreSQL'],
        githubLink: 'https://github.com/YANIXX35/odoo_yk',
        liveLink: '',
        image: 'assets/projects/odoo.jpg',
      }
    ];
  }
}
