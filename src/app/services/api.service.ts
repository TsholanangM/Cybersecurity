import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    };
  }

  getStatus() {
    return this.http.get('http://localhost:5000/api/status', this.getHeaders());
  }

  getIncidents() {
    return this.http.get('http://localhost:5000/api/incidents', this.getHeaders());
  }

  updateIncident(id: string, status: string) {
    return this.http.patch(
      `http://localhost:5000/api/incidents/${id}/status`,
      { status },
      this.getHeaders()
    );
  }
}
