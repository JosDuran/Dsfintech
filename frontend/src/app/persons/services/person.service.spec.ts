//person.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersonsService {

  private api = 'http://localhost:8000/api/v1/persons';

  constructor(private http: HttpClient) {}

  list(page = 1) {
    const token = localStorage.getItem('access');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(
      `${this.api}/?page=${page}&ordering=-created_at`,
      { headers }
    );
  }
}
