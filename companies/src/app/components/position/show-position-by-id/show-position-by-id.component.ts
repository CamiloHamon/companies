import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms/forms.service';
import { PositionsService } from 'src/app/services/positions/positions.service';

@Component({
  selector: 'app-show-position-by-id',
  templateUrl: './show-position-by-id.component.html',
  styleUrls: ['./show-position-by-id.component.css'],
})
export class ShowPositionByIdComponent implements OnInit {
  position: any = {};
  form: any;
  error = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private activatedRoute: ActivatedRoute,
    private positionsService: PositionsService,
    private router: Router
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.positionsService.getPositionById(id).subscribe(
      (res) => {
        this.position = res.position;
        this.form.get('name')?.setValue(this.position.position);
        this.form.get('description')?.setValue(this.position.description);
      },
      (err) => {
        this.router.navigate(['/']);
      }
    );
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
      const description = this.form.get('description')?.value;
      const data = {
        name,
        description,
      };
      const id = this.activatedRoute.snapshot.params.id;
      this.positionsService.updatePosition(id, data).subscribe(
        (res) => {
          this.router.navigate(['/cargos']);
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
