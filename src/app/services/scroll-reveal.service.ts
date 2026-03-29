import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }
}
