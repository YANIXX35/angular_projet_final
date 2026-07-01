import { Component, OnInit, inject, PLATFORM_ID, HostListener, signal } from '@angular/core';
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

  showScrollTop = signal(false);
  readingProgress = signal(0);
  cursorVisible = signal(false);
  splashState = signal<'active' | 'fading' | 'done'>('done');
  splashProgress = signal(0);
  showEasterEgg = signal(false);

  private platformId = inject(PLATFORM_ID);
  private isFinePointer = false;
  private konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  private konamiIdx = 0;

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

    this.isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (this.isFinePointer) {
      document.body.classList.add('cursor-custom');
    }

    if (!sessionStorage.getItem('splashShown')) {
      this.splashState.set('active');
      let p = 0;
      const iv = setInterval(() => {
        p++;
        this.splashProgress.set(p);
        if (p >= 100) clearInterval(iv);
      }, 20);
      setTimeout(() => {
        this.splashState.set('fading');
        setTimeout(() => {
          this.splashState.set('done');
          sessionStorage.setItem('splashShown', '1');
        }, 700);
      }, 2000);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.showScrollTop.set(window.scrollY > 400);
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    this.readingProgress.set(docH > 0 ? Math.round((window.scrollY / docH) * 100) : 0);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId) || !this.isFinePointer) return;
    document.documentElement.style.setProperty('--cx', e.clientX + 'px');
    document.documentElement.style.setProperty('--cy', e.clientY + 'px');
    if (!this.cursorVisible()) this.cursorVisible.set(true);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (e.key === this.konamiCode[this.konamiIdx]) {
      this.konamiIdx++;
      if (this.konamiIdx === this.konamiCode.length) {
        this.konamiIdx = 0;
        this.showEasterEgg.set(true);
        setTimeout(() => this.showEasterEgg.set(false), 4500);
      }
    } else {
      this.konamiIdx = e.key === this.konamiCode[0] ? 1 : 0;
    }
  }

  scrollToTop() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeEasterEgg() { this.showEasterEgg.set(false); }
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
