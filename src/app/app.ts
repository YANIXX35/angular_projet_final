import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from './services/language.service';
import { translations } from './translations/translations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'yao';
  isMenuOpen = false;
  isDark = true;

  private platformId = inject(PLATFORM_ID);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      this.isDark = false;
      document.body.classList.add('light');
    } else if (!saved) {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersLight) {
        this.isDark = false;
        document.body.classList.add('light');
      }
    }
    document.documentElement.removeAttribute('data-theme');
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
  }

  toggleLang() { this.ls.toggle(); }
}
