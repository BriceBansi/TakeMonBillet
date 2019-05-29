import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import {PageEvent} from '@angular/material';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // MatPaginator Output
  pageEvent: PageEvent;

  dataProduct: Product[];
  prodObserver: Observable<Product[]>;
  // MatPaginator Inputs
  @Input() length: number;
  pageSize = 5;
  start = 0;
  // pageSizeOptions: number[] = [5, 10, 25, this.length];
  constructor(private pService: ProductsService, private route: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.pService.getProducts().subscribe(
      data => {
        this.dataProduct = data;
        this.length = this.dataProduct.length;
      }
    );
  }


  onPaginateChange (event) {
    console.log(JSON.stringify('Current page index: ' + event.pageIndex));
  this.start = event.pageIndex * event.pageSize;
  this.pageSize = this.start + event.pageSize;
  console.log(this.start);
  console.log(this.pageSize);
  }

  /*goToDetail(p: Product) {
    const pId = p ? p._id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that hero.
  // Include a junk 'foo' property for fun.
  this.route.navigate(['/detail', { id: pId }]);
  }*/


}
