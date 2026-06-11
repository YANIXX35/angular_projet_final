import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../translations/translations';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projets.html',
  styleUrl: './projets.scss',
})
export class ProjetsComponent implements OnInit {
  projects: Project[] = [];
  featuredProject: Project | null = null;
  otherProjects: Project[] = [];

  private projectService = inject(ProjectService);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  desc(p: Project): string {
    return (this.ls.lang() === 'en' && p.description_en) ? p.description_en : p.description;
  }
  shortDesc(p: Project): string {
    return (this.ls.lang() === 'en' && p.shortDescription_en) ? p.shortDescription_en : p.shortDescription;
  }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.featuredProject = this.projects.find(p => p.featured) || this.projects[0];
    this.otherProjects = this.projects.filter(p => !p.featured);
  }
}
