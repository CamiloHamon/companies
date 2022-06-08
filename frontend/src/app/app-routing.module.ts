import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/companies/companies.component';
import { CreateCompanyComponent } from './components/companies/create-company/create-company.component';
import { ShowAllCompanies } from './components/companies/show-all/show-all.component';
import { ShowByIdComponent } from './components/companies/show-by-id/show-by-id.component';
import { ShowEmployeesByCompanyIdComponent } from './components/companies/show-employees-by-company-id/show-employees-by-company-id.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ShowAllEmlpoyeesComponent } from './components/employees/show-all-emlpoyees/show-all-emlpoyees.component';
import { ShowEmployeeByIdComponent } from './components/employees/show-employee-by-id/show-employee-by-id.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePositionComponent } from './components/position/create-position/create-position.component';
import { PositionComponent } from './components/position/position.component';
import { ShowAllPositionsComponent } from './components/position/show-all-positions/show-all-positions.component';
import { ShowPositionByIdComponent } from './components/position/show-position-by-id/show-position-by-id.component';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/empresas',
    pathMatch: 'full',
  },
  {
    path: 'empresas',
    component: CompaniesComponent,
    canActivate: [],
    children: [
      {
        path: '',
        component: ShowAllCompanies,
      },
      {
        path: 'crear',
        component: CreateCompanyComponent,
        canActivate: [AdminGuard]
      },
      {
        path: ':id',
        component: ShowByIdComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'ver-empleados/:id',
        component: ShowEmployeesByCompanyIdComponent,
      },
    ],
  },
  {
    path: 'empleados',
    component: EmployeesComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: ShowAllEmlpoyeesComponent,
      },
      {
        path: 'crear',
        component: CreateEmployeeComponent,
      },
      {
        path: ':id',
        component: ShowEmployeeByIdComponent,
      },
    ],
  },
  {
    path: 'cargos',
    component: PositionComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: ShowAllPositionsComponent,
      },
      {
        path: 'crear',
        component: CreatePositionComponent,
      },
      {
        path: ':id',
        component: ShowPositionByIdComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
