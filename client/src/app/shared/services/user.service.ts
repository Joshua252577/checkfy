import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFilter} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public get(filter?: UserFilter) {
    const params = {}
    return this.http.get("api/users/", {params, observe: "response"});
  }
}
