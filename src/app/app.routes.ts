import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login.component';
import { DashboardComponent } from './pages/dashboard.component';
import { IncidentsComponent } from './pages/incidents.component';
import { IncidentResponseComponent } from './pages/incident-response.component';
import { ThreatsComponent } from './pages/threats.component';
import { PredictionsComponent } from './pages/predictions.component';
import { RemediationComponent } from './pages/remediation.component';
import { PlaybookCreatorComponent } from './pages/playbook-creator.component';
import { ActivityLogsComponent } from './pages/activity-logs.component';
import { SystemsComponent } from './pages/systems.component';
import { BillingComponent } from './pages/billing.component';
import { SettingsComponent } from './pages/settings.component';
import { AiIngestionComponent } from './pages/ai-ingestion.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'incidents', component: IncidentsComponent },
      { path: 'incident-response', component: IncidentResponseComponent },
      { path: 'threats', component: ThreatsComponent },
      { path: 'predictions', component: PredictionsComponent },
      { path: 'remediation', component: RemediationComponent },
      { path: 'playbook-creator', component: PlaybookCreatorComponent },
      { path: 'activity-logs', component: ActivityLogsComponent },
      { path: 'systems', component: SystemsComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'ai-ingestion', component: AiIngestionComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];