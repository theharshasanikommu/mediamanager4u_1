import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface Service {
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  keyFeatures: string[];
}

@Component({
  selector: 'app-services',
  template: `
    <section id="services" class="py-16 bg-gray-100">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Our Core Services</h2>
                <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">A complete system for building your personal brand and driving business growth.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                @for (service of services(); track service.title) {
                <div class="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-300 hover:-translate-y-2 flex flex-col">
                    <div>
                      <div class="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white mb-4">
                          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="service.icon" />
                          </svg>
                      </div>
                      <h3 class="text-xl font-bold mb-2">{{ service.title }}</h3>
                      <p class="text-gray-600">{{ service.description }}</p>
                    </div>

                    <ul class="mt-6 space-y-2 text-gray-600 flex-grow">
                        @for(feature of service.keyFeatures; track feature) {
                            <li class="flex items-start">
                                <svg class="flex-shrink-0 h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="ml-3">{{ feature }}</span>
                            </li>
                        }
                    </ul>

                    <div class="mt-auto pt-6">
                       <button (click)="serviceClick.emit(service)" class="w-full text-center bg-white hover:bg-orange-500 text-orange-600 font-bold py-3 px-6 rounded-lg transition-colors duration-300 border-2 border-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/30">
                          Learn More
                      </button>
                    </div>
                </div>
                }
            </div>
        </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  services = input.required<Service[]>();
  serviceClick = output<Service>();
}