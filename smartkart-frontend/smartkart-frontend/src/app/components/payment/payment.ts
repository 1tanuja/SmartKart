import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../service/order-service';

@Component({
  selector: 'app-payment',
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

  selectedMethod: string = '';
  paymentData: any = {};
  paymentSuccess: boolean = false;
  showForm: boolean = true;

  orderId:number=0;

  constructor(private router:Router,private orderService:OrderService){
    this.orderId = parseInt(localStorage.getItem('orderId') || '0'); 
  }

  paymentMethods = [
    { value: 'credit_card', label: 'Credit Card', icon: 'fas fa-credit-card text-primary' },
    { value: 'upi', label: 'UPI', icon: 'fas fa-mobile-alt text-success' },
    { value: 'net_banking', label: 'Net Banking', icon: 'fas fa-university text-info' },
    { value: 'cod', label: 'Cash on Delivery', icon: 'fas fa-money-bill-wave text-warning' }
  ];

  selectPayment(method: string) {
    this.selectedMethod = method;
    this.paymentData = {}; // clear form on new selection
  
    if (method === 'cod') {
      const paymentStatus = 'Order Placed (Cash on Delivery)';
  
      // Immediately call backend to update status
      this.orderService.updateOrderStatus(this.orderId, paymentStatus).subscribe({
        next: () => {
          this.paymentSuccess = true;
          this.showForm = false;
        },
        error: (err) => {
          console.error('❌ Failed to update COD status', err);
          alert('Failed to place order. Please try again.');
        }
      });
    }
  }

  onSubmit() {
    if (!this.selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    const statusMap: any = {
      'credit_card': 'Order Placed(Paid via Credit Card)',
      'upi': 'Order Placed(Paid via UPI)',
      'net_banking': 'Order Placed(Paid via Net Banking)',
      'cod': 'Order Placed (Cash on Delivery)'
    };
    const paymentStatus = statusMap[this.selectedMethod] || 'Payment Status Unknown';
    this.orderService.updateOrderStatus(this.orderId, paymentStatus).subscribe({
      next: () => {
        this.paymentSuccess = true;
        this.showForm = false;
      },
      error: (err) => {
        console.error('Failed to update payment status', err);
        alert('Payment failed. Please try again.');
      }
    });
  }

  

  goToOrders() {
    this.router.navigate(['/orders']); // You can update path as needed
  }
    

}
