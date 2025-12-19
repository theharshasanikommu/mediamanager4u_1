import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BlogPost {
  category: string;
  title: string;
  excerpt: string;
  authorName: string;
  fullContent: string;
}

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <section id="blog" class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Latest Insights</h2>
          <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">Actionable advice for founders looking to build an authoritative personal brand.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (post of blogPosts(); track post.title) {
            <div (click)="postClick.emit(post)" class="bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer">
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

        <div class="text-center mt-16">
            <a routerLink="/blog" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/40">
                Visit Our Full Blog
            </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  blogPosts = input.required<BlogPost[]>();
  postClick = output<BlogPost>();
}