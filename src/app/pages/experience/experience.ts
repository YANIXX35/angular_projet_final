import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';

@Component({
  selector: 'app-experience',
  imports: [RouterLink],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent implements AfterViewInit {
  constructor(private scrollReveal: ScrollRevealService) {}

  ngAfterViewInit() {
    this.scrollReveal.init();
  }
}
