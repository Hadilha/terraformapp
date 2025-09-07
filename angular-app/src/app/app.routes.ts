// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { TheApp } from './the-app/the-app';
import { HowItIsBuilt} from './how-it-is-built/how-it-is-built';
import { Infrastructure } from './infrastructure/infrastructure';
import { Cicd } from './cicd/cicd';
import { LiveOnAzure} from './live-on-azure/live-on-azure';

export const appRoutes: Routes = [
  { path: '', component: TheApp },
  { path: '**', redirectTo: '' }
];