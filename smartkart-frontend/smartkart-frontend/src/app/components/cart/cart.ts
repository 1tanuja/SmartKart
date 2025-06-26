import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartDto, CartResponse } from '../../model/cart.model';
import { CartService } from '../../service/cart-service';
import { UserProduct } from '../../model/userProduct.model';
import { UserProductService } from '../../service/user-product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CheckOutProduct } from '../../model/checkoutProduct.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{
  cartItems: CartResponse[]=[];
  total=0;


  increaseQuantity(item: CartResponse) {
    item.quantity += 1;
    this.updateCartItem(item);
  }
  
  decreaseQuantity(item: CartResponse) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(item);
    }
  }

  constructor(private cartService:CartService,
    private productService:UserProductService,
    private sanitizer:DomSanitizer,
    private cdr:ChangeDetectorRef,
    private router:Router
  ){

  }

  buyFromCart(cartItems: CartResponse[]) {
    const checkoutItems: CheckOutProduct[] =cartItems.map(item => ({
      id: item.productId,
      name: item.productName,
      offerPrice: item.offerPrice,
      quantity: item.quantity, // or use actual quantity if available
      productimages: []
    }));
    this.router.navigate(['/buy-now'], {
      state: { from: 'cart', cartItems: checkoutItems }
    });
  }

  ngOnInit(): void {
    const userId=localStorage.getItem('userId');
    if(userId){
      this.cartService.getCartItem(+userId).subscribe(
        (data) =>{
          this.cartItems=data;
          this.cartItems.forEach( cartItem => 
            {
              this.loadProductImages(cartItem);
            }
            );    
          this.calculateTotal();
          this.cdr.detectChanges();
        }
      );
    }
  }

  loadProductImages(product: CartResponse, onComplete?: () => void) {
      this.productService.loadProductImages(product.productId).subscribe(
        (imageBlob) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onload = () => {
            product.productimages = [
              {
                file: new File([imageBlob], product.productName, { type: imageBlob.type }),
                url: this.sanitizer.bypassSecurityTrustUrl(reader.result as string)
              }
            ];
            this.cdr.detectChanges();
            if (onComplete) {
              onComplete(); // Trigger once image is loaded
            }
          };
        }
      );
    }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) =>
      acc + item.offerPrice * item.quantity, 0);
  }


  updateCartItem(item:CartResponse){
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const cartItem: CartDto={
          userId:userId,
          productId:item.productId,
          quantity:item.quantity
        };
    this.cartService.updateCartItem(cartItem).subscribe({
      next: () =>{
        this.calculateTotal();
      },
      error: (err) => {
      console.error("Failed to update cart item", err);
    }
    });     
  }

  deleteCartItem(cartId:number):void{
    this.cartService.deleteCart(cartId).subscribe(
      {
        next: () => {
          this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
          const count = new Set(this.cartItems.map(item => item.productId)).size;
          this.cartService.updateCartCount(count);
          alert('Item deleted successfully');
        },
        error:(err) => {
          console.error("Failed to delete cart item", err);
        }
      }
    )
  }

}
