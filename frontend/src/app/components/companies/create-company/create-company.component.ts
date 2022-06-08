import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { PositionsService } from 'src/app/services/positions/positions.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  form: any;
  error = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private companiesService: CompaniesService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    const pattern = /\S+@\S+\.\S+/;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(pattern)]],
    });
  }

  ngOnInit(): void {}

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

  public create(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const name = this.form.get('name')?.value.toLowerCase().trim();
      const address = this.form.get('address')?.value.toLowerCase().trim();
      const email = this.form.get('email')?.value.toLowerCase().trim();

      const data = {
        name,
        address,
        email,
      };

      this.companiesService.createCompany(data).subscribe(
        (res) => {
          this.router.navigate(['/empresas']);
        },
        (err) => {
          this.error = true;
          this.message = err.error.error;
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

}
