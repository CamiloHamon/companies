import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	changeBg = false;
	showHeaderMovil = true;
	show = false;

	constructor(
		private router: Router,
		public authService: AuthService,
		public adminService: AdminService
	) {
		this.router.events.subscribe((val) => {
			const routes = ['/', '/login'];
			if (val instanceof NavigationEnd) {
				if (val.url !== '/') this.changeBg = true;
				else this.changeBg = false;

				if (!routes.includes(val.url)) this.showHeaderMovil = false;
				else this.showHeaderMovil = true;
			}
		});
	}

	openMenu() {
		this.show = true;
	}

	closeMenu() {
		this.show = false;
	}

	ngOnInit() {}
}
