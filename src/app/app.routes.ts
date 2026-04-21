// Defines top-level routes for each feature page in the dashboard.
import { Routes } from '@angular/router';
import { ActivityLogsComponent } from './pages/activity-logs.component';
import { AiIngestionComponent } from './pages/ai-ingestion.component';
import { BillingComponent } from './pages/billing.component';
import { DashboardComponent } from './pages/dashboard.component';
import { IncidentResponseComponent } from './pages/incident-response.component';
import { IncidentsComponent } from './pages/incidents.component';
import { PlaybookCreatorComponent } from './pages/playbook-creator.component';
import { PredictionsComponent } from './pages/predictions.component';
import { RemediationComponent } from './pages/remediation.component';
import { SettingsComponent } from './pages/settings.component';
import { SystemsComponent } from './pages/systems.component';
import { ThreatsComponent } from './pages/threats.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
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
];
