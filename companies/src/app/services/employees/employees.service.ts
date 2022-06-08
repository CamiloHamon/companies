import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private URL = `${environment.URL}/employees`;

  constructor(private http: HttpClient, private router: Router) {}

  getAllEmployees() {
    return this.http.get<any>(this.URL);
  }

  getEmployeeById(id: number) {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  getEmployeesByCompanyId(id: number) {
    return this.http.get<any>(`${this.URL}/companyId/${id}`);
  }

  createEmployee(data: any) {
    return this.http.post<any>(`${this.URL}`, data);
  }

  updateEmployee(id: number, data: any) {
    return this.http.put<any>(`${this.URL}/${id}`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }
}
