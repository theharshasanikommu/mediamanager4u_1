import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonials',
  template: `
    <section id="clients" class="py-16 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Ambitious Founders & Industry Leaders</h2>
                <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">We're proud to have partnered with a diverse range of innovative companies.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                @for (testimonial of testimonials(); track testimonial.name) {
                <div class="bg-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center text-center h-full">
                    <div>
                        <p class="font-bold text-gray-900">{{ testimonial.name }}</p>
                        <p class="text-gray-500 text-sm mb-2">{{ testimonial.title }}</p>
                        @if (testimonial.quote) {
                            <div class="mt-2 pt-2 border-t border-gray-200">
                                <p class="text-xs text-gray-700 font-semibold">{{ testimonial.quote }}</p>
                            </div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  testimonials = input.required<Testimonial[]>();
}
