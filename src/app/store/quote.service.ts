import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as model from "../shared/models/quote";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostService {
  url ="https://jsonplaceholder.typicode.com";
  constructor(private http: HttpClient) {}
  getPostList(): Observable<model.Post[]> {
    return this.http.get(this.url + "/posts").pipe(
      map(rep => {
        const response: any = rep || {};
        if (response.status) {
          throw {};
        } else {
          return <model.Post[]>rep;
        }
      })
    );
  }
}
