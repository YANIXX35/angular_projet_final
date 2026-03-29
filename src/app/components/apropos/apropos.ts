import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';

@Component({
  selector: 'app-apropos',
  imports: [RouterLink],
  templateUrl: './apropos.html',
  styleUrl: './apropos.scss',
})
export class AproposComponent implements AfterViewInit {
  constructor(private scrollReveal: ScrollRevealService) {}

  ngAfterViewInit() {
    this.scrollReveal.init();
  }
}
