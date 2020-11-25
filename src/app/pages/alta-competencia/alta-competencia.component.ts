import { Component, OnInit, ViewChild } from '@angular/core';
import { Competencia, DataService, SedesCompetencia } from 'src/app/data.service';
import { DxButtonModule, DxDataGridComponent, DxFormComponent, DxSelectBoxComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-alta-competencia',
  templateUrl: './alta-competencia.component.html',
  styleUrls: ['./alta-competencia.component.scss']
})
export class AltaCompetenciaComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxDataGridComponent) gridCompetencia: DxDataGridComponent;
  @ViewChild(DxDataGridComponent) gridParticipantes: DxDataGridComponent;
  @ViewChild(DxFormComponent) formCompetencia: DxFormComponent;
  @ViewChild(DxFormComponent) formSedeCompetencia: DxFormComponent;
  @ViewChild(DxFormComponent) formParticipante: DxFormComponent;
  @ViewChild(DxSelectBoxComponent) dxSelectBox: DxSelectBoxComponent;

  popupSedesCompetencia: boolean = false;
  sedesCompetenciaTitulo: string;
  altaCompetenciaTitulo: string;
  popupAgregarSedes: boolean;
  popupAltaCompetencia: boolean;
  agregarSedesTitulo: string;
  verCompetenciaTitulo: string;
  verParticipantesTitulo: string;
  agregarParticipanteTitulo: string;
  verCompetenciaPopup: boolean = false;
  popupVerParticipantes: boolean = false;
  popupAgregarParticipante: boolean = false;
  gridSedesCompetenciaHeight: number;
  gridCompetenciaHeight: number;
  gridParticipantesHeight: number;

  tipoCompetencia: any;
  tipoPuntuacion: any;
  sedesCompetencia: any = [];
  sedeCompetencia: SedesCompetencia;
  permiteEmpate: boolean = false;
  competencia: Competencia;
  competenciaForm: any;
  participantesDataSource: any;
  participante: any;
  participanteForm: any;
  gridSedes: any = [];

  sedesDataSource: any = [];//
  estadoCompetenciasDataSource: any = [];//
  tipoCompetenciaDataSource: any = [];//
  deporteDataSource: any = [];//
  tipoPuntuacionDataSource: any = [];//
  competenciasDataSource: any = [];
  tipoCompetenciaGridDataSource: any = [];
  estadoCompetenciaGridDataSource: any = [];
  deporteGridDataSource: any = [];


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
    this.gridSedesCompetenciaHeight = window.innerHeight - 180;
    this.gridCompetenciaHeight = window.innerHeight - 180;
    this.gridParticipantesHeight = window.innerHeight - 180;
    this.competencia = this.dataService.getCompetencia();
    this.sedeCompetencia = this.dataService.getSedeCompetencia();
    this.estadoCompetenciasDataSource = this.dataService.getEstadosCompetencia();
    this.deporteDataSource = this.dataService.getDeportes();
    this.participante = {};

    this.dataService.cgetSedes().then((response) => {
      this.sedesDataSource = response.sedes;
    }).catch(error => {
      console.log(error);
    });

    this.dataService.cgetTiposCompetencia().then((response) => {
      this.tipoCompetenciaDataSource = response;
      this.tipoCompetenciaGridDataSource = response;
    }).catch(error => {
      console.log(error);
    });

    this.dataService.cgetTiposPuntuacion().then((response) => {
      this.tipoPuntuacionDataSource = response;
    }).catch(error => {
      console.log(error);
    });

    this.dataService.cgetCompetencias().then((response) => {
      this.competenciasDataSource = response.competencias;
    }).catch(error => {
      console.log(error);
    });

  }

  cerrarModal() {
    this.formSedeCompetencia.instance.resetValues();
    this.dataGrid.instance.clearSelection();
    this.popupSedesCompetencia = false;
  }


  guardar() {
    console.log("guardar()", this.competencia);
  }

  deporteChanged(arg) {
    if (arg.value != undefined) {
      this.competencia.deporteId = arg.value;
      /*llamar a las sedes filtarndo por deporte*/
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

  abrirAltaCompetencia() {
    this.popupAltaCompetencia = true;
    this.altaCompetenciaTitulo = 'Alta de competencias';
  }

  cerrarAltaCompetencia() {
    this.popupAltaCompetencia = false;
  }

  cerrarVerCompetencia() {
    this.verCompetenciaPopup = false;
    this.competencia = this.dataService.getCompetencia();
  }

  limpiarFiltros() {
    this.dataGrid.instance.clearFilter();
    this.dataGrid.instance.clearSorting();
  }

  seleccionaItemGrid($event) {
    if ($event.currentSelectedRowKeys.length > 0) {
      this.competencia = $event.selectedRowsData[0];
      this.verCompetenciaPopup = true;
      this.verCompetenciaTitulo = 'Ver Competencia';
    }
  }
  guardarCompetencia() {
    if (this.formCompetencia.instance.validate().isValid) {
      /**
       * metodo que transforme en mayuscula todos los strings de la competencia
       */
      this.dataService.postCompetencia(this.competencia).then((data: any) => {
        this.formCompetencia.instance.resetValues();
        notify({
          message: "La competencia fue creada correctamente",
          position: {
            my: "center top",
            at: "center top"
          }
        }, "success", 3000);
      }).catch(error => {
        console.log(error.errors.children);
      });

    }
  }

  cerrarVerParticipantes() {
    this.popupVerParticipantes = false;
  }

  verParticipantes() {
    this.verParticipantesTitulo = 'Participantes de la competencia';
    this.popupVerParticipantes = true;
  }

  guardarListaParticipantes() {
    console.log('guardarListaParticipantes');
  }

  agregarParticipante() {
    this.agregarParticipanteTitulo = 'Agregar Participante';
    this.popupAgregarParticipante = true;
  }

  guardarParticipantes() {
    console.log("guardado de participantes de la lista de participantes de la competencia");
  }

  cerrarAgregarParticipante() {
    this.popupAgregarParticipante = false;
  }

  guardarParticipante() {
    console.log("guardado de participante en la lista de participantes");
  }

}
