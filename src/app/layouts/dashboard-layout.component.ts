import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div style="display:flex;height:100vh;background:#0f0f0f;color:white;">

      <!-- SIDEBAR -->
      <aside style="width:250px;background:#111;padding:20px;">
        <h2 style="color:red;">🛡 SOC</h2>

        <a routerLink="/dashboard">Dashboard</a><br>
        <a routerLink="/incidents">Incidents</a><br>
        <a routerLink="/threats">Threats</a><br>
      </aside>

      <!-- PAGE CONTENT -->
      <main style="flex:1;padding:20px;">
        <router-outlet></router-outlet>
      </main>

    </div>
  `
})
export class DashboardLayoutComponent {}