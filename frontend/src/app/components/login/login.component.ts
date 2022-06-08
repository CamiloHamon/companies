import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any;
  email = '';
  password = '';
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formsService: FormsService,
    private router: Router
  ) {
    this.buildForm();
  }

  public ngOnInit() {
    this.formsService.removeSpacesEmail(this.form);
  }

  private buildForm() {
    const pattern = /\S+@\S+\.\S+/;
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public getError(controlName: string): string {
    let message = '';
    const control = this.form.get(controlName);
    if (control?.dirty || control?.touched) {
      if (control?.errors?.required != null) {
        message = 'Este campo es obligatorio';
      } else if (control?.errors?.pattern != null) {
        message = 'Debe ser un correo valido';
      } else if (control?.hasError('minlength')) {
        const minLength = control?.errors?.minlength.requiredLength;
        message = `Este campo debe tener minimo ${minLength} caracteres`;
      }
    }
    return message;
  }

  public signIn(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.email = this.form.get('email')?.value.toLowerCase().trim();
      this.password = this.form.get('password')?.value;
      const user = new User(this.email, this.password);
      this.authService.signIn(user).subscribe(
        (res) => {
          const resUser = res.user;
          localStorage.setItem('user', resUser.email);
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', resUser.name);

          if (resUser.rid === environment.SUPEROL) localStorage.setItem('_U_R_SA', resUser.rid);

          this.router.navigate(['/empresas']);
        },
        (err) => (this.error = true)
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
