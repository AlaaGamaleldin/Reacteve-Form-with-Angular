import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.httpRequest('GET', url, {}, {}, this.header());
  }
  post<T>(url: string, body: Object) {
    return this.httpRequest('POST', url, body, {}, this.header());
  }
  put<T>(url: string) {
    this.httpRequest('PUT', url);
  }
  delete<T>(url: string) {
    this.httpRequest('DELETE', url);
  }
  private header(): HttpHeaders {
    const header = {
      'content-type': 'application/json',
      // Authorization: `Bearer ${this.authService.getToken()}`,
    };
    return new HttpHeaders(header);
  }
  private httpRequest<T>(
    type: string,
    url: string,
    body?: Object,
    params?: Record<string, string>,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.request<T>(type, `${this.BASE_URL}/${url}`, {
      body,
      headers,
      params: new HttpParams({ fromObject: { ...params } }),
    });
  }
}