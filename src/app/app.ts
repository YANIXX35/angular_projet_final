import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'yao';
  
  constructor() {
    // Vérifier si nous sommes dans un environnement navigateur
    if (typeof window !== 'undefined') {
      // Code navigateur uniquement
    }
  }
}
