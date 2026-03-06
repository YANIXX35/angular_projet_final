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
        title: 'Bâtiment',
        description: 'Application de gestion complète pour les projets de construction et de bâtiment. Système de suivi des chantiers, gestion des ressources, planning des travaux, et reporting avancé.',
        shortDescription: 'Gestion de projets de construction et suivi de chantiers',
        technologies: ['Angular', 'Django', 'MySQL', 'REST API'],
        githubLink: 'https://github.com/YANIXX35/batiment',
        featured: true
      },
      {
        id: 2,
        title: 'Django Yanisse Final',
        description: 'API REST complète avec Django REST Framework. Système d\'authentification JWT, gestion des utilisateurs, permissions, et endpoints CRUD optimisés.',
        shortDescription: 'API REST Django avec authentication et gestion utilisateurs',
        technologies: ['Django', 'Django REST Framework', 'PostgreSQL', 'JWT'],
        githubLink: 'https://github.com/YANIXX35/django_yanisse_final'
      },
      {
        id: 3,
        title: 'Odoo YK',
        description: 'Module personnalisé pour Odoo ERP. Intégration de fonctionnalités métier spécifiques, reports personnalisés, et automatisation des processus d\'entreprise.',
        shortDescription: 'Module personnalisé pour Odoo ERP avec fonctionnalités métier',
        technologies: ['Odoo', 'Python', 'XML', 'PostgreSQL'],
        githubLink: 'https://github.com/YANIXX35/odoo_yk'
      }
    ];
  }
}
