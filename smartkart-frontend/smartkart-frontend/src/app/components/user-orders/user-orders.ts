import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-orders',
  imports: [CommonModule],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css'
})
export class UserOrders implements OnInit{
  orders: any[]=[];
  productId!:number;

  constructor(private orderService:OrderService,private cdr:ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (userId) {
      this.orderService.getOrderForUser(+userId).subscribe({
        next: (res:any) => {
          this.orders = res;
          this.cdr.detectChanges();
        },
        error: (err:any) => {
          console.error('Failed to load orders', err);
        }
      });
    }
  }

}
