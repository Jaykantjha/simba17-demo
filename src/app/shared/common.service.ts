import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getDetailByUrl(url: string, request: any): Observable<any> {
    const payload = { requestText:  request}
    return this.http.post<any>(url, payload);
  }
}
