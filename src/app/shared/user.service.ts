import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetail(request: any): Observable<any> {
    const payload = { requestText:  request}
    return this.http.post<any>(`${environment.voUrl}Login/GetUserIdDetailsNew`, payload);
  }

  authenticateUser(request: any): Observable<any> {
    const payload = { requestText:  request}
    return this.http.post<any>(`${environment.voUrl}Login/AuthenticateUserDIP`, payload);
  }
}
