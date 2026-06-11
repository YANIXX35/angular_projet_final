import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../translations/translations';

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
  selectedTypes: string[] = [];

  private fb = inject(FormBuilder);
  ls = inject(LanguageService);
  get T() { return translations[this.ls.lang()]; }
  get projectTypes() { return this.T.contact.projectTypes; }

  private SERVICE_ID = 'service_c2pzzfl';
  private TEMPLATE_ID = 'template_aq4yhax';
  private PUBLIC_KEY = 'rVw39cskZdDT6H8-i';

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
    if (idx > -1) this.selectedTypes.splice(idx, 1);
    else this.selectedTypes.push(type);
  }

  isTypeSelected(type: string): boolean {
    return this.selectedTypes.includes(type);
  }

  submitForm() {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(k => this.contactForm.get(k)?.markAsTouched());
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { name, email, company, brief } = this.contactForm.value;

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, {
      name,
      email,
      company: company || 'Non renseigné',
      subject: this.selectedTypes.join(', ') || 'Non spécifié',
      message: brief,
      time: new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' }),
    }).then(() => {
      this.isLoading = false;
      this.successMessage = this.T.contact.successMsg;
      this.contactForm.reset();
      this.selectedTypes = [];
      setTimeout(() => this.successMessage = '', 6000);
    }).catch(() => {
      this.isLoading = false;
      this.errorMessage = this.T.contact.errorMsg;
      setTimeout(() => this.errorMessage = '', 6000);
    });
  }
}
