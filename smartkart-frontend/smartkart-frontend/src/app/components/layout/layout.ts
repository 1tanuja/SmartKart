import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router,RouterModule,RouterOutlet } from '@angular/router';
import { CartService } from '../../service/cart-service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit{
  cartCount: number = 0;
  searchTerm:string = '';

  constructor(private cartService:CartService, private cdr: ChangeDetectorRef){
  } 

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadCartCount(+userId);
      // window.addEventListener('cart-updated', () => {
      //   this.loadCartCount(+userId);
      // });
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
        this.cdr.detectChanges();
      });
    }
  }

  loadCartCount(userId: number) {
    this.cartService.getCartItem(userId).subscribe(items => {
      // Only count unique products
      this.cartCount = new Set(items.map(item => item.productId)).size;
      this.cdr.detectChanges();
    });
  }

  router = inject(Router)
  
  onLogOut(){
    localStorage.removeItem('logData')
    this.router.navigateByUrl('/login')
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/dashboard'], { queryParams: { search: this.searchTerm } });
    }
  }
}
