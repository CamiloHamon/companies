import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-show-all-emlpoyees',
  templateUrl: './show-all-emlpoyees.component.html',
  styleUrls: ['./show-all-emlpoyees.component.css'],
})
export class ShowAllEmlpoyeesComponent implements OnInit {
  employees: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ empresas por página',
        zeroRecords: 'No se encontro nada, lo siento',
        info: 'Mostrando página  _PAGE_ de _PAGES_',
        infoEmpty: 'Sin información disponible',
        infoFiltered: '(filtrado de _MAX_ registros totales)',
        paginate: {
          first: '<<',
          last: '>>',
          next: '>',
          previous: '<',
        },
      },
    };
    this.employeesService.getAllEmployees().subscribe((res) => {
      this.employees = res.employees;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(id: number) {
    const position = this.employees
      .map((e: any) => {
        return e._id;
      })
      .indexOf(id);

    if (position > -1) {
      this.employeesService.deleteEmployee(id).subscribe(
        (res) => {
          this.employees.splice(position, 1);
        },
        (err) => this.router.navigate(['/'])
      );
    }
  }
}
