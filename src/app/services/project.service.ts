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
        title: 'Gestion de Mail — Notifications Telegram & WhatsApp',
        description: 'Application web personnelle de notification d\'e-mails permettant de recevoir ses messages directement sur Telegram et WhatsApp. La partie Telegram est finalisée et déployée en production sur Vercel. L\'intégration WhatsApp est en cours de développement. Ce projet démontre la maîtrise des APIs externes et le déploiement d\'applications en production.',
        shortDescription: 'App de notification mail → Telegram & WhatsApp — déployée sur Vercel',
        technologies: ['JavaScript', 'APIs externes', 'Telegram API', 'Vercel'],
        githubLink: '',
        liveLink: 'https://bs-mailnotif-nine.vercel.app/',
        image: 'assets/projects/mailnotif.jpg',
        featured: true
      },
      {
        id: 2,
        title: 'Italia Construction',
        description: 'Site web pour Italia Construction, une entreprise du secteur du BTP. Le site comprend une page de présentation de l\'entreprise ainsi qu\'un module de gestion de stock. Réalisé en PHP, MySQL et HTML/CSS.',
        shortDescription: 'Site web BTP — Italia Construction, Grand-Bassam',
        technologies: ['PHP', 'MySQL', 'HTML/CSS'],
        githubLink: 'https://github.com/YANIXX35/batiment',
        liveLink: '',
        image: 'assets/projects/batiment.jpg',
      },
      {
        id: 3,
        title: 'Vente de Véhicules',
        description: 'Application web de vente de véhicules développée avec Django. Catalogue de véhicules, fiches détaillées, système de recherche et filtres avancés. Interface complète côté client et administration.',
        shortDescription: 'Site de vente de véhicules en Django — catalogue et fiches produit',
        technologies: ['Django', 'Python', 'MySQL', 'HTML/CSS'],
        githubLink: 'https://github.com/YANIXX35/django_yanisse_final',
        liveLink: 'https://django-yanisse-final.onrender.com/',
        image: 'assets/projects/vehicules.jpg',
      },
      {
        id: 4,
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
