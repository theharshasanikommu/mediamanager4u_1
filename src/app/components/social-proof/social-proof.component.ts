import { ChangeDetectionStrategy, Component, signal, AfterViewInit, OnDestroy, viewChild, ElementRef, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-social-proof',
  template: `
    <section class="py-12 bg-gray-50" #socialProof>
        <div class="container mx-auto px-6">
            <div class="bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
                    <div class="py-4 md:py-0">
                        <h3 class="text-4xl md:text-5xl font-extrabold text-white">{{ animatedPosts() }}+</h3>
                        <p class="mt-2 text-sm font-semibold text-gray-400 tracking-widest uppercase">POSTS CREATED</p>
                    </div>
                    <div class="py-4 md:py-0">
                        <h3 class="text-4xl md:text-5xl font-extrabold text-white">{{ animatedFollowers() }}+</h3>
                        <p class="mt-2 text-sm font-semibold text-gray-400 tracking-widest uppercase">ORGANIC FOLLOWERS GROWN</p>
                    </div>
                    <div class="py-4 md:py-0">
                        <h3 class="text-4xl md:text-5xl font-extrabold text-white">{{ animatedYears() }}+</h3>
                        <p class="mt-2 text-sm font-semibold text-gray-400 tracking-widest uppercase">YEARS EXPERIENCE</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialProofComponent implements AfterViewInit, OnDestroy {
  animatedPosts = signal(0);
  animatedFollowers = signal(0);
  animatedYears = signal(0);
  socialProofSection = viewChild.required<ElementRef>('socialProof');
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initIntersectionObserver(): void {
    const element = this.socialProofSection().nativeElement;
    if (!element) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounters();
          this.observer?.disconnect();
        }
      });
    }, options);

    this.observer.observe(element);
  }

  private startCounters(): void {
    this.animateValue(this.animatedPosts, 1000, 1500);
    this.animateValue(this.animatedFollowers, 80000, 1500);
    this.animateValue(this.animatedYears, 4, 1500);
  }

  private animateValue(targetSignal: WritableSignal<number>, end: number, duration: number): void {
    const steps = 50;
    const stepDuration = duration / steps;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        targetSignal.set(end);
        clearInterval(timer);
      } else {
        targetSignal.set(Math.ceil(current));
      }
    }, stepDuration);
  }
}
