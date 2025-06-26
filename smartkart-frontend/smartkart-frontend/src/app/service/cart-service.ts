import { Injectable } from '@angular/core';
import { CartDto, CartResponse } from '../model/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http:HttpClient) { }

  url="http://localhost:8080/cart";

  addToCart(cart:CartDto):Observable<any>{
    return this.http.post(`${this.url}/add`,cart,
      {
        withCredentials:true
      }
    );
  }

  getCartItem(userId:number):Observable<CartResponse[]>{
    return this.http.get<CartResponse[]>(`${this.url}/getItem/${userId}`,
      {
        withCredentials:true
      }
    );
  }

  updateCartItem(cart:CartDto):Observable<any>{
    return this.http.put(`${this.url}/updateCart`,cart,
      {
        withCredentials:true
      }
    );
  }

  deleteCart(cartId:number):Observable<any>{
    return this.http.delete(`${this.url}/deleteCart/${cartId}`,{
      withCredentials:true
    });
  }

  updateCartCount(count: number): void {
    this.cartCount.next(count);
  }
}
