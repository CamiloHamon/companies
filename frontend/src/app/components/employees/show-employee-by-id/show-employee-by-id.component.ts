import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { PositionsService } from 'src/app/services/positions/positions.service';

@Component({
  selector: 'app-show-employee-by-id',
  templateUrl: './show-employee-by-id.component.html',
  styleUrls: ['./show-employee-by-id.component.css'],
})
export class ShowEmployeeByIdComponent implements OnInit {
  employee: any = {};
  positions: any = [];
  companies: any = [];
  form: any;
  error = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private positionsService: PositionsService,
    private companiesService: CompaniesService,
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
    this.positionsService.getAllPositions().subscribe((res) => {
      const positionDefault = {
        position: '-- Seleccione el cargo --',
        _id: -1,
        disabled: true,
        selected: true,
      };
      this.positions = res.positions;
      this.positions.push(positionDefault);
      this.companiesService.getAllCompanies().subscribe((res) => {
        const companyDefault = {
          name: '-- Seleccione una empresa --',
          _id: -1,
          disabled: true,
          selected: true,
        };
        this.companies = res.companies;
        this.companies.push(companyDefault);
        const id = this.activatedRoute.snapshot.params.id;
        this.employeesService.getEmployeeById(id).subscribe((res) => {
          this.employee = res.employee;
          this.form.get('name')?.setValue(this.employee.name);
          this.form.get('lastname')?.setValue(this.employee.lastname);
          this.form.get('email')?.setValue(this.employee.email);
          this.form.get('position')?.setValue(this.employee.position[0]._id);
          this.form.get('company')?.setValue(this.employee.company[0]._id);
        });
      });
    });
  }

  ngOnInit(): void {}

  private buildForm() {
    const pattern = /\S+@\S+\.\S+/;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      position: ['', [Validators.required]],
      company: ['', [Validators.required]],
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

  public update(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const name = this.form.get('name')?.value.toLowerCase().trim();
      const lastname = this.form.get('lastname')?.value.toLowerCase().trim();
      const email = this.form.get('email')?.value.toLowerCase().trim();
      const position = this.form.get('position')?.value;
      const company = this.form.get('company')?.value;

      const data = {
        name,
        lastname,
        email,
        pid: position,
        cid: company,
      };
      const id = this.activatedRoute.snapshot.params.id;
      this.employeesService.updateEmployee(id, data).subscribe(
        (res) => {
          this.router.navigate(['/empleados']);
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
