import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const role = localStorage.getItem('role');

    // ✅ allow only admins
    if (role === 'admin') {
      return true;
    }

    // ❌ block access
    this.router.navigate(['/dashboard']);
    return false;
  }
}