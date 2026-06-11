import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  projectTypes = ['App web', 'App mobile', 'Data / IA', 'Backend API', 'Design', 'Formation', 'Autre'];
  selectedTypes: string[] = [];

  private SERVICE_ID = 'service_c2pzzfl';
  private TEMPLATE_ID = 'template_aq4yhax';
  private PUBLIC_KEY = 'rVw39cskZdDT6H8-i';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    emailjs.init(this.PUBLIC_KEY);

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      brief: ['', Validators.required],
    });
  }

  toggleType(type: string) {
    const idx = this.selectedTypes.indexOf(type);
    if (idx > -1) {
      this.selectedTypes.splice(idx, 1);
    } else {
      this.selectedTypes.push(type);
    }
  }

  isTypeSelected(type: string): boolean {
    return this.selectedTypes.includes(type);
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

    const { name, email, company, brief } = this.contactForm.value;

    const templateParams = {
      name,
      email,
      company: company || 'Non renseigné',
      subject: this.selectedTypes.join(', ') || 'Non spécifié',
      message: brief,
      time: new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' }),
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
      .then(() => {
        this.isLoading = false;
        this.successMessage = 'Message envoyé ! Je te réponds sous 24 h.';
        this.contactForm.reset();
        this.selectedTypes = [];
        setTimeout(() => this.successMessage = '', 6000);
      })
      .catch((error) => {
        console.error('Erreur EmailJS:', error);
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue. Réessaie ou contacte-moi directement.';
        setTimeout(() => this.errorMessage = '', 6000);
      });
  }
}
