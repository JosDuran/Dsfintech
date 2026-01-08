//person.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1/persons/`;

  constructor(private http: HttpClient) {}

  list(params?: any) {
    let httpParams = new HttpParams({ fromObject: params });
    return this.http.get(this.baseUrl, { params: httpParams });
  }

  get(id: string) {
    return this.http.get(`${this.baseUrl}${id}/`);
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  update(id: string, data: any) {
    return this.http.patch(`${this.baseUrl}${id}/`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
