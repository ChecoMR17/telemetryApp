import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

 const headers = new HttpHeaders({
      'Authorization': 'Bearer fa3a3ca5-891b-4b16-ad07-bd4a2844999f',
      'Accept': 'application/json'
 });

interface estado {
  Id_Estado: number;
  Nombre: number;
}

interface proyectos {
  Id:number,
  Cliente:string
  Proyecto:string
  Contacto:string
  Prioridad:string
  Fecha_Inicio:string
  Fecha_Final:string
  Observaciones:string
  Status:string
}

interface personal {
  nombreCompleto: string;
  Correo: string;
  Status: string;
};
interface municipio {
  Id_Municipios: number;
  Id_Estado: number;
  Nombre: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  listaEstado: estado[] = [];
  listaPersonal: personal[] = [];
  listaMunicipios: municipio[] = [];
  listaProyectos: proyectos[] = [];
  urlServer: string;
  urlV: string;
  constructor(private http: HttpClient) {
    this.urlServer = "http://localhost:3000/data/v1/asb";
    this.urlV = "https://apimarket.mx/api";
  }

  consultarEstados() {
    return this.http.get(`${this.urlServer}/estados`);
  }

  consultarProyectos() {
    return this.http.get(`${this.urlServer}/lista/proyectos`);
  }

  consultarMunicipios(estadoId: any) {
    return this.http.get(`${this.urlServer}/municipio/${estadoId}`);
  }

  consultarPersonal() {
    return this.http.get(`${this.urlServer}/lista/personal`);
  }

  validarCurp(curp: string): Observable<any> {
    return this.http.post(`${this.urlV}/renapo/grupo/valida-curp?curp=${curp}`, {}, { headers:headers });
  }

   consultarRfc(rfc: string): Observable<any> {
    return this.http.post(`${this.urlV}/sat/grupo/obtener-rfc?curp=${rfc}`, {}, { headers:headers });
   }

  guardarPersonal(datos:object) {
    return this.http.post(`${this.urlServer}/guardar/personal`, {datos});
  }

  actualizarPersonal(datos:object) {
    return this.http.put(`${this.urlServer}/actualizar/personal`, {datos});
  }

  cantidadProyectos(periodo: number) {
    return this.http.post(`${this.urlServer}/lista/proyectos/periodo`, { periodo });
  }

  cantidadProyectosEstatus() {
    return this.http.get(`${this.urlServer}/lista/proyectos/estatus`);
  }

  statusPersonal(data:object) {
    return this.http.post(`${this.urlServer}/actualizar/status/personal`, { data });
  }
datosPersonal(id:number) {
    return this.http.get(`${this.urlServer}/datos/personal/${id}`);
  }
}
