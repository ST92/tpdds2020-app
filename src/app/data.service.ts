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
    disponibilidad: any;
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
    estadoCompetenciaId: any;
    usuarioId: number;
    tipoCompetenciaId: number;
    deporteId: number;
    tipoPuntuacionId: number;
    listaSedesCompetencia: any;
    listaParticipantes: any;
}

export class Participante {
    id: number;
    nombre: string;
    email: string;
    competenciaId: number;
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
            "listaSedesCompetencia": [],
            "listaParticipantes": []
        }

        return competencia;
    }

    getParticipante() {
        let participante: Participante = {
            "id": null,
            "nombre": '',
            "email": '',
            "competenciaId": null
        }

        return participante;
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
            { id: 1, nombre: 'Fútbol' },
            { id: 2, nombre: 'Basquet' },
            { id: 3, nombre: 'Tenis' },
            { id: 4, nombre: 'Rugby' }
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
        return this.httpClient.get(environment.apiUrl + 'sedes')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    getSedesPorDeporte(idUsuario, idDeporte) {
        //añadir deporteId como parametro para la query
        //api/sedes/{idUsuario}/sedespordeporte/{idDeporte}
        return this.httpClient.get(environment.apiUrl + 'sedes/' + idUsuario + '/sedespordeporte/' + idDeporte)
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw error });
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

    getCompetenciaById(competenciaId){
        //añadir deporteId como parametro para la query
        return this.httpClient.get(environment.apiUrl + 'competencias/' + competenciaId)
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw error });
    }

    postCompetencia(competencia) {
        return this.httpClient.post(environment.apiUrl + 'competencias', competencia)
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => {
                //throw error.error.errors.children.atributo.errors[0];
                //debugger
                throw error;
            });
    }

    cgetParticipantes(competenciaId) {
        //añadir deporteId como parametro para la query
        return this.httpClient.get(environment.apiUrl + 'participantes?order_by[id]=ASC&filters[competenciaId]=' + competenciaId + '&operators[competenciaId]==')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    //api/fixtures/{competencia}/getproximosencuentros
    cgetProximosEncuentros(competenciaId) {
        //añadir deporteId como parametro para la query
        return this.httpClient.patch(environment.apiUrl + 'fixtures/' + competenciaId + '/getproximosencuentros')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { throw 'Data Loading Error' });
    }

    //api/fixtures/{competencia}/generarfixture
    generarFixture(competenciaId) {
        //añadir deporteId como parametro para la query
        return this.httpClient.patch(environment.apiUrl + 'fixtures/' + competenciaId + '/generarfixture')
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => { 
                throw error
            });
    }

    postParticipantes(participante) {
        /**
         * conviene hacer un put de competencia para actualizar la lista de participantes??
         * o guardo los participantes pasando el id de la competencia?
         */
        return this.httpClient.post(environment.apiUrl + 'participantes', participante)
            .toPromise()
            .then((data: any) => {
                return data;
            })
            .catch(error => {
                //throw error.error.errors.children.atributo.errors[0];
                //debugger
                throw error;
            });
    }

    

}
