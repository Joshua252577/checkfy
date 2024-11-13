import { Component } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatCard
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor() {
  }

}
