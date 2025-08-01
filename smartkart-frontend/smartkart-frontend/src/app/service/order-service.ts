import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceOrderDto } from '../model/checkoutProduct.model';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/profile.model';
import { AdminOrderResponse, RecentOrder } from '../model/AdminOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8080/order";

  placeOrder(placeOrderData: PlaceOrderDto):Observable<any>{
    return this.http.post(`${this.url}/place`,placeOrderData,{
      withCredentials:true
    });
  }

  getAddress(userId:number):Observable<any>{
    return this.http.get(`${this.url}/getAddress/${userId}`,{
      withCredentials:true
    })
  }

  updateOrderStatus(orderId: number, orderStatus: string):Observable<any>{
    return this.http.put(`${this.url}/updateStatus`,{
      orderId,
      orderStatus
    },{
      withCredentials:true
    })
  }

  getProfile(userId:number):Observable<UserProfile>{
    return this.http.get<UserProfile>(`${this.url}/getProfile/${userId}`,{
      withCredentials:true
    })
  }

  getOrderForUser(userId:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getOrders/${userId}`,{
      withCredentials:true
    })

  }

  getAllOrders():Observable<AdminOrderResponse[]>{
      return this.http.get<AdminOrderResponse[]>("http://localhost:8080/admin/order/getAll", {
        withCredentials:true
      });
  }

  adminOrderStatusUpdate(orderId:number,newStatus:String):Observable<HttpResponse<any>>{
      return this.http.put<HttpResponse<any>>(`http://localhost:8080/admin/order/statusUpdate/${orderId}`,{
        orderStatus:newStatus},
        {
          withCredentials:true,
          observe: 'response' 
        }
      );
  }

  getAdminDashBoardSummary():Observable<any>{
    return this.http.get(`http://localhost:8080/admin/order/getSummary`,{
      withCredentials:true
    });
  }

  fetchRecentOrders(): Observable<RecentOrder[]> {
    return this.http.get<RecentOrder[]>('http://localhost:8080/admin/order/recentOrders', {
      withCredentials: true
    });
      
  }
}
