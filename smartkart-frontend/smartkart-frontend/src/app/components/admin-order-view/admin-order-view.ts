import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order-service';
import { AdminOrderResponse } from '../../model/AdminOrder.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-order-view',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-order-view.html',
  styleUrl: './admin-order-view.css'
})
export class AdminOrderView implements OnInit{

  orders: AdminOrderResponse[]=[];
  selectedStatus: {[orderId:number]:string}={}

  constructor(private orderService:OrderService,
    private cdr:ChangeDetectorRef
  ){
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders():void{
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
  
        // ✅ Now this runs only after orders are available
        this.orders.forEach(order => {
          this.selectedStatus[order.orderId] = order.orderStatus;
        });

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to fetch orders', err);
      }
    });
  }

  updateStatus(orderId:number):void{
    const newStatus = this.selectedStatus[orderId];
    if (!newStatus) return;

    this.orderService.adminOrderStatusUpdate(orderId, newStatus).subscribe({
      next: (response:any) => {
        if (response.status === 200) {
          const order = this.orders.find(o => o.orderId === orderId);
          if (order) {
            order.orderStatus = newStatus;
          }
          this.selectedStatus[orderId] = newStatus;

          // ✅ Trigger change detection explicitly
          this.cdr.detectChanges();
          alert('✅ Order status updated successfully!');
        } else {
          alert('⚠️ Unexpected response from server.');
        }
      },
      error: (err: any) => {
        console.error('❌ Failed to update status:', err);
        alert('❌ Failed to update status');
      }
    });
  }

}
