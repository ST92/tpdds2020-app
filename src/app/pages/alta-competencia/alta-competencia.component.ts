import { Component, OnInit, ViewChild } from '@angular/core';
import { Competencia, DataService, SedesCompetencia } from 'src/app/data.service';
import { DxDataGridComponent, DxFormComponent, DxSelectBoxComponent } from 'devextreme-angular';
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
  participantesCompetencia: any = [];
  participanteForm: any;
  cantidadParticipantes: number = null;
  proximosEncuentros: number = null;
  gridSedes: any = [];

  sedesDataSource: any = [];//
  sedesGridDataSource: any = [];
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
    this.generarFixture = this.generarFixture.bind(this);
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

    //sedesGridDataSource
    this.dataService.cgetSedes().then((response) => {
      this.sedesGridDataSource = response.sedes;
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
      this.competenciasDataSource = response.items;
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
      console.log(arg.value);
      this.dataService.getSedesPorDeporte(1, this.competencia.deporteId).then((response) => {
        this.sedesDataSource = response.sedes;
      }).catch(error => {
        console.log(error);
      });
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
    const index = this.sedesCompetencia.indexOf(this.sedeCompetencia);
    if (index > -1) {
      console.log("encontro indice", index);
      this.sedesCompetencia[index].disponibilidad = this.sedeCompetencia.disponibilidad;
    } else {
      this.sedesCompetencia.push(this.sedeCompetencia);
      console.log("no encontro indice", index);
      console.log("sedesCompetencia", this.sedesCompetencia);
      console.log("sedeCompetencia", this.sedeCompetencia);
    }

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
    this.cantidadParticipantes = null;
    this.proximosEncuentros = null;
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
      /**
       * llamar cget de participantes, y realizar el count de los participantes para mostrar en 
       * la grilla de participantes y el count en el ver competencia
       * llamar al metodo de eventos restantes para mostrar en ver competencia
       * 
       * armar popup de generar fixture
       */
      /**
       * Revisar que el cget no filtra por id de competencia
       */
      this.dataService.cgetParticipantes(this.competencia.id).then((data: any) => {
        this.cantidadParticipantes = data.items.length;
        this.participantesCompetencia = data.items;
      }).catch(error => {
        console.log(error);
      })

      this.dataService.cgetProximosEncuentros(this.competencia.id).then((data: any) => {
        this.proximosEncuentros = data;
      }).catch(error => {
        console.log(error);
      })

      this.verCompetenciaPopup = true;
      this.verCompetenciaTitulo = 'Ver Competencia';
    }
  }

  guardarCompetencia() {
    if (this.formCompetencia.instance.validate().isValid) {
      this.dataService.postCompetencia(this.competencia).then((data: any) => {
        this.formCompetencia.instance.resetValues();
        this.cerrarAltaCompetencia();
        //refrescar o recargar grilla
        this.gridCompetencia.instance.refresh();
        notify({
          message: "La competencia fue creada correctamente",
          position: {
            my: "center top",
            at: "center top"
          }
        }, "success", 3000);
      }).catch(error => {

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

  actualizarListaParticipantes() {

    this.cerrarVerCompetencia();
  }

  agregarParticipante() {
    this.agregarParticipanteTitulo = 'Agregar Participante';
    this.participante = this.dataService.getParticipante();
    this.popupAgregarParticipante = true;
  }

  guardarParticipante() {
    this.participante.competenciaId = this.competencia.id;
    this.participantesCompetencia.push(this.participante);
    this.participantesCompetencia.forEach(participante => {
      this.dataService.postParticipantes(participante).then((data: any) => {
        confirm('Los participantes fueron guardados con éxito');
        this.popupAgregarParticipante = false;
      }).catch(error => {
        console.log(error);
      });
    });
    console.log("guardado de participante en la lista de participantes");
  }

  cerrarAgregarParticipante() {
    this.popupAgregarParticipante = false;
  }

  guardarListaParticipantes() {
    this.competencia.listaParticipantes = this.participantesCompetencia;
    this.popupVerParticipantes = false;
    console.log("guardado de la lista de participantes");
  }

  generarFixture() {
    this.dataService.generarFixture(this.competencia.id).then((data: any) => {
      console.log("data", data);
      notify({
        message: "Fixture generado correctamente",
        position: {
          my: "center top",
          at: "center top"
        }
      }, "success", 5000);
    }).catch(error => {

      confirm(error.error.error.exception[0].message);

    })
  }

}
