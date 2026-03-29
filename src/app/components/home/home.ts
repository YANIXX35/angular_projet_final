import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GsapAnimationService } from '../../services/gsap-animation.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  subtitleText = '';
  private phrases = [
    'Développeur Web Junior',
    'Étudiant en L3 Informatique',
    'Full Stack Passionné',
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeInterval: any;

  constructor(private gsap: GsapAnimationService) {}

  ngAfterViewInit() {
    this.startTypewriter();
  }

  private startTypewriter() {
    const tick = () => {
      const current = this.phrases[this.phraseIndex];
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
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
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
