import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router:Router){

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
      // Simulate instant order confirmation
      this.paymentSuccess = true;
      this.showForm = false;
    }
  }

  onSubmit() {
    if (!this.selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    this.paymentSuccess = true;
    this.showForm = false; 
  }

  goToOrders() {
    this.router.navigate(['/orders']); // You can update path as needed
  }
    

}
