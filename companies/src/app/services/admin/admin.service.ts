import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AdminService {

	constructor(private http: HttpClient, private router: Router) {}

	isAdmin() {
		return !!localStorage.getItem('_U_R_A');
	}

	isSuperAdmin() {
		return !!localStorage.getItem('_U_R_SA');
	}

	getNameUser() {
		return localStorage.getItem('name');
	}
}
