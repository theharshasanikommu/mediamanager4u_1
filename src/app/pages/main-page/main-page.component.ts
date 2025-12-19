import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';

// Component Imports
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SocialProofComponent } from '../../components/social-proof/social-proof.component';
import { ProblemComponent } from '../../components/problem/problem.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { ServicesComponent, Service } from '../../components/services/services.component';
import { TestimonialsComponent, Testimonial } from '../../components/testimonials/testimonials.component';
import { PricingComponent, PricingPackage } from '../../components/pricing/pricing.component';
import { FaqComponent, FAQ } from '../../components/faq/faq.component';
import { BlogComponent, BlogPost } from '../../components/blog/blog.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent, SocialLink } from '../../components/footer/footer.component';
import { WhatsAppWidgetComponent } from '../../components/whatsapp-widget/whatsapp-widget.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ALL_BLOG_POSTS } from '../../data/blog-posts';

declare var Calendly: any;

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    HeroComponent,
    SocialProofComponent,
    ProblemComponent,
    WhyUsComponent,
    TestimonialsComponent,
    ServicesComponent,
    PricingComponent,
    FaqComponent,
    BlogComponent,
    ContactComponent,
    FooterComponent,
    WhatsAppWidgetComponent
  ],
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class MainPageComponent {
  private sanitizer = inject(DomSanitizer);
  isScrolled = signal(false);
  activeSection = signal('');
  private sectionIds = ['why-us', 'services', 'pricing', 'faq', 'blog', 'contact'];
  selectedService = signal<Service | null>(null);
  selectedBlogPost = signal<BlogPost | null>(null);

  testimonials = signal<Testimonial[]>([
    { quote: 'Website Development', name: 'Hanuman & Co', title: 'Tax Auditors', avatar: 'https://picsum.photos/seed/hanuman/150/75' },
    { quote: '', name: 'RolexAds', title: 'Advertising Agency', avatar: 'https://picsum.photos/seed/rolexads/150/75' },
    { quote: 'Online Growth & Branding', name: "Papa's Kitchen", title: 'Cloud Kitchen', avatar: 'https://picsum.photos/seed/papakitchen/150/75' },
  ]);

  // Data Signals
  services = signal<Service[]>([
    {
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
      title: 'Personal Branding',
      description: 'We craft your unique story and build a powerful personal brand that resonates with your target audience.',
      detailedDescription: 'Our personal branding service is a comprehensive journey to define and amplify your unique identity. We start with a deep-dive discovery session to understand your values, strengths, and goals. From there, we develop your core messaging, visual identity, and online presence strategy. We help you create a consistent and authentic brand across all platforms, from LinkedIn to your personal website, ensuring you stand out to the right audience.',
      keyFeatures: ['Brand Blueprint Strategy', 'Content Calendar Creation', 'LinkedIn & X Optimization']
    },
    {
      icon: 'M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-6-6',
      title: 'SEO Strategy',
      description: 'Boost your visibility on search engines. We implement data-driven SEO strategies to drive organic traffic.',
      detailedDescription: 'Unlock your website\'s potential with our cutting-edge SEO strategies. We conduct thorough keyword research, on-page optimization, technical SEO audits, and quality link-building campaigns. Our goal is not just to rank higher but to attract qualified traffic that converts into loyal customers. We provide transparent monthly reports to track your progress and continuously refine our approach for maximum impact.',
      keyFeatures: ['Technical SEO Audits', 'Keyword Research & Mapping', 'Quality Link Building']
    },
     {
      icon: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9.75 6.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z',
      title: 'Web Design',
      description: 'Stunning, responsive websites that provide a seamless user experience and convert visitors into customers.',
      detailedDescription: 'Your website is your digital storefront. We design and develop beautiful, high-performance websites that are fully responsive and optimized for user experience. From sleek landing pages to complex e-commerce platforms, our designs are not only visually appealing but also strategically built to guide visitors towards conversion. We prioritize fast loading times, intuitive navigation, and a seamless journey from first click to final action.',
      keyFeatures: ['Responsive UX/UI Design', 'Fast Loading Speeds', 'CMS Integration']
    },
    {
      icon: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.158 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.206 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.344 48.344 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
      title: 'Content Creation',
      description: 'Engaging content that tells your story. From blog posts to video scripts, we create content that converts.',
      detailedDescription: 'Content is king, and we are your royal scribes. Our team of expert writers, designers, and videographers create compelling content tailored to your brand voice and audience. We produce everything from in-depth blog articles and case studies to engaging social media visuals and professional video content. Every piece of content is strategically designed to build authority, engage your community, and drive conversions.',
      keyFeatures: ['Blog & Article Writing', 'Video Scripting & Production', 'Social Media Visuals']
    },
    {
      icon: 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z',
      title: 'Social Media Mgmt',
      description: 'We manage your social media presence, building a community around your brand and driving engagement.',
      detailedDescription: 'Navigate the dynamic world of social media with a trusted partner. We manage your social media channels from top to bottom, including content scheduling, community engagement, and performance analytics. We tailor strategies for each platform, whether it\'s LinkedIn, Instagram, X (formerly Twitter), or TikTok, to build a loyal following, increase brand awareness, and drive meaningful interactions that support your business goals.',
      keyFeatures: ['Content Scheduling', 'Community Engagement', 'Performance Analytics']
    },
    {
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3.75A2.25 2.25 0 0018 1.5H6A2.25 2.25 0 003.75 3zM12 15.75h.008v.008H12v-.008z',
      title: 'Paid Advertising',
      description: 'Targeted ad campaigns on platforms like Google, Facebook, and Instagram to reach your ideal customers.',
      detailedDescription: 'Get immediate, targeted traffic with our expert paid advertising services. We design, launch, and manage high-ROI ad campaigns on Google Ads, Meta (Facebook & Instagram), and other key platforms. From audience targeting and ad copywriting to A/B testing and a strong return on investment.',
      keyFeatures: ['Google & Meta Ads Mgmt', 'A/B Testing & Optimization', 'ROI Tracking & Reporting']
    },
  ]);
  pricingPackages = signal<PricingPackage[]>([
    { name: 'Instagram Growth', price: 'Starting from ₹11,999/month', deliverables: ['Strategy + audience research', 'Story-based scripting', 'Short-form video production', 'Editing + scheduling', 'Sales-focused story posts', 'Static posts', 'Monthly analytics & growth report', 'Profile optimization', 'And more'] },
    { name: 'LinkedIn Growth', price: 'Starting from ₹5,999/month', deliverables: ['Complete profile optimization', 'Text + carousel + visual posts', 'Thought-leadership content', 'End-to-end video system (research → script → you film → we edit)', 'Content calendar & strategy', 'Monthly growth snapshot', 'Bi-weekly strategy calls', 'And more'] },
    { name: 'Facebook & Instagram Ads', price: 'Starting from ₹15,000/month', deliverables: ['Creative + copywriting for ads', 'Campaign setup & management', 'Weekly ad-set refresh', 'Lookalike & retargeting funnels', 'Engagement + lead snapshots', 'Monthly strategy sync', 'And more'] },
    { name: 'YouTube Growth', price: 'Starting from ₹20,000/month', deliverables: ['Long-form video editing', 'Shorts (repurposed + original)', 'Storyline-based scripting', 'Thumbnail design', 'Title + metadata optimization', 'Community engagement', 'Monthly performance report', 'And more'] },
    { name: 'SEO Optimization', price: 'Starting from ₹12,000/month', deliverables: ['Technical audit + fixes', 'On-page SEO', 'Keyword strategies', 'Content outlines', 'Link-building outreach', 'CRO recommendations', 'Monthly visibility report', 'And more'] },
    { name: 'Website Designing', price: 'Starting from ₹15,000 (one-time)', deliverables: ['Responsive custom website', 'Brand palette + typography system', 'UX-focused copywriting', 'Basic animations + interactions', 'CMS setup with editor training', 'Full QA + fast delivery', 'And more'] },
    { name: 'Influencer Marketing', price: 'Starting from ₹25,000/campaign', deliverables: ['Nano/micro-influencer selection', 'Campaign briefs + posting checklist', 'Story + reel packages', 'Tracking dashboard', 'Creator briefing + review calls', 'Post-campaign engagement report', 'And more'] },
    { name: 'Combo Packs', price: 'Starting from ₹14,999/month', deliverables: ['Multi-platform content execution', 'Short-form + long-form video mix', 'High-quality static posts', 'Platform-specific copywriting', 'Keyword-driven content planning', 'Monthly analytics & reporting', 'Cross-platform publishing', 'And more'] }
  ]);
  faqs = signal<FAQ[]>([
    { question: 'How is this different from other agencies?', answer: 'We specialize exclusively in personal branding for founders and executives. We don\'t just post content; we build integrated systems that turn your unique expertise into measurable authority and business opportunities. It\'s a partnership, not just a service.', open: false },
    { question: 'How much time do I need to invest?', answer: 'Your time is valuable. We\'ve designed our process to be efficient. Expect an initial 2-3 hour deep-dive strategy session. After that, we require as little as 1-2 hours per month for content approvals and strategy check-ins. We handle the rest.', open: false },
    { question: 'What kind of results can I expect?', answer: 'Clients typically see a significant increase in online visibility, audience engagement, and inbound leads. While results vary, our goal is to establish you as a go-to authority in your niche, leading to more speaking gigs, partnership offers, and high-value client inquiries.', open: false },
    { question: 'What if I\'m not creative or camera-shy?', answer: 'That\'s what we\'re here for! Our "Founder\'s Brand Blueprint" process is designed to extract your best ideas and insights effortlessly. We handle all the creative work, from writing to design. For on-camera work, we provide coaching and use formats that feel comfortable and authentic to you.', open: false },
    { question: 'How do you measure success?', answer: 'Success is measured against the specific goals we set in your Brand Blueprint. Key metrics often include follower growth, engagement rate, website traffic from social channels, lead quality, and direct messages/inquiries. We provide a detailed monthly report to track progress.', open: false },
    { question: 'Do you work with businesses in specific industries?', answer: 'We work with founders and executives across a wide range of industries, including SaaS, coaching, e-commerce, and professional services. Our principles of personal branding are adaptable, but we excel with clients who have deep expertise to share.', open: false },
    { question: 'Can I see examples of your work?', answer: 'Absolutely. Due to the confidential nature of personal branding for high-profile clients, we don\'t display a public portfolio. However, during our initial strategy call, we are happy to share relevant case studies and examples that align with your goals.', open: false }
  ]);
  blogPosts = signal<BlogPost[]>(ALL_BLOG_POSTS.slice(0, 3));
  socials = signal<SocialLink[]>([
    { name: 'Instagram', url: 'https://www.instagram.com/mediamanager4u/', svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/media-manager-4u/', svgPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'Email', url: 'mailto:contactmediamanager4u@gmail.com', svgPath: 'M3.75 5.25h16.5m-16.5 0v13.5h16.5V5.25m-16.5 0L12 12.75l8.25-7.5' }
  ]);
  
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 10);

    const sectionElements = this.sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);
    let currentSectionId = '';
    const fromTop = window.scrollY + 150;

    for (const section of sectionElements) {
        if (section!.offsetTop <= fromTop) {
            currentSectionId = section!.id;
        } else {
            break; 
        }
    }

    const whyUsElement = document.getElementById('why-us');
    if (whyUsElement && window.scrollY < whyUsElement.offsetTop - 150) {
        currentSectionId = '';
    }

    this.activeSection.set(currentSectionId);
  }

  openServiceModal(service: Service): void {
    this.selectedService.set(service);
  }

  closeServiceModal(): void {
    this.selectedService.set(null);
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