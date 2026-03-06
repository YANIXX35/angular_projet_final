import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'yao';
  isMenuOpen = false;
  
  constructor() {
    // Vérifier si nous sommes dans un environnement navigateur
    if (typeof window !== 'undefined') {
      // Code navigateur uniquement
    }
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.classList.toggle('active');
      
      if (this.isMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(15, 23, 42, 0.98)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '20px';
        navLinks.style.borderRadius = '0 0 12px 12px';
        navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      } else {
        navLinks.style.display = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.background = '';
        navLinks.style.flexDirection = '';
        navLinks.style.padding = '';
        navLinks.style.borderRadius = '';
        navLinks.style.boxShadow = '';
      }
    }
  }
}
