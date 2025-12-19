import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <section id="contact" class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to Become an Authority?</h2>
            <p class="mt-4 text-lg text-gray-600">Let's talk about how we can build your personal brand. Fill out the form below to get started.</p>
        </div>

        <div class="mt-12 max-w-2xl mx-auto">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6" role="form" aria-labelledby="contactHeading">
            
            <!-- Full Name -->
            <div class="md:col-span-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" formControlName="name" id="name" autocomplete="name" placeholder="John Doe" [attr.aria-invalid]="contactForm.controls.name.invalid && contactForm.controls.name.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

            <!-- Business Name -->
            <div class="md:col-span-1">
                <label for="businessName" class="block text-sm font-medium text-gray-700">Business Name</label>
                <input type="text" formControlName="businessName" id="businessName" placeholder="Your company or brand name" [attr.aria-invalid]="contactForm.controls.businessName.invalid && contactForm.controls.businessName.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

            <!-- Email -->
            <div class="md:col-span-1">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" formControlName="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" [attr.aria-invalid]="contactForm.controls.email.invalid && contactForm.controls.email.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

             <!-- Website -->
            <div class="md:col-span-1">
                <label for="website" class="block text-sm font-medium text-gray-700">Website (Optional)</label>
                <input type="text" formControlName="website" id="website" placeholder="https://example.com" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

            <!-- Business Type -->
            <div class="md:col-span-1">
            <label for="businessType" class="block text-sm font-medium text-gray-700">Business Type / Industry</label>
            <input type="text" formControlName="businessType" id="businessType" placeholder="e.g. SaaS, Coaching, Agency" [attr.aria-invalid]="contactForm.controls.businessType.invalid && contactForm.controls.businessType.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

            <!-- Phone -->
            <div class="md:col-span-1">
                 <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                 <input type="tel" formControlName="phone" id="phone" autocomplete="tel" placeholder="+1 (555) 123-4567" [attr.aria-invalid]="contactForm.controls.phone.invalid && contactForm.controls.phone.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

            <!-- Services looking for -->
            <div class="md:col-span-2">
                <label for="servicesNeeded" class="block text-sm font-medium text-gray-700">What services are you looking for?</label>
                <textarea id="servicesNeeded" formControlName="servicesNeeded" name="servicesNeeded" rows="4" placeholder="Tell us briefly what you need help with" [attr.aria-invalid]="contactForm.controls.servicesNeeded.invalid && contactForm.controls.servicesNeeded.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500"></textarea>
            </div>
            
            <!-- Is business funded -->
            <div class="md:col-span-1">
              <label for="isFunded" class="block text-sm font-medium text-gray-700">Is your business funded?</label>
              <select id="isFunded" formControlName="isFunded" [attr.aria-invalid]="contactForm.controls.isFunded.invalid && contactForm.controls.isFunded.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
                <option value="" disabled>Select an option</option>
                <option value="Yes, self-funded">Yes, self-funded</option>
                <option value="Yes, angel/VC funded">Yes, angel/VC funded</option>
                <option value="No, pre-revenue">No, pre-revenue</option>
              </select>
            </div>

             <!-- Team size -->
            <div class="md:col-span-1">
              <label for="teamSize" class="block text-sm font-medium text-gray-700">Team size</label>
              <select id="teamSize" formControlName="teamSize" [attr.aria-invalid]="contactForm.controls.teamSize.invalid && contactForm.controls.teamSize.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
                <option value="" disabled>Select team size</option>
                <option value="1 (Just me)">1 (Just me)</option>
                <option value="2-10">2-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="200+">200+</option>
              </select>
            </div>

            <!-- Your Role -->
            <div class="md:col-span-2">
                 <label for="role" class="block text-sm font-medium text-gray-700">Your role</label>
                 <input type="text" formControlName="role" id="role" placeholder="e.g. Founder, Co-founder, Marketing Head" [attr.aria-invalid]="contactForm.controls.role.invalid && contactForm.controls.role.touched" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>

            <div class="md:col-span-2">
                <button type="submit" [disabled]="contactForm.invalid" class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed" aria-live="polite">
                  <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 1.8 0.5 3.5 1.4 5.04L2 22l5.04-1.34c1.5 0.84 3.2 1.34 5 1.34c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zM16.5 13.9c-0.2-0.1-1.2-0.6-1.4-0.7c-0.2-0.1-0.3-0.1-0.5 0.1c-0.1 0.2-0.5 0.7-0.7 0.8c-0.1 0.1-0.2 0.2-0.4 0.1c-0.2-0.1-0.9-0.3-1.6-1c-0.6-0.5-1-1.2-1.1-1.4c-0.1-0.2 0-0.3 0.1-0.4c0.1-0.1 0.2-0.2 0.4-0.4c0.1-0.1 0.1-0.2 0.2-0.4c0.1-0.2 0-0.3-0.1-0.4c-0.1-0.1-0.5-1.2-0.7-1.6c-0.2-0.4-0.3-0.4-0.5-0.4h-0.5c-0.2,0-0.4,0.1-0.5,0.3c-0.1,0.2-0.7,0.8-0.7,2c0,1.2,0.7,2.3,0.8,2.4c0.1,0.2,1.4,2.1,3.4,3c0.5,0.2,0.8,0.3,1.1,0.4c0.5,0.2,1,0.1,1.3,0.1c0.4-0.1,1.2-0.5,1.3-1c0.2-0.5,0.2-0.9,0.1-1C16.9 14.2,16.7 14,16.5 13.9z"/>
                  </svg>
                  Send Message via WhatsApp
                </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    businessName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl(''),
    businessType: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    servicesNeeded: new FormControl('', Validators.required),
    isFunded: new FormControl('', Validators.required),
    teamSize: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = this.contactForm.getRawValue();
    const message = `
*New Business Inquiry from Website*

*Full Name:* ${formData.name}
*Business Name:* ${formData.businessName}
*Email:* ${formData.email}
*Website:* ${formData.website || 'N/A'}
*Business Type / Industry:* ${formData.businessType}
*Phone:* ${formData.phone}

*Services Looking For:*
${formData.servicesNeeded}

*Is your business funded?:* ${formData.isFunded}
*Team size:* ${formData.teamSize}
*Your role:* ${formData.role}
    `.trim();

    const whatsappUrl = `https://wa.me/919558030481?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}