import { Component, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class HomeComponent implements OnDestroy {
  private gsap = inject(GsapAnimationService);
  private platformId = inject(PLATFORM_ID);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  scrollDown() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }

  ngOnDestroy() { this.gsap.killAll(); }
}
