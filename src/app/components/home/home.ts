import { Component, OnInit, OnDestroy, AfterViewInit, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GsapAnimationService } from '../../services/gsap-animation.service';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../translations/translations';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  subtitleText = '';
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeInterval: any;
  private viewInitialized = false;

  private gsap = inject(GsapAnimationService);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  constructor() {
    effect(() => {
      const _lang = this.ls.lang();
      clearTimeout(this.typeInterval);
      this.subtitleText = '';
      this.phraseIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      if (this.viewInitialized) this.startTypewriter();
    });
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.startTypewriter();
  }

  private startTypewriter() {
    const tick = () => {
      const current = this.T.home.phrases[this.phraseIndex];
      if (this.isDeleting) {
        this.subtitleText = current.substring(0, this.charIndex - 1);
        this.charIndex--;
      } else {
        this.subtitleText = current.substring(0, this.charIndex + 1);
        this.charIndex++;
      }

      let delay = this.isDeleting ? 50 : 80;

      if (!this.isDeleting && this.charIndex === current.length) {
        delay = 1800;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.T.home.phrases.length;
        delay = 400;
      }

      this.typeInterval = setTimeout(tick, delay);
    };

    tick();
  }

  ngOnDestroy() {
    clearTimeout(this.typeInterval);
    this.gsap.killAll();
  }
}
