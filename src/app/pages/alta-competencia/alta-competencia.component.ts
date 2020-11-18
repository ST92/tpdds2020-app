import { Component, OnInit, ViewChild } from '@angular/core';
import { Competencia, DataService } from 'src/app/data.service';
import { DxButtonModule, DxDataGridComponent, DxFormComponent, DxSelectBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-alta-competencia',
  templateUrl: './alta-competencia.component.html',
  styleUrls: ['./alta-competencia.component.scss']
})
export class AltaCompetenciaComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @ViewChild(DxSelectBoxComponent) dxSelectBox: DxSelectBoxComponent;

  competencia: Competencia;
  competenciaForm: any;

  permiteEmpate: boolean = false;
  popupSedesCompetencia: boolean = false;
  sedesCompetenciaTitulo: string;

  tipoCompetencia: any;
  tipoPuntuacion: any;
  sedesCompetencia: any = [];
  sedeCompetencia: any;
  popupAgregarSedes: boolean;
  agregarSedesTitulo: string;
  sedesDataSource: any;

  gridHeight: number;

  dataSource = [
    { id: 1, nombre: 'Hydrogen', fechas: 1.0079 },
    { id: 2, nombre: 'Helium', fechas: 4.0026 },
    { id: 3, nombre: 'Lithium', fechas: 6.941 },
    { id: 4, nombre: 'Beryllium', fechas: 9.0122 },
    { id: 5, nombre: 'Boron', fechas: 10.811 },
    { id: 6, nombre: 'Carbon', fechas: 12.0107 },
    { id: 7, nombre: 'Nitrogen', fechas: 14.0067 },
    { id: 8, nombre: 'Oxygen', fechas: 15.9994 },
    { id: 9, nombre: 'Fluorine', fechas: 18.9984 },
    { id: 10, nombre: 'Neon', fechas: 20.1797, },
  ];

  estadoCompetencias = [
    { id: 1, nombre: 'CREADA' },
  ];

  tipoCompetenciaDataSource = [
    { id: 1, nombre: 'LIGA' },
    { id: 2, nombre: 'ELIMINACION_SIMPLE' },
    { id: 3, nombre: 'ELIMINACION_DOBLE' }
  ]

  deporteDataSource = [
    { id: 1, nombre: 'football' },
    { id: 2, nombre: 'basquet' },
    { id: 3, nombre: 'tenis' }
  ]

  tipoPuntuacionDataSource = [
    { id: 1, nombre: 'SETS' },
    { id: 2, nombre: 'PUNTUACION' },
    { id: 3, nombre: 'RESULTADO_FINAL' }
  ]



  constructor(
    private dataService: DataService
  ) {
    this.deporteChanged = this.deporteChanged.bind(this);
    this.tipoCompetenciaChanged = this.tipoCompetenciaChanged.bind(this);
    this.tipoPuntuacionChanged = this.tipoPuntuacionChanged.bind(this);
    this.permiteEmpateChanged = this.permiteEmpateChanged.bind(this);
    this.sedeChanged = this.sedeChanged.bind(this);
  }

  ngOnInit() {
    this.gridHeight = window.innerHeight - 180;
    this.competencia = this.dataService.getCompetencia();
    this.sedeCompetencia = this.dataService.getSedeCompetencia();

    this.dataService.cgetSedes().then((response) => {
      this.sedesDataSource = response.sedes;
    }).catch(error => {
      console.log(error);
    });
  }

  cerrarModal() {
    this.form.instance.resetValues();
    this.dataGrid.instance.clearSelection();
    this.popupSedesCompetencia = false;
  }


  guardar() {
    console.log(this.competencia);
  }

  deporteChanged(arg) {
    if (arg.value != undefined) {
      this.competencia.deporteId = arg.value;
    }

  }

  tipoCompetenciaChanged(arg) {
    if (arg.value != undefined) {
      this.competencia.tipoCompetenciaId = arg.value;
      this.tipoCompetencia = arg.value;
    }
  }

  tipoPuntuacionChanged(arg) {
    if (arg.value != undefined) {
      this.competencia.tipoPuntuacionId = arg.value;
      this.tipoPuntuacion = arg.value;
    }
  }

  permiteEmpateChanged(arg) {
    if (arg.value != undefined) {
      this.permiteEmpate = arg.value;
    }
  }

  sedeChanged(arg) {
    if (arg.value != undefined) {
      this.sedeCompetencia.sedeId = arg.value;
    }
  }

  verSedesCompetencias() {
    this.popupSedesCompetencia = true;
    this.sedesCompetenciaTitulo = 'Ver Sedes de la competencia';
  }

  cerrarSedesCompetencias() {
    this.popupSedesCompetencia = false;
  }

  guardarSedesCompetencia() {
    console.log("guardar");
  }

  cerrarAgregarSedes() {
    this.popupAgregarSedes = false;
  }

  guardarSedes() {
    console.log("sede guardada!");
    console.log(this.sedeCompetencia);
  }

  agregarSedes() {
    this.popupAgregarSedes = true;
    this.agregarSedesTitulo = 'Añadir sedes';
  }

}
