import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initScrollReveal } from './scroll-observer';
import { CommonModule } from '@angular/common';

import { TheApp } from './the-app/the-app';
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-root',
  standalone: true,   
 imports: [
  CommonModule,
 
  TheApp,
  RouterOutlet
],
templateUrl: './app.html',
styleUrls: ['./app.css']

})
export class App {
  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => initScrollReveal(), 100);
      });
    }
  }
}
