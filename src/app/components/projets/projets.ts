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
  paginatedProjects: Project[] = [];
  featuredProject: Project | null = null;
  
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.featuredProject = this.projects.find(p => p.featured) || this.projects[0];
    this.calculatePagination();
    this.updatePaginatedProjects();
  }
  
  calculatePagination() {
    this.totalPages = Math.ceil(this.projects.length / this.itemsPerPage);
  }
  
  updatePaginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProjects();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProjects();
    }
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProjects();
    }
  }
}
