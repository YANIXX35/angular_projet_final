import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  private SERVICE_ID = 'service_c2pzzfl';
  private TEMPLATE_ID = 'template_aq4yhax';
  private PUBLIC_KEY = 'rVw39cskZdDT6H8-i';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    emailjs.init(this.PUBLIC_KEY);

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { name, email, subject, message } = this.contactForm.value;

    const templateParams = {
      name,
      email,
      subject,
      message,
      time: new Date().toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }),
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
      .then(() => {
        this.isLoading = false;
        this.successMessage = 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
        this.contactForm.reset();
      })
      .catch((error) => {
        console.error('Erreur EmailJS:', error);
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
      });
  }
}
