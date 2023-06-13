// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface Response {
    products: Product[];
    limit: number;
    total: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

//   getProducts(page?: number, itemsPerPage?: number): Observable<Product[]> {
//     return this.http.get<Product[]>('/assets/products.json')
//       .pipe(
//         map(products => {
//           if (page && itemsPerPage) {
//             const start = (page - 1) * itemsPerPage;
//             const end = start + itemsPerPage;
//             return products.slice(start, end);
//           }
//           return products;
//         })
//       );
//   }

  getProducts(page?: number, itemsPerPage?: number): Observable<Product[]> {
    return this.http.get<Response>('https://dummyjson.com/products')
      .pipe(
        map(response => {
          if (page && itemsPerPage) {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return response.products.slice(start, end);
          }
          return response.products;
        })
      );
  }

  getProduct(id: number): Observable<Product> {
    // Ideally, you would use a specific API endpoint to fetch the product detail
    return this.http.get<Product>(`https://dummyjson.com/products/` + id);
    //   .pipe(map(products => products.find(product => product.id === id)));
  }
  
//   getProduct(id: number): Observable<Product | undefined> {
//     return this.http.get<Product[]>('/assets/products.json')
//       .pipe(
//         map(products => products.find(product => product.id === id))
//       );
//   }
}
