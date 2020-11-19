import { Component, OnInit, ViewChild } from '@angular/core';
import { Competencia, DataService, SedesCompetencia } from 'src/app/data.service';
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

  popupSedesCompetencia: boolean = false;
  sedesCompetenciaTitulo: string;
  popupAgregarSedes: boolean;
  agregarSedesTitulo: string;
  gridHeight: number;

  tipoCompetencia: any;
  tipoPuntuacion: any;
  sedesCompetencia: any = [];
  sedeCompetencia: SedesCompetencia;
  permiteEmpate: boolean = false;
  competencia: Competencia;
  competenciaForm: any;
  gridSedes: any = [];

  sedesDataSource: any = [];//
  estadoCompetencias: any = [];//
  tipoCompetenciaDataSource: any = [];//
  deporteDataSource: any = [];//
  tipoPuntuacionDataSource: any = [];//
 
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
    this.estadoCompetencias = this.dataService.getEstadosCompetencia();
    this.deporteDataSource = this.dataService.getDeportes();
    
    this.dataService.cgetSedes().then((response) => {
      this.sedesDataSource = response.sedes;
    }).catch(error => {
      console.log(error);
    });

    this.dataService.cgetTiposCompetencia().then((response) => {
      this.tipoCompetenciaDataSource = response;
    }).catch(error => {
      console.log(error);
    });

    this.dataService.cgetTiposPuntuacion().then((response) => {
      this.tipoPuntuacionDataSource = response;
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
      this.sedeCompetencia.sedesId = arg.value;
    }
  }

  verSedesCompetencias() {
    this.popupSedesCompetencia = true;
    this.sedesCompetenciaTitulo = 'Ver Sedes de la competencia';
  }

  cerrarSedesCompetencias() {
    this.popupSedesCompetencia = false;
    this.sedesCompetencia = [];
  }

  guardarSedesCompetencia() {
    this.competencia.listaSedesCompetencia = this.sedesCompetencia;
    console.log(this.competencia);
    this.cerrarSedesCompetencias()
  }

  cerrarAgregarSedes() {
    this.popupAgregarSedes = false;
    this.sedeCompetencia = this.dataService.getSedeCompetencia();
  }

  guardarSedes() {
    this.sedesCompetencia.push(this.sedeCompetencia);
    this.cerrarAgregarSedes();
  }

  agregarSedes() {
    this.popupAgregarSedes = true;
    this.agregarSedesTitulo = 'Añadir sedes';
  }

}
