import { ChangeDetectionStrategy, Component, signal, input } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface SocialLink {
  name: string;
  url: string;
  svgPath: string;
}

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule],
  template: `
    <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-6 py-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                  <h3 class="text-xl font-bold">MediaManager<span class="text-orange-500">4U</span></h3>
                  <p class="mt-2 text-gray-400">Building brands that speak, connect, and convert.</p>
                  <div class="mt-4 space-y-2">
                      <a href="tel:+919558030481" class="flex items-center text-gray-400 hover:text-white transition-colors">
                          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          <span>+91 9558030481</span>
                      </a>
                      <a href="mailto:contactmediamanager4u@gmail.com" class="flex items-center text-gray-400 hover:text-white transition-colors">
                          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          <span>contactmediamanager4u@gmail.com</span>
                      </a>
                  </div>
                  <div class="flex space-x-4 mt-4">
                      @for (social of socials(); track social.name) {
                          <a [href]="social.url" target="_blank" class="text-gray-400 hover:text-white">
                              <span class="sr-only">{{ social.name }}</span>
                              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path [attr.d]="social.svgPath"></path></svg>
                          </a>
                      }
                  </div>
              </div>
              <div>
                  <h3 class="font-semibold tracking-wider uppercase">Stay Updated</h3>
                  <p class="mt-4 text-gray-400">Join our newsletter for the latest personal branding tips and insights.</p>
                  <form [formGroup]="newsletterForm" (ngSubmit)="onNewsletterSubmit()" class="mt-4 flex" role="form" aria-label="Newsletter subscription form">
                      <input type="email" formControlName="email" placeholder="Enter your email" [attr.aria-invalid]="newsletterForm.controls.email.invalid && newsletterForm.controls.email.touched" class="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <button type="submit" class="bg-orange-500 text-white font-semibold px-4 py-2 rounded-r-md hover:bg-orange-600">
                          &rarr;
                      </button>
                  </form>
                  @if (newsletterStatus() === 'success') {
                    <p class="text-green-400 mt-2" role="status">Thanks for subscribing!</p>
                  }
              </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
              &copy; {{ currentYear }} MediaManager4U. All Rights Reserved.
          </div>
      </div>
  </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  socials = input.required<SocialLink[]>();
  currentYear = new Date().getFullYear();
  
  newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  newsletterStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  onNewsletterSubmit(): void {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }
    this.newsletterStatus.set('submitting');
    // Submission successful (simulate async request)
    setTimeout(() => {
        this.newsletterStatus.set('success');
    }, 1500);
  }
}