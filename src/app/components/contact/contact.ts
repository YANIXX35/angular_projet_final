import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  contactForm: WritableSignal<ContactForm> = signal({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  
  isSubmitting = signal(false);
  submitMessage = signal('');
  submitSuccess = signal(false);

  onSubmitContact() {
    const formData = this.contactForm();
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      this.submitMessage.set('Veuillez remplir tous les champs obligatoires');
      this.submitSuccess.set(false);
      return;
    }

    this.isSubmitting.set(true);
    this.submitMessage.set('');

    // Simulation d'envoi (remplacer par vrai appel API)
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitMessage.set('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.');
      this.submitSuccess.set(true);
      
      // Réinitialiser le formulaire
      this.contactForm.set({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });
    }, 2000);
  }
}
