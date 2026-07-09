import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../translations/translations';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projets.html',
  styleUrl: './projets.scss',
})
export class ProjetsComponent implements OnInit {
  private _allProjects = signal<Project[]>([]);
  activeFilter = signal<string>('all');

  filterTechs = ['JavaScript', 'PHP', 'Django', 'Python', 'Odoo'];

  filteredProjects = computed(() => {
    const f = this.activeFilter();
    const all = this._allProjects();
    if (f === 'all') return all;
    return all.filter(p =>
      p.technologies.some(t => t.toLowerCase().includes(f.toLowerCase()))
    );
  });

  private projectService = inject(ProjectService);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  get featuredProject(): Project | null {
    const all = this._allProjects();
    return all.find(p => p.featured) ?? all[0] ?? null;
  }

  get otherProjects(): Project[] {
    return this._allProjects().filter(p => !p.featured);
  }

  desc(p: Project): string {
    return (this.ls.lang() === 'en' && p.description_en) ? p.description_en : p.description;
  }

  shortDesc(p: Project): string {
    return (this.ls.lang() === 'en' && p.shortDescription_en) ? p.shortDescription_en : p.shortDescription;
  }

  hasRealImage(p: Project): boolean {
    return !!p.image && p.image.endsWith('.png');
  }

  primaryTech(p: Project): string {
    return p.technologies[0] ?? '';
  }

  setFilter(tech: string) { this.activeFilter.set(tech); }

  ngOnInit() {
    this._allProjects.set(this.projectService.getProjects());
  }
}
