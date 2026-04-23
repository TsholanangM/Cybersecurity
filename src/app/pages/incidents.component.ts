import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container">

    <h1>📊 Incident Management (SOC)</h1>

    <table>
      <tr>
        <th>Type</th>
        <th>Severity</th>
        <th>Risk</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

      <tr *ngFor="let i of incidents">

        <td>{{ i.type }}</td>
        <td>{{ i.severity }}</td>
        <td>{{ i.riskScore }}%</td>
        <td>
          <span [ngClass]="i.status">
            {{ i.status }}
          </span>
        </td>

        <td>

          <button (click)="updateStatus(i._id, 'OPEN')">
            OPEN
          </button>

          <button (click)="updateStatus(i._id, 'IN_PROGRESS')">
            IN PROGRESS
          </button>

          <button (click)="updateStatus(i._id, 'CLOSED')">
            CLOSE
          </button>

        </td>

      </tr>

    </table>

  </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      color: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #111;
    }

    th, td {
      border: 1px solid #333;
      padding: 10px;
      text-align: center;
    }

    button {
      margin: 2px;
      padding: 5px;
      cursor: pointer;
      background: #00ff88;
      border: none;
    }

    .OPEN {
      color: orange;
      font-weight: bold;
    }

    .IN_PROGRESS {
      color: blue;
      font-weight: bold;
    }

    .CLOSED {
      color: green;
      font-weight: bold;
    }
  `]
})
export class IncidentsComponent implements OnInit {

  incidents: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:5000/api/incidents')
      .subscribe(res => this.incidents = res);
  }

  updateStatus(id: string, status: string) {
    this.http.patch(`http://localhost:5000/api/incidents/${id}/status`, {
      status
    }).subscribe(() => {
      this.load(); // refresh table
    });
  }
}