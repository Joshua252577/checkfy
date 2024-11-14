import { Component } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatIconButton,
    MatSuffix,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }

  login() {
    if (!this.form.valid) {
      return
    }

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(["/admin"]).then();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
