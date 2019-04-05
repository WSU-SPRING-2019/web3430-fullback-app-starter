import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (AuthenticationService.isAuthenticated()) {
            return true
        }

        this.router.navigate(['/login'])
        return false

    }
}