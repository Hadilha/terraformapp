// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';   // <-- use the root App component
import { appConfig } from './app/app.config'; // <-- central providers (router, http, charts, etc.)

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
