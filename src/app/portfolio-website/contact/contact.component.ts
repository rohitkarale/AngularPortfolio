import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true, // Added for standalone components if using Angular v15+
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // Ensure the correct path is set
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize form with validation rules
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  // Method triggered on form submission
  onSubmit() {
    // Check if the form is valid
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;

      // Log a success message
      console.log('Form is valid and ready to submit:', formValues);

      // Send email using EmailJS
      emailjs
        .send(
          'service_b6knl4c', // Replace with your EmailJS Service ID
          'template_z4oj7hd', // Replace with your EmailJS Template ID
          {
            fullName: formValues.fullName,
            email: formValues.email,
            mobileNumber: formValues.mobileNumber,
            subject: formValues.subject,
            message: formValues.message,
          },
          'wqp2NbQXMDIV9T7cc' // Replace with your EmailJS Public Key
        )
        .then(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: '🎉 Message Sent!',
              html: `<p style="color: #4caf50; font-weight: bold;">
                      Your message has been sent successfully! 🎊
                     </p>
                     <p style="color: #555;">
                      Thank you for reaching out. We'll get back to you soon.
                     </p>`,
              confirmButtonText: 'Awesome! 🚀',
              background: 'linear-gradient(to right, #a8edea, #fed6e3)', // Gradient background
              backdrop: `rgba(0, 0, 0, 0.4) url("https://i.giphy.com/media/3o6ZsWcJFyZWUN9BUU/giphy.webp") repeat`,
            });
            this.contactForm.reset(); // Reset form after successful submission
            console.log('Email sent successfully!', response.status, response.text);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: '😥 Oops!',
              html: `<p style="color: #e57373; font-weight: bold;">
                      Something went wrong. Please try again.
                     </p>
                     <p style="color: #555;">
                      Check your connection or try refreshing the page.
                     </p>`,
              confirmButtonText: 'Retry 🔄',
              background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
              backdrop: `rgba(0, 0, 0, 0.4) url("https://i.giphy.com/media/xT1R9GYH5YwWbQJBUk/giphy.webp") repeat`,
            });
            console.error('Error while sending email:', error);
          }
        );
    } else {
      // If the form is invalid, mark all fields as touched to show validation errors
      this.contactForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Invalid Form',
        html: `<p style="color: #fdd835; font-weight: bold;">
                Please check the fields and correct any errors.
               </p>
               <p style="color: #555;">
                All fields are required. Ensure your email is valid.
               </p>`,
        confirmButtonText: 'Fix it! ✍️',
        background: 'linear-gradient(to right, #fff1eb, #ace0f9)',
        backdrop: `rgba(0, 0, 0, 0.4) url("https://i.giphy.com/media/3oEjHCWdU7F4wJpdL6/giphy.webp") repeat`,
      });
      console.warn('Form is invalid. Please check the fields.');
    }
  }
}
