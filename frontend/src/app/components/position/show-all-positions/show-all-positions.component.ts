import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PositionsService } from 'src/app/services/positions/positions.service';

@Component({
  selector: 'app-show-all-positions',
  templateUrl: './show-all-positions.component.html',
  styleUrls: ['./show-all-positions.component.css'],
})
export class ShowAllPositionsComponent implements OnInit {
  positions: any = [];
  error: boolean = false;
  message: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private positionsService: PositionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ cargos por página',
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
    this.positionsService.getAllPositions().subscribe(
      (res) => {
        this.positions = res.positions;
        this.dtTrigger.next();
      },
      (err) => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(id: number) {
    const position = this.positions
      .map((e: any) => {
        return e._id;
      })
      .indexOf(id);
    if (position > -1) {
      this.positionsService.removePosition(id).subscribe(
        (res) => {
          this.positions.splice(position, 1);
          this.error = false;
        },
        (err) => {
          this.error = true;
          this.message = err.error.error;
        }
      );
    }
  }
}
