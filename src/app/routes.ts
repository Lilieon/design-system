import { Routes } from '@angular/router';
import { App } from './app';
import { Gallery } from './gallery/gallery';
import { BrandLab } from './brand-lab/brand-lab';

export const routes: Routes = [
  { path: '', component: Gallery },
  { path: 'brand-lab', component: BrandLab },
  { path: '**', redirectTo: '' },
];
