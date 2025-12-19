import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  template: `
    <section id="why-us" class="py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Why Choose MediaManager4U?</h2>
          <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">We handle everything—from strategy and content creation to distribution and growth. You just show up for a few hours a month to share your genius. We do the rest.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <!-- Item 1: Strategy -->
          <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                  </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Strategy & Blueprint</h3>
              <p class="text-gray-600">We start with a deep-dive to build a custom brand strategy that defines your unique message and positions you as an industry leader.</p>
          </div>
          <!-- Item 2: Content -->
          <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
                  </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Done-For-You Content</h3>
              <p class="text-gray-600">Our team handles all scripting, design, and production to create high-quality, engaging content that reflects your expertise.</p>
          </div>
          <!-- Item 3: Growth -->
          <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                 <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.517l2.74-1.22m0 0l-3.75-.625m3.75.625l-6.25 3.75" />
                  </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Growth & Distribution</h3>
              <p class="text-gray-600">We manage your channels, post content strategically, and engage with your community to build a loyal audience and drive results.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyUsComponent {}
