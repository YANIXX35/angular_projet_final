import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AproposComponent } from './components/apropos/apropos';
import { CompetencesComponent } from './components/competences/competences';
import { ProjetsComponent } from './components/projets/projets';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AproposComponent
  },
  {
    path: 'skills',
    component: CompetencesComponent
  },
  {
    path: 'projects',
    component: ProjetsComponent
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
