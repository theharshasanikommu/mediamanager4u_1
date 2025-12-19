import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
      <div class="absolute inset-0 bg-gray-50"></div>
      <div class="relative container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 animate-slide-in-up">
          Tired of Being the Best-Kept Secret in Your Industry?
        </h1>
        <p class="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 animate-slide-in-up" [style.animation-delay]="'0.2s'">
          We build personal brands for founders that <span class="bg-orange-500 text-white font-bold px-2 py-1">speak, connect, and convert</span>—turning your expertise into authority and attracting a flood of new clients and opportunities.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up" [style.animation-delay]="'0.4s'">
          <button (click)="bookCall.emit()" class="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40">
            Claim Your Free Strategy Call
          </button>
          <a href="#services" (click)="scrollTo($event, 'services')" class="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg border border-gray-200">
            See Our Services
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  bookCall = output<void>();

  scrollTo(event: MouseEvent, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}