// src/app/the-app/the-app.ts
import { Component, OnInit, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StatusService, ProjectInsight } from '../services/status';
import { NgIf, NgFor, DatePipe, DecimalPipe } from '@angular/common';
import { provideCharts, withDefaultRegisterables, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { FolderTreeComponent } from '../folder-tree/folder-tree';
import { Infrastructure } from '../infrastructure/infrastructure';
import { Cicd } from '../cicd/cicd';
import { LiveOnAzure } from '../live-on-azure/live-on-azure';
import { HowItIsBuilt } from '../how-it-is-built/how-it-is-built';

@Component({
  selector: 'app-the-app',
  standalone: true,
  templateUrl: './the-app.html',
  styleUrls: ['./the-app.css'],
  imports: [NgIf, NgFor, DatePipe, DecimalPipe, FolderTreeComponent, BaseChartDirective, Infrastructure,
    Cicd,
    LiveOnAzure,
    HowItIsBuilt],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class TheApp implements OnInit {
  loading = true;
  insight = signal<ProjectInsight | null>(null);
  isBrowser: boolean;

  locBarData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  locBarOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  };

  qualityGaugeData: ChartConfiguration['data'] = { labels: ['Score', 'Gap'], datasets: [] };
  qualityOptions: ChartConfiguration['options'] = { responsive: true, plugins: { legend: { display: false } } };

  techStackData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  techStackOptions: ChartConfiguration['options'] = { responsive: true };

  kpis = computed(() => {
    const d = this.insight();
    if (!d) return [];
    return [
      { label: 'Angular LOC', value: d.linesOfCode.angular },
      { label: 'Flask LOC', value: d.linesOfCode.flask },
      { label: 'Terraform LOC', value: d.linesOfCode.terraform },
      { label: 'Total LOC', value: d.linesOfCode.total },
      { label: 'Quality Score', value: d.codeQuality.score },
      { label: 'Issues', value: d.codeQuality.issues.length },
    ];
  });

  infraFlags = computed(() => {
    const d = this.insight();
    if (!d) return [];
    return [
      { name: 'Terraform', ok: d.infrastructure.terraform },
      { name: 'Docker Compose', ok: d.infrastructure.dockerCompose },
      { name: 'CI/CD', ok: d.infrastructure.ciCd },
    ];
  });

  constructor(private status: StatusService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.status.getInsight().subscribe({
      next: (data) => {
        this.insight.set(data);
        this.setupCharts(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load project insight', err);
        this.loading = false;
      }
    });
  }

  private setupCharts(d: ProjectInsight) {
    this.locBarData = {
      labels: ['Angular', 'Flask', 'Terraform'],
      datasets: [{ data: [d.linesOfCode.angular, d.linesOfCode.flask, d.linesOfCode.terraform], label: 'Lines of Code' }]
    };

    const gap = Math.max(0, 100 - (d.codeQuality.score || 0));
    this.qualityGaugeData = {
      labels: ['Score', 'Remaining'],
      datasets: [{ data: [d.codeQuality.score || 0, gap] }]
    };

    this.techStackData = {
      labels: d.technologyStack,
      datasets: [{ data: d.technologyStack.map(() => 1), label: 'Technologies' }]
    };
  }
}
