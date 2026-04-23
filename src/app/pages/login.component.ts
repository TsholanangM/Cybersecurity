import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">

      <h1>🛡 SOC LOGIN</h1>

      <input [(ngModel)]="username" placeholder="Username" />
      <input [(ngModel)]="password" type="password" placeholder="Password" />

      <button (click)="login()">Login</button>

      <p class="error" *ngIf="error">{{ error }}</p>

    </div>
  `
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token, res.role);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = "Invalid credentials";
      }
    });
  }
}
