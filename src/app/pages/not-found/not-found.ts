import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../translations/translations';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFoundComponent {
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }
}
