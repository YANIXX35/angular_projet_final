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
    
    // Logs pour diagnostiquer
    console.log("Formulaire initialisé:", this.contactForm);
    console.log("Formulaire valide au démarrage:", this.contactForm.valid);
    
    // Écouter les changements
    this.contactForm.valueChanges.subscribe(value => {
      console.log("Valeurs du formulaire:", value);
      console.log("Formulaire valide:", this.contactForm.valid);
      console.log("Erreurs du formulaire:", this.contactForm.errors);
    });
  }

  testForm() {
    console.log("=== TEST FORMULAIRE ===");
    
    // Données de test fixes
    const testData = {
      name: "YANISSE KYLIANE YAO",
      email: "kyliyanisse@gmail.com", 
      subject: "Test depuis Angular",
      message: "Ceci est un test du formulaire Angular"
    };
    
    console.log("Données de test:", testData);
    this.isLoading = true;

    this.portfolioService.sendMessage(testData).subscribe({
      next: (response) => {
        console.log("✅ Test réussi - Réponse API :", response);
        this.isLoading = false;
        alert("Test réussi ! Message envoyé avec les données de test.");
      },
      error: (error) => {
        console.error("❌ Test échoué - Erreur API :", error);
        this.isLoading = false;
        alert("Test échoué ! Erreur lors de l'envoi.");
      }
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      console.log("Formulaire invalide:", this.contactForm.value);
      // Marquer tous les champs comme touched pour afficher les erreurs
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    console.log("Données du formulaire:", this.contactForm.value);
    this.isLoading = true;

    this.portfolioService.sendMessage(this.contactForm.value).subscribe({
      next: (response) => {
        console.log("Réponse API :", response);
        this.isLoading = false;
        alert("Votre message a été envoyé avec succès");
        this.contactForm.reset();
      },
      error: (error) => {
        console.error("Erreur API :", error);
        this.isLoading = false;
        alert("Erreur lors de l'envoi");
      }
    });
  }
}
