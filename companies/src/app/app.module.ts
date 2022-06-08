import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { CompaniesComponent } from './components/companies/companies.component';
import { ShowAllCompanies } from './components/companies/show-all/show-all.component';
import { ShowByIdComponent } from './components/companies/show-by-id/show-by-id.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ShowEmployeeByIdComponent } from './components/employees/show-employee-by-id/show-employee-by-id.component';
import { ShowAllEmlpoyeesComponent } from './components/employees/show-all-emlpoyees/show-all-emlpoyees.component';
import { PositionComponent } from './components/position/position.component';
import { ShowAllPositionsComponent } from './components/position/show-all-positions/show-all-positions.component';
import { ShowPositionByIdComponent } from './components/position/show-position-by-id/show-position-by-id.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePositionComponent } from './components/position/create-position/create-position.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { ShowEmployeesByCompanyIdComponent } from './components/companies/show-employees-by-company-id/show-employees-by-company-id.component';
import { CreateCompanyComponent } from './components/companies/create-company/create-company.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    HeaderComponent,
    CompaniesComponent,
    ShowAllCompanies,
    ShowByIdComponent,
    EmployeesComponent,
    ShowEmployeeByIdComponent,
    ShowAllEmlpoyeesComponent,
    PositionComponent,
    ShowAllPositionsComponent,
    ShowPositionByIdComponent,
    LoginComponent,
    CreatePositionComponent,
    CreateEmployeeComponent,
    ShowEmployeesByCompanyIdComponent,
    CreateCompanyComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
