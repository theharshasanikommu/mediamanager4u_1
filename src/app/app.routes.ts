import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';

export const appRoutes: Routes = [
  { path: '', component: MainPageComponent, title: 'MediaManager4U - Personal Branding for Founders' },
  { path: 'blog', component: BlogPageComponent, title: 'Blog - MediaManager4U' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
