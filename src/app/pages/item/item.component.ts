import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDesc } from '../../interfaces/producto-desc.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: ProductoDesc;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private _productos: ProductosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params);
      if (params['id']) {
        this._productos
          .getProducto(params['id'])
          .subscribe((item: ProductoDesc) => {
            // console.log(item);
            this.id = params['id'];
            this.producto = item;
          });
      }
    });
  }
}
