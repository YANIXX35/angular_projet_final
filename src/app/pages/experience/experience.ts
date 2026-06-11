import { Component, AfterViewInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../translations/translations';

@Component({
  selector: 'app-experience',
  imports: [RouterLink],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent implements AfterViewInit {
  private scrollReveal = inject(ScrollRevealService);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }

  ngAfterViewInit() {
    this.scrollReveal.init();
  }
}
