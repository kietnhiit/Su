import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTService } from './jwt.services';

@Injectable()
export class HttpService {
    base_url = 'https://conduit.productionready.io/api/';
  constructor(
    private http: HttpClient
  ) {}

  get(path: string): Observable<any> {
    return this.http.get(`${this.base_url}${path}`);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.base_url}${path}`,
      JSON.stringify(body)
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.base_url}${path}`,
      JSON.stringify(body)
    );
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.base_url}${path}`
    );
  }
}
