import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'Kouassi Yao Yanisse Kyliane — Développeur Full Stack & Data-Analyst',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    title: 'À Propos — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./components/apropos/apropos').then(m => m.AproposComponent)
  },
  {
    path: 'skills',
    title: 'Compétences — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./components/competences/competences').then(m => m.CompetencesComponent)
  },
  {
    path: 'projects',
    title: 'Projets — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./components/projets/projets').then(m => m.ProjetsComponent)
  },
  {
    path: 'experience',
    title: 'Expérience & Formations — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./pages/experience/experience').then(m => m.ExperienceComponent)
  },
  {
    path: 'certifications',
    title: 'Certifications — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./pages/certifications/certifications').then(m => m.CertificationsComponent)
  },
  {
    path: 'contact',
    title: 'Contact — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: '**',
    title: 'Page introuvable — Kouassi Yao Yanisse Kyliane',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent)
  }
];
