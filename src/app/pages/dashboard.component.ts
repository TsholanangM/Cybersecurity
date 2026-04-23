import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { SocSocketService } from '../services/soc-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding:20px; color:white; background:#0f0f0f; min-height:100vh;">

      <h1>🛡 SOC DASHBOARD</h1>

      <div *ngIf="data">
        <p>Status: {{ data.status }}</p>
        <p>Incidents: {{ data.incidents }}</p>
        <p>Threat Level: {{ data.threatLevel }}</p>
        <p>Systems: {{ data.systemsMonitored }}</p>
        <p>AI: {{ data.aiPrediction }}</p>
      </div>

      <div *ngIf="errorMessage" style="color:red;">
        {{ errorMessage }}
      </div>

      <hr>

      <h3>Live Events</h3>
      <div *ngFor="let e of incidentLog">
        {{ e.type }} | Severity: {{ e.severity }} | Risk: {{ e.riskScore }}
      </div>

      <div *ngIf="showAlert" style="background:red;color:white;padding:10px;">
        ⚠ {{ alertMessage }}
      </div>

    </div>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {

  data: any = null;
  errorMessage: string | null = null;

  events: any[] = [];
  incidentLog: any[] = [];

  filter: string = 'ALL';

  showAlert = false;
  alertMessage = '';

  private socketSub?: Subscription;
  private refreshInterval: any;

  constructor(
    private api: ApiService,
    private socket: SocSocketService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadIncidents();

    this.socketSub = this.socket.listenToEvents().subscribe((event: any) => {

      if (!event) return;

      if (event.severity > 3) {
        this.data.incidents++;
        this.triggerAlert(`HIGH RISK: ${event.type}`);
      }

      event.riskScore = this.calculateRisk(event);

      this.events.unshift(event);
      this.incidentLog.unshift(event);
    });

    this.refreshInterval = setInterval(() => {
      this.loadData();
      this.loadIncidents();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
    clearInterval(this.refreshInterval);
  }

  loadData(): void {
    this.api.getStatus().subscribe({
      next: (res: any) => {
        this.data = res;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = "Backend offline";
      }
    });
  }

  loadIncidents(): void {
    this.api.getIncidents().subscribe({
      next: (res: any) => this.incidentLog = res,
      error: () => this.incidentLog = []
    });
  }

  triggerAlert(msg: string) {
    this.alertMessage = msg;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }

  calculateRisk(event: any): number {
    let score = 0;

    if (event.type === 'SQL_INJECTION') score += 50;
    if (event.type === 'PORT_SCAN') score += 30;
    if (event.type === 'BRUTE_FORCE') score += 40;

    score += (event.severity || 0) * 10;

    return Math.min(score, 100);
  }
}