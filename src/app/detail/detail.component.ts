import { Component, OnInit, Input } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() product: Product;
  prods: Product[];

  constructor(private route: ActivatedRoute, private pService: ProductsService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.params.id;
    console.log(id);
    this.pService.getProducts()
      .subscribe(products =>  {
        this.prods = products.filter(p => p._id === id);
        this.product = this.prods[0];
      });
  }

}
