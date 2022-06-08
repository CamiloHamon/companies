import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css'],
})
export class ShowAllCompanies implements OnInit {
  companies: any = [];
  message: string = '';
  error: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private companiesService: CompaniesService,
    public adminService: AdminService,
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
    this.companiesService.getAllCompanies().subscribe((res) => {
      this.companies = res.companies;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteCompany(id: number) {
    const position = this.companies
      .map((e: any) => {
        return e._id;
      })
      .indexOf(id);

    if (position > -1) {
      this.companiesService.deleteCompany(id).subscribe(
        (res) => {
          this.error = false;
          this.companies.splice(position, 1);
        },
        (err) => {
          this.error = true;
          this.message = err.error.error;
        }
      );
    }
  }
}
