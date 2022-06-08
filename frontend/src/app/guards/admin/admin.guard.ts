import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private adminService: AdminService, private router: Router) {}

	canActivate(): boolean {
		if (this.adminService.isAdmin() || this.adminService.isSuperAdmin()) {
			return true;
		}

		this.router.navigate(['/']);
		return false;
	}
}
