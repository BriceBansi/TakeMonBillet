import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/product';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
url = 'assets/data/products.json';
value: string;

  constructor(private http: HttpClient) { }

getProducts(): Observable<Product[]> {
return this.http.get<Product[]>(this.url)
       .pipe(
         catchError(this.handleError('getProducts', []))
      );
}

getValue() {
  return this.value;
}
setValue(value) {
  this.value = value;
}


private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
