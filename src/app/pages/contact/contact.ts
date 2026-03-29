import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService, ContactForm } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      // Marquer tous les champs comme touched pour afficher les erreurs
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;

    this.portfolioService.sendMessage(this.contactForm.value).subscribe({
      next: (response) => {
        console.log("✅ Réponse API :", response);
        this.isLoading = false;
        if (response && response.status === 'success') {
          alert("🎉 Votre message a été envoyé avec succès !");
          this.contactForm.reset();
        } else {
          alert("⚠️ Réponse inattendue du serveur");
        }
      },
      error: (error) => {
        console.error("❌ Erreur API :", error);
        this.isLoading = false;
        if (error.status === 400) {
          alert("❌ Veuillez vérifier tous les champs du formulaire");
        } else if (error.status === 500) {
          alert("❌ Erreur serveur. Veuillez réessayer dans quelques instants.");
        } else if (error.name === 'TimeoutError') {
          alert("⏳ Le serveur met du temps à démarrer (hébergement gratuit). Veuillez réessayer dans 30 secondes.");
        } else {
          alert("⏳ Le serveur est en cours de démarrage. Patientez 30 secondes et réessayez.");
        }
      }
    });
  }
}
