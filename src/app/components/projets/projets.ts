import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

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

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.featuredProject = this.projects.find(p => p.featured) || this.projects[0];
    this.otherProjects = this.projects.filter(p => !p.featured);
  }
}
