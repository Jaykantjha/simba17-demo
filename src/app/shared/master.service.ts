import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getTemplateMaster(request: any): Observable<any> {
    const payload = { requestText:  request}
    return this.http.post<any>(`${environment.voUrl}Masters/GetTemplateMaster`, payload);
  }
}
