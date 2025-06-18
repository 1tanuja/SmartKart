import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category,Products } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { 
  }

  url="http://localhost:8080/admin";

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>("http://localhost:8080/admin/category/allCat",{
      withCredentials:true
    });
  }

  addProduct(products: FormData):Observable<Products>{
    return this.http.post<Products>(`${this.url}/product/addProduct`,products,{
      withCredentials:true
    });
  }

  getAllProducts():Observable<Products[]>{
    return this.http.get<Products[]>(`${this.url}/product/all`,{
      withCredentials:true
    });
  }

  getProductsByCategory(categoryId:number):Observable<Products[]>{
    return this.http.get<Products[]>(`${this.url}/product/ProductByCategory`,{
      params: {
        category: categoryId
      },
      withCredentials:true
    });
  }

  loadProductImages(productId:number):Observable<Blob>{
    return this.http.get(`${this.url}/product/image/${productId}`,{
      responseType: 'blob',
      withCredentials: true
    });
  }

  updateProduct(productId:number,products: FormData):Observable<Products>{
    return this.http.put<Products>(`${this.url}/product/update/${productId}`,products,{
      withCredentials: true
    });
  }

  deleteProduct(productId:number):Observable<any>{
    return this.http.delete(`${this.url}/product/delete/${productId}`,{
      responseType: 'text',
      withCredentials: true
    });
  }

}
