import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from '../models/user.model';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser = null;

  constructor(private http: HttpClient) {

  }

  login(body: any) {
    return this.http.post("/api/auth", body)
  }

  async authenticate() {
      try {
        this.user = await firstValueFrom(this.http.get<IUser>("/api/auth"))
      } catch {
        this.user = null;
      }

      return !!this.user;
  }
}
