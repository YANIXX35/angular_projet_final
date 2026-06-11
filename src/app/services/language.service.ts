import { Injectable, signal } from '@angular/core';
import type { Lang } from '../translations/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang = signal<Lang>('fr');
  readonly lang = this._lang.asReadonly();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('portfolio-lang') as Lang | null;
      if (saved === 'fr' || saved === 'en') this._lang.set(saved);
    }
  }

  toggle() {
    const next: Lang = this._lang() === 'fr' ? 'en' : 'fr';
    this._lang.set(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('portfolio-lang', next);
    }
  }
}
