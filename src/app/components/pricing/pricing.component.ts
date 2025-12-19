import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface PricingPackage {
  name: string;
  price: string;
  deliverables: string[];
}

@Component({
  selector: 'app-pricing',
  template: `
    <section id="pricing" class="py-16 bg-gray-100">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Our Packages</h2>
                <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">Transparent pricing for founders at every stage.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @for (pkg of pricingPackages(); track pkg.name) {
                <div class="bg-white rounded-2xl shadow-lg flex flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20">
                    <h3 class="text-2xl font-bold text-gray-900">{{ pkg.name }}</h3>
                    <p class="mt-4 text-3xl font-bold text-gray-800">{{ pkg.price }}</p>
                    
                    <ul class="mt-6 space-y-3 text-gray-600 flex-grow">
                        @for (item of pkg.deliverables; track item) {
                        <li class="flex items-start">
                            <svg class="flex-shrink-0 h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="ml-3">{{ item }}</span>
                        </li>
                        }
                    </ul>

                    <div class="mt-auto pt-6">
                        <button (click)="bookCall.emit()" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
                            Book a Strategy Call
                        </button>
                    </div>
                </div>
                }
            </div>
             <div class="text-center mt-12">
                <button (click)="bookCall.emit()" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40">
                    Book a Call to Get Started
                </button>
            </div>
        </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
  pricingPackages = input.required<PricingPackage[]>();
  bookCall = output<void>();
}