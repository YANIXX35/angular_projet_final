import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class GsapAnimationService {

  // Animations d'entrée de la page Hero
  animateHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-text h1', { y: 60, opacity: 0, duration: 0.9, delay: 0.1 })
      .from('.hero-text .subtitle', { y: 40, opacity: 0, duration: 0.7 }, '-=0.4')
      .from('.hero-text p', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.stat-item', { y: 30, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.3')
      .from('.hero-buttons .cta-button', { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.3')
      .from('.profile-image-container', { x: 60, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=1.2');
  }

  // Révélation sections au scroll
  animateSections() {
    gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    });

    // Stagger pour les grilles de cartes
    gsap.utils.toArray<HTMLElement>('.gsap-stagger').forEach(container => {
      const children = container.children;
      gsap.from(children, {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    });
  }

  // Titre animé avec gradient en mouvement
  animateGradientText(selector: string) {
    gsap.to(selector, {
      backgroundPosition: '200% center',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  // Glow pulsant sur l'image
  animateProfileGlow() {
    gsap.to('.profile-image-container', {
      boxShadow: '0 0 40px rgba(255,107,107,0.6), 0 25px 50px rgba(0,0,0,0.4)',
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  // Nettoyage entre routes
  killAll() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf('*');
  }
}
