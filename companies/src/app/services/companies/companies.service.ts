import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private URL = `${environment.URL}/companies`;

  constructor(private http: HttpClient, private router: Router) {}

  getAllCompanies() {
    return this.http.get<any>(this.URL);
  }

  getCompanyById(id: number) {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  createCompany(data: any) {
    return this.http.post<any>(`${this.URL}`, data);
  }

  updateCompany(id:number, data: any) {
    return this.http.put<any>(`${this.URL}/${id}`, data);
  }

  deleteCompany(id:number) {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }
}
