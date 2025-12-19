import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent, SocialLink } from '../../components/footer/footer.component';
import { BlogPost } from '../../components/blog/blog.component';
import { ALL_BLOG_POSTS } from '../../data/blog-posts';
import { WhatsAppWidgetComponent } from '../../components/whatsapp-widget/whatsapp-widget.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var Calendly: any;

@Component({
  selector: 'app-blog-page',
  imports: [HeaderComponent, FooterComponent, WhatsAppWidgetComponent],
  template: `
    <div class="min-h-screen bg-gray-100 overflow-x-hidden flex flex-col">
      <app-header 
        [isScrolled]="isScrolled()" 
        [activeSection]="activeSection()"
        (bookCall)="openCalendlyModal()" />

      <main class="flex-grow pt-24">
        <section id="full-blog" class="py-16 bg-white">
          <div class="container mx-auto px-6">
            <div class="text-center mb-12">
              <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Our Blog</h1>
              <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">Actionable advice and insights for founders looking to build an authoritative personal brand.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (post of allPosts(); track post.title) {
                <div (click)="openBlogPostModal(post)" class="bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer">
                  <div class="p-6 flex flex-col flex-grow">
                    <p class="text-sm font-semibold text-orange-500 uppercase">{{ post.category }}</p>
                    <h3 class="mt-2 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {{ post.title }}
                    </h3>
                    <p class="mt-3 text-gray-600 flex-grow">{{ post.excerpt }}</p>
                    <div class="mt-6">
                      <p class="font-semibold text-gray-900">{{ post.authorName }}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
      </main>

      <app-footer [socials]="socials()" />

      <!-- Blog Post Modal -->
      @if (selectedBlogPost(); as post) {
      <div class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" (click)="closeBlogPostModal()">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto max-h-[90vh] flex flex-col animate-scale-in" (click)="$event.stopPropagation()">
              <div class="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                  <h2 class="text-2xl font-bold text-gray-900">{{ post.title }}</h2>
                  <button (click)="closeBlogPostModal()" aria-label="Close dialog" class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
              </div>
              <div class="p-6 md:p-8 overflow-y-auto">
                  <p class="text-sm text-gray-500 mb-6 font-medium">By {{ post.authorName }}</p>
                  <div class="text-gray-700 leading-relaxed space-y-4" [innerHTML]="sanitizeHtml(post.fullContent)"></div>
              </div>
              <div class="bg-gray-50 p-6 mt-auto rounded-b-2xl text-center flex-shrink-0">
                  <p class="text-lg font-semibold text-gray-800">Ready to build a brand that converts?</p>
                  <p class="text-gray-600 mt-1 mb-4">Let's turn your expertise into authority.</p>
                  <button (click)="openCalendlyModal(); closeBlogPostModal();" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105">
                      Book a Free Strategy Call
                  </button>
              </div>
          </div>
      </div>
      }

      <app-whatsapp-widget />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class BlogPageComponent {
  private sanitizer = inject(DomSanitizer);
  allPosts = signal<BlogPost[]>(ALL_BLOG_POSTS);
  selectedBlogPost = signal<BlogPost | null>(null);
  isScrolled = signal(false);
  activeSection = signal(''); // No active section on this page

  socials = signal<SocialLink[]>([
    { name: 'Instagram', url: 'https://www.instagram.com/mediamanager4u/', svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/media-manager-4u/', svgPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'Email', url: 'mailto:contactmediamanager4u@gmail.com', svgPath: 'M3.75 5.25h16.5m-16.5 0v13.5h16.5V5.25m-16.5 0L12 12.75l8.25-7.5' }
  ]);
  
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  openBlogPostModal(post: BlogPost): void {
    this.selectedBlogPost.set(post);
  }

  closeBlogPostModal(): void {
    this.selectedBlogPost.set(null);
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  openCalendlyModal(): void {
    if (typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({ url: 'https://calendly.com/contactmediamanager4u/claim-your-free-strategy-call' });
    }
  }
}