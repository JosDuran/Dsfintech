//person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = `${environment.apiBaseUrl}/api/v1/persons`;


  constructor(private http: HttpClient) {}

  list(params: any = {}) {
    return this.http.get<any>(this.apiUrl, { params });
  }

  get(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }

  create(data: any) {
    return this.http.post<any>(this.apiUrl + '/', data);
  }

  update(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}/`, data);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}/`);
  }
}

