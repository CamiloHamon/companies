import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-show-by-id',
  templateUrl: './show-by-id.component.html',
  styleUrls: ['./show-by-id.component.css'],
})
export class ShowByIdComponent implements OnInit {
  company: any = {};
  form: any;
  error = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.companiesService.getCompanyById(id).subscribe((res) => {
      this.company = res.company;
      this.form.get('name')?.setValue(this.company.name);
      this.form.get('address')?.setValue(this.company.address);
      this.form.get('email')?.setValue(this.company.email);
    });
  }

  private buildForm() {
    const pattern = /\S+@\S+\.\S+/;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(pattern)]],
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

  update(event:Event) {
    event.preventDefault();
    const id = this.activatedRoute.snapshot.params.id;
    const name = this.form.get('name')?.value.toLowerCase().trim();
    const address = this.form.get('address')?.value.toLowerCase().trim();
    const email = this.form.get('email')?.value;
    const data = {
      name,
      address,
      email,
    };
    this.companiesService.updateCompany(id, data).subscribe(
      (res) => {
        this.router.navigate(['/empresas']);
      },
      (err) => {
        this.error = true;
        this.message = err.error.error;
      }
    );
  }
}
