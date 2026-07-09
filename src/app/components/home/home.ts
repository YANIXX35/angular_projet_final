import { Component, OnDestroy, AfterViewInit, inject, effect } from '@angular/core';
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
  private scrambleRef: any;
  private pauseRef: any;
  private viewInitialized = false;
  private readonly CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?&*';

  private gsap = inject(GsapAnimationService);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  constructor() {
    effect(() => {
      const _lang = this.ls.lang();
      this.stopAll();
      this.phraseIndex = 0;
      this.subtitleText = '';
      if (this.viewInitialized) this.startScramble();
    });
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.startScramble();
  }

  private stopAll() {
    clearInterval(this.scrambleRef);
    clearTimeout(this.pauseRef);
  }

  private startScramble() {
    const cycle = () => {
      const target = this.T.home.phrases[this.phraseIndex];
      const totalSteps = target.length * 5;
      let step = 0;

      clearInterval(this.scrambleRef);
      this.scrambleRef = setInterval(() => {
        const locked = Math.floor(step / 5);
        this.subtitleText = target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < locked) return char;
            return this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
          })
          .join('');

        step++;

        if (step > totalSteps) {
          clearInterval(this.scrambleRef);
          this.subtitleText = target;
          this.pauseRef = setTimeout(() => {
            this.phraseIndex = (this.phraseIndex + 1) % this.T.home.phrases.length;
            cycle();
          }, 2500);
        }
      }, 35);
    };

    cycle();
  }

  ngOnDestroy() {
    this.stopAll();
    this.gsap.killAll();
  }
}
