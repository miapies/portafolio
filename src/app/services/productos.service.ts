import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://angular-html-ccf87.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          // console.log(resp);
          this.productos = resp;
          // setTimeout(() => {
          this.cargando = false;
          // }, 1000);
          resolve();
        });
    });
  }

  getProducto(id: string) {
    const url = `https://angular-html-ccf87.firebaseio.com/productos/${id}.json`;

    return this.http.get(url);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    // console.log(this.productos);
    termino = termino.toLowerCase();

    this.productosFiltrado = this.productos.filter(
      producto =>
        producto.categoria.indexOf(termino) >= 0 ||
        producto.titulo.toLowerCase().indexOf(termino) >= 0
    );

    // console.log(this.productosFiltrado);
  }
}
