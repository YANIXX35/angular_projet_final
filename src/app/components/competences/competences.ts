import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';

@Component({
  selector: 'app-competences',
  imports: [RouterLink],
  templateUrl: './competences.html',
  styleUrl: './competences.scss',
})
export class CompetencesComponent implements AfterViewInit {
  constructor(private scrollReveal: ScrollRevealService) {}

  ngAfterViewInit() {
    this.scrollReveal.init();
  }
}
