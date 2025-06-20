import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProduct } from '../model/userProduct.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8080/user/product";

  loadProductImages(productId:number):Observable<Blob>{
    return this.http.get(`${this.url}/images/${productId}`,{
      responseType: 'blob',
      withCredentials: true
    });
  }

  getAllProducts():Observable<UserProduct[]>{
      return this.http.get<UserProduct[]>(`${this.url}/allProduct`,{
        withCredentials:true
      });
    }


     getProductsByCategory(categoryId:number):Observable<UserProduct[]>{
        return this.http.get<UserProduct[]>(`${this.url}/productByCat`,{
          params: {
            category: categoryId
          },
          withCredentials:true
        });
      }

      seachProducts(query:string):Observable<UserProduct[]>{
          return this.http.get<UserProduct[]>(`${this.url}/search`,{
            params:{
              query: query
            },
            withCredentials:true
        });
      }
  
}
