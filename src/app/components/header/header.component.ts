import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  title: string;
  path?: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            [class.bg-white/60]="isScrolled()"
            [class.backdrop-blur-lg]="isScrolled()"
            [class.shadow-md]="isScrolled()">
      <div class="container mx-auto px-6 py-3 flex justify-between items-center">
        <a [routerLink]="['/']">
          <h1 class="text-2xl font-bold text-gray-900">
            MediaManager<span class="text-orange-500">4U</span>
          </h1>
        </a>
        <nav class="hidden md:flex items-center space-x-2 lg:space-x-4">
          @for (link of navLinks; track link.title) {
            @if (link.path) {
              <a [routerLink]="link.path"
                [class.text-orange-500]="router.url.startsWith(link.path) || activeSection() === link.fragment"
                class="px-3 py-2 text-gray-600 hover:text-orange-500 font-medium relative transition-colors duration-300 group">
                {{ link.title }}
                <span class="absolute bottom-1 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                      [class.scale-x-100]="router.url.startsWith(link.path) || activeSection() === link.fragment"></span>
              </a>
            } @else {
              <a [href]="'/# ' + link.fragment" (click)="scrollToSection($event, link.fragment!)"
                class="px-3 py-2 text-gray-600 hover:text-orange-500 font-medium relative transition-colors duration-300 group"
                [class.text-orange-500]="activeSection() === link.fragment">
                {{ link.title }}
                <span class="absolute bottom-1 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                      [class.scale-x-100]="activeSection() === link.fragment"></span>
              </a>
            }
          }
        </nav>
        <button (click)="bookCall.emit()" class="hidden md:block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30">
          Book a Free Strategy Call
        </button>
        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button (click)="toggleMobileMenu()" aria-label="Open mobile navigation" class="text-gray-800 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    @if (isMobileMenuOpen()) {
      <div class="fixed inset-0 bg-black/50 z-50 animate-fade-in" (click)="closeMobileMenu()">
          <div class="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white/80 backdrop-blur-lg shadow-lg p-8 animate-slide-in-right" (click)="$event.stopPropagation()">
              <!-- Close Button -->
              <div class="flex justify-end mb-8">
                  <button (click)="closeMobileMenu()" aria-label="Close mobile navigation" class="text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md">
                      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                  </button>
              </div>
              <!-- Navigation Links -->
              <nav class="flex flex-col space-y-6 text-lg">
                  @for (link of navLinks; track link.title) {
                    @if (link.path) {
                      <a [routerLink]="link.path" (click)="closeMobileMenu()" 
                        class="text-gray-700 hover:text-orange-500 cursor-pointer" 
                        [class.text-orange-500]="router.url.startsWith(link.path) || activeSection() === link.fragment" 
                        [class.font-semibold]="router.url.startsWith(link.path) || activeSection() === link.fragment">
                        {{ link.title }}
                      </a>
                    } @else {
                      <a [href]="'/# ' + link.fragment" (click)="scrollToSectionAndClose($event, link.fragment!)" class="text-gray-700 hover:text-orange-500 cursor-pointer" [class.text-orange-500]="activeSection() === link.fragment" [class.font-semibold]="activeSection() === link.fragment">
                        {{ link.title }}
                      </a>
                    }
                  }
              </nav>
              <button (click)="bookCallAndCloseMenu()" class="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-md transition-colors">
                Book a Free Strategy Call
              </button>
          </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isScrolled = input.required<boolean>();
  activeSection = input.required<string>();
  bookCall = output<void>();
  isMobileMenuOpen = signal(false);
  
  readonly router: Router = inject(Router);

  navLinks: NavLink[] = [
    { title: 'Why Us?', fragment: 'why-us' },
    { title: 'Services', fragment: 'services' },
    { title: 'Pricing', fragment: 'pricing' },
    { title: 'FAQ', fragment: 'faq' },
    { title: 'Blog', path: '/blog', fragment: 'blog' },
    { title: 'Contact', fragment: 'contact' },
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  bookCallAndCloseMenu(): void {
    this.bookCall.emit();
    this.closeMobileMenu();
  }

  scrollToSection(event: MouseEvent, fragment: string): void {
    event.preventDefault();
    if (this.router.url.startsWith('/blog')) {
      this.router.navigate(['/'], { fragment });
    } else {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  scrollToSectionAndClose(event: MouseEvent, fragment: string): void {
    this.scrollToSection(event, fragment);
    this.closeMobileMenu();
  }
}