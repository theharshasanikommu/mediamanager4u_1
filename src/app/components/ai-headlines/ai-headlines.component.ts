import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-ai-headlines',
  imports: [ReactiveFormsModule],
  template: `
    <section id="ai-tool" class="py-16 bg-gray-800 text-white">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
            Generate Scroll-Stopping Headlines with AI
          </h2>
          <p class="mt-4 text-lg text-gray-300">
            Get a taste of our marketing expertise. Enter your details below and let our AI-powered tool craft five catchy headlines for your business, instantly.
          </p>
        </div>

        <div class="mt-12 max-w-2xl mx-auto">
          <form [formGroup]="headlineForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 gap-y-6 bg-gray-900/50 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div>
              <label for="industry" class="block text-sm font-medium text-gray-300">Your Industry / Niche</label>
              <input type="text" formControlName="industry" id="industry" placeholder="e.g., SaaS, E-commerce, Coaching" class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>
            
            <div>
              <label for="audience" class="block text-sm font-medium text-gray-300">Target Audience</label>
              <input type="text" formControlName="audience" id="audience" placeholder="e.g., Startup Founders, Busy Moms, Fitness Enthusiasts" class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500">
            </div>
            
            <div>
              <label for="benefit" class="block text-sm font-medium text-gray-300">Main Benefit of Your Product/Service</label>
              <textarea formControlName="benefit" id="benefit" rows="3" placeholder="e.g., Saves 10 hours per week, Doubles sales conversions" class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm py-3 px-4 focus:border-orange-500 focus:ring-orange-500"></textarea>
            </div>

            <div>
              <button type="submit" [disabled]="headlineForm.invalid || isLoading()" class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                @if (isLoading()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Headlines...</span>
                } @else {
                  <span>Generate My Headlines</span>
                }
              </button>
            </div>
          </form>

          @if (error()) {
            <div class="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
              <p>{{ error() }}</p>
            </div>
          }

          @if (headlines().length > 0) {
            <div class="mt-12">
              <h3 class="text-xl font-bold text-center">Your AI-Generated Headlines</h3>
              <ul class="mt-6 space-y-4">
                @for (headline of headlines(); track $index) {
                  <li class="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center border border-gray-600">
                    <span class="text-gray-200">{{ headline }}</span>
                    <button (click)="copyToClipboard(headline, $index)" class="text-sm font-semibold px-3 py-1 rounded-md transition-colors" [class.bg-green-500]="copiedIndex() === $index" [class.text-white]="copiedIndex() === $index" [class.bg-gray-600]="copiedIndex() !== $index" [class.hover:bg-gray-500]="copiedIndex() !== $index" [class.text-gray-300]="copiedIndex() !== $index">
                      @if (copiedIndex() === $index) {
                        <span>Copied!</span>
                      } @else {
                        <span>Copy</span>
                      }
                    </button>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiHeadlinesComponent {
  private geminiService = inject(GeminiService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  headlines = signal<string[]>([]);
  copiedIndex = signal<number | null>(null);

  headlineForm = new FormGroup({
    industry: new FormControl('', [Validators.required, Validators.minLength(3)]),
    audience: new FormControl('', [Validators.required, Validators.minLength(3)]),
    benefit: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  async onSubmit(): Promise<void> {
    if (this.headlineForm.invalid) {
      this.headlineForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.headlines.set([]);
    this.copiedIndex.set(null);

    const { industry, audience, benefit } = this.headlineForm.getRawValue();

    try {
      const generatedHeadlines = await this.geminiService.generateHeadlines(
        industry!,
        audience!,
        benefit!
      );
      this.headlines.set(generatedHeadlines);
    } catch (e: unknown) {
      this.error.set((e instanceof Error) ? e.message : 'An unexpected error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }

  copyToClipboard(headline: string, index: number): void {
    navigator.clipboard.writeText(headline).then(() => {
      this.copiedIndex.set(index);
      setTimeout(() => {
        if (this.copiedIndex() === index) {
            this.copiedIndex.set(null);
        }
      }, 2000);
    }).catch(() => {
      // Silently handle clipboard copy errors to avoid console noise in production
    });
  }
}
