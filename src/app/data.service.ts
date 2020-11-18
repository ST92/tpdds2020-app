import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class TipoPuntuacion {
    id: number;
    nombre: string;
}

export class TipoDocumento {
    id: number;
    nombre: string;
}

export class Localidad {
    id: number;
    nombre: string;
}

export class Deporte {
    id: number;
    nombre: string;
}

export class TipoCompetencia {
    id: number;
    nombre: string;
}

export class EstadoCompetencia {
    id: number;
    nombre: string;
}

export class Sede {
    id: number;
    codigo: number;
    nombre: string;
    descripcion: string;
    fechaBorrado: Date;
    listaDeportes: any;
}

export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    documento: number;
    confirmacionTerminos: boolean;
    localidadId: any;
    tipoDocumentoId: any;
}

export class SedesCompetencia {
    id: number;
    disponibilidad: number;
    competenciaId: any;
    sedesId: any;
}

export class Competencia {
    id: number;
    nombre: string;
    reglamento: string;
    permiteEmpate: boolean;
    ptosGanado: number;
    ptosEmpate: number;
    ptosPresentacion: number;
    ptosAusencia: number;
    cantidadSets: number;
    fechaBaja: Date;
    estadoCompetenciaId: any;
    tipoCompetenciaId: any;
    deporteId: any;
    tipoPuntuacionId: any;
}


@Injectable()
export class DataService {

    httpClient: any;

    constructor(@Inject(HttpClient) httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    getCompetencia() {
        let competencia: Competencia = {
            "id": null,
            "nombre": '',
            "reglamento": '',
            "permiteEmpate": false,
            "ptosGanado": null,
            "ptosEmpate": null,
            "ptosPresentacion": null,
            "ptosAusencia": null,
            "cantidadSets": null,
            "fechaBaja": null,
            "estadoCompetenciaId": null,
            "tipoCompetenciaId": null,
            "deporteId": null,
            "tipoPuntuacionId": null
        }

        return competencia;
    }

    getSedeCompetencia() {
        let sedesCompetencia: SedesCompetencia = {
            "id": null,
            "disponibilidad": null,
            "competenciaId": null,
            "sedesId": []
        }

        return sedesCompetencia;
    }

    getUsuario() {
        let usuario: Usuario = {
            "id": null,
            "nombre": '',
            "apellido": '',
            "email": '',
            "password": '',
            "documento": null,
            "confirmacionTerminos": false,
            "localidadId": null,
            "tipoDocumentoId": null
        }

        return usuario;
    }

    getSede() {
        let sedesId: Sede = {
            "id": null,
            "codigo": null,
            "nombre": '',
            "descripcion": '',
            "fechaBorrado": null,
            "listaDeportes": []
        }

        return sedesId;
    }

    getEstadoCompetencia() {
        let estadoCompetencia: EstadoCompetencia = {
            "id": null,
            "nombre": "",
        };

        return estadoCompetencia;
    }

    getTipoCompetencia() {
        let tipoCompetencia: TipoCompetencia = {
            "id": null,
            "nombre": "",
        };

        return tipoCompetencia;
    }

    getDeporte() {
        let deporte: Deporte = {
            "id": null,
            "nombre": ""
        }

        return deporte;
    }

    getLocalidad() {
        let localidadId: Localidad = {
            "id": null,
            "nombre": ""
        }
        return localidadId;
    }

    getTipoDocumento() {
        let tipoDocumentoId: TipoDocumento = {
            "id": null,
            "nombre": ""
        }

        return tipoDocumentoId;
    }

    getTipoPuntuacion() {
        let tipoPuntuacionId: TipoPuntuacion = {
            "id": null,
            "nombre": ""
        }

        return tipoPuntuacionId;
    }

    cgetSedes() {
        return this.httpClient.get(environment.apiUrl + 'sedes')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }


}
