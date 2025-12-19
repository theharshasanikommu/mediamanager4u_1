import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-problem',
  template: `
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">You're an Expert, But Does Anyone Know It?</h2>
          <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-600">You're busy running a business. You don't have time to post on social media, write articles, or build a following. Your potential clients are out there, but they can't find you.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">Inconsistent Posting</h3>
            <p class="text-gray-600">Sporadic content that fails to build momentum or a loyal audience.</p>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">Generic Content</h3>
            <p class="text-gray-600">You sound like everyone else, failing to showcase your unique expertise.</p>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">Missed Opportunities</h3>
            <p class="text-gray-600">Leads, partnerships, and speaking gigs are passing you by.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemComponent {}
