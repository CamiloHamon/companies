import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private URL = `${environment.URL}/positions`;

  constructor(private http: HttpClient, private router: Router) {}

  getAllPositions() {
    return this.http.get<any>(this.URL);
  }

  getPositionById(id: number) {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  createPosition( data:any) {
    return this.http.post<any>(`${this.URL}`, data);
  }

  updatePosition(id: number, data:any) {
    return this.http.put<any>(`${this.URL}/${id}`, data);
  }

  removePosition(id: number) {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }
}
