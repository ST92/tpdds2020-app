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
    localidadId: number;
    tipoDocumentoId: number;
}

export class SedesCompetencia {
    id: number;
    disponibilidad: number;
    competenciaId: number;
    sedesId: number;
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
    estadoCompetenciaId: number;
    usuarioId: number;
    tipoCompetenciaId: number;
    deporteId: number;
    tipoPuntuacionId: number;
    listaSedesCompetencia: any;
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
            "estadoCompetenciaId": 1,
            "usuarioId": 1,
            "tipoCompetenciaId": null,
            "deporteId": null,
            "tipoPuntuacionId": null,
            "listaSedesCompetencia": []
        }

        return competencia;
    }

    getSedeCompetencia() {
        let sedesCompetencia: SedesCompetencia = {
            "id": null,
            "disponibilidad": null,
            "competenciaId": null,
            "sedesId": null
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

    getEstadosCompetencia() {
        let estadoCompetencias = [
            { id: 1, nombre: 'CREADA' },
        ];

        return estadoCompetencias;
    }

    cgetTiposCompetencia() {
        return this.httpClient.get(environment.apiUrl + 'competencias/tipocompetencia')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    getDeportes() {
        let deportes = [
            { id: 1, nombre: 'football' },
            { id: 2, nombre: 'basquet' },
            { id: 3, nombre: 'tenis' }
        ]

        return deportes;
    }

    getLocalidad() {
        let localidadId: Localidad = {
            "id": null,
            "nombre": ""
        }
        return localidadId;
    }

    getTiposDocumento() {
        let tipoDocumentoId: TipoDocumento = {
            "id": null,
            "nombre": ""
        }

        return tipoDocumentoId;
    }

    cgetTiposPuntuacion() {
        return this.httpClient.get(environment.apiUrl + 'competencias/tipopuntuacion')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    cgetSedes() {
        //añadir deporteId como parametro para la query
        return this.httpClient.get(environment.apiUrl + 'sedes?lorder_by[id]=ASC&filters[usuarioId.id]=1&operators[usuarioId.id]==')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    cgetCompetencias() {
        //añadir deporteId como parametro para la query
        return this.httpClient.get(environment.apiUrl + 'competencias?lorder_by[id]=ASC&filters[usuarioId.id]=1&operators[usuarioId.id]==')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    postCompetencia(competencia) {
        return this.httpClient.post(environment.apiUrl + 'competencias', competencia)
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => {
                //error.error.errors.
                throw error;
            });
    }

}
