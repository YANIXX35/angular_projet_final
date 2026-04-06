import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/apropos/apropos').then(m => m.AproposComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./components/competences/competences').then(m => m.CompetencesComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./components/projets/projets').then(m => m.ProjetsComponent)
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience').then(m => m.ExperienceComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
