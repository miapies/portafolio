import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Miembro } from '../interfaces/miembro.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: Miembro[] = [];
  cargada = false;

  constructor(private http: HttpClient) {
    // console.log('Servicio de infoPagina listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer el archivo JSON
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        // console.log(resp);
      });
  }

  private cargarEquipo() {
    this.http
      .get('https://angular-html-ccf87.firebaseio.com/equipo.json')
      .subscribe((resp: Miembro[]) => {
        // console.log(resp);
        this.equipo = resp;
      });
  }
}
