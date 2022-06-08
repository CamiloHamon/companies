import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-show-employees-by-company-id',
  templateUrl: './show-employees-by-company-id.component.html',
  styleUrls: ['./show-employees-by-company-id.component.css']
})
export class ShowEmployeesByCompanyIdComponent implements OnInit {

  company: any = {};
  employees: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    private employeesService: EmployeesService,
    public adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ empleados por página',
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
    const id = this.activatedRoute.snapshot.params.id;
    this.companiesService.getCompanyById(id).subscribe((res) => {
      this.company = res.company;
      this.employeesService.getEmployeesByCompanyId(id).subscribe((res) => {
        this.employees = res.employees;
        this.dtTrigger.next();
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteEmployee(id: number) {
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
