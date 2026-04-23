import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}
login(data: any) {
  return this.http.post<{ token: string; role: string }>(
    `${this.api}/login`,
    data
  );
 
}
  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  saveToken(token: string, role: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
}

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}