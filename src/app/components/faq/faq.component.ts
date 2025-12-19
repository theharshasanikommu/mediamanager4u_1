import { ChangeDetectionStrategy, Component, model } from '@angular/core';

export interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-faq',
  template: `
    <section id="faq" class="py-16 bg-gray-50">
        <div class="container mx-auto px-6 max-w-4xl">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div class="space-y-4">
                @for (faq of faqs(); track $index) {
                <div class="bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm overflow-hidden">
                    <button (click)="toggleFaq($index)" class="w-full flex justify-between items-center text-left p-6">
                        <span class="text-lg font-semibold text-gray-800">{{ faq.question }}</span>
                        <span class="text-orange-500 transform transition-transform duration-300" [class.rotate-45]="faq.open">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </span>
                    </button>
                    <div class="faq-answer" [class.open]="faq.open">
                        <div class="p-6 pt-0 text-gray-600">
                            <p>{{ faq.answer }}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  faqs = model.required<FAQ[]>();

  toggleFaq(index: number): void {
    this.faqs.update(faqs => {
      return faqs.map((faq, i) => ({ 
        ...faq, 
        open: i === index ? !faq.open : false 
      }));
    });
  }
}