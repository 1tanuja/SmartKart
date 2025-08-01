import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserProduct } from '../../model/userProduct.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CheckOutProduct, OrderProductDto, PlaceOrderDto } from '../../model/checkoutProduct.model';
import { OrderService } from '../../service/order-service';
import { CartService } from '../../service/cart-service';

@Component({
  selector: 'app-buy-now',
  imports: [CommonModule,FormsModule],
  templateUrl: './buy-now.html',
  styleUrl: './buy-now.css'
})
export class BuyNow implements OnInit{

  constructor(private router:Router,
    private productService:ProductService,
    private sanitizer:DomSanitizer,
    private cdr:ChangeDetectorRef,
    private orderService:OrderService,
    private cartService:CartService
  ){

  }

  // Form fields for new address
  fullName: string = '';
  phoneNumber: string = '';
  fullAddress: string = '';
  pinCode: string = '';
  userId:number=0;

  products: (CheckOutProduct & { quantity: number })[] = [];
  totalPrice: number = 0;

  showNewAddressForm = false;
  savedAddress: any = null;

  selectedPaymentMethod: string = '';
  selectedAddressId: number | null = this.savedAddress?.id || null;

  ngOnInit(): void {
    const nav = history.state;
    if (nav.from === 'cart' && nav.cartItems) {
      this.products = nav.cartItems.map((item: CheckOutProduct) => ({
        id: item.id,
        name: item.name,
        offerPrice: item.offerPrice,
        quantity: item.quantity || 1,
        productimages: item.productimages || []
      }));
    }else if (nav.from === 'single') {
            this.products = nav.products.map((p: CheckOutProduct) => ({
              id: p.id,
              name: p.name,
              offerPrice: p.offerPrice,
              quantity: p.quantity || 1,
              productimages: p.productimages || []
            }));
          } 
    this.products.forEach(product => {
      this.loadProductImages(product);
    });
    this.totalPrice = this.products.reduce(
      (sum, p) => sum + (p.offerPrice * p.quantity),
      0
    );
    this.getUserAddress();
  }

  getUserAddress() {
    const storedUser = parseInt(localStorage.getItem('userId') || '0');
  
    if (storedUser) {
      this.userId = storedUser;
  
      this.orderService.getAddress(this.userId).subscribe({
        next: (res) => {
          if (res && res.id) {
            // Address exists
            this.savedAddress = {
              id: res.id,
              name: res.fullName,
              location: res.fullAddress,
              phone: res.phoneNumber,
              pinCode: res.pinCode
            };
            this.selectedAddressId = res.id;
            this.showNewAddressForm = false; // use saved address by default
          } else {
            // No address found, force add new address flow
            this.savedAddress = null;
            this.selectedAddressId = null;
            this.showNewAddressForm = true;
          }
        },
        error: (err) => {
          // Still treat as first-time user — don't show error
          console.warn('No address found. Showing new address form.');
          this.savedAddress = null;
          this.selectedAddressId = null;
          this.showNewAddressForm = true;
        }
      });
    } else {
      console.warn('User not found in local storage');
    }
  }
  

  toggleNewAddressForm(event: any) {
    this.showNewAddressForm = event.target.checked;
    if (this.showNewAddressForm) {
      this.selectedAddressId = null; // Unselect saved if new is selected
    } else {
      this.selectedAddressId = this.savedAddress?.id;
    }
  }

  loadProductImages(product: CheckOutProduct, onComplete?: () => void) {
    this.productService.loadProductImages(product.id).subscribe(
      (imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload = () => {
          product.productimages = [
            {
              file: new File([imageBlob], product.name, { type: imageBlob.type }),
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

  placeOrder(){
    const products: OrderProductDto[]=this.products.map(
      p=>({
        productId:p.id,
        productName:p.name,
        quantity:p.quantity,
        unitPrice:p.offerPrice
      })
    );
    const orderPayLoad: PlaceOrderDto={
        userId:this.userId,
        addressId: this.showNewAddressForm ? undefined : this.selectedAddressId!,
        fullName:this.showNewAddressForm ? this.fullName : this.savedAddress?.name,
        phoneNumber:this.showNewAddressForm ? this.phoneNumber : this.savedAddress?.phone,
        fullAddress:this.showNewAddressForm ? this.fullAddress : this.savedAddress?.location,
        pinCode:this.showNewAddressForm ? this.pinCode : this.savedAddress?.pinCode,
        newAddress: this.showNewAddressForm,
        fromCart: history.state.from === 'cart',
        totalPrice: this.totalPrice,
        orderStatus: 'PENDING',
        products: products
    }
    this.orderService.placeOrder(orderPayLoad).subscribe({
      next: (response) => {
        console.log('✅ Order placed successfully:', response);
        console.log(response);
        if (response?.orderId) {
          console.log("Entered: "+response.orderId);
          localStorage.setItem('orderId', response.orderId.toString());
        }
        if (orderPayLoad.fromCart && this.userId) {
          this.cartService.getCartItem(this.userId).subscribe(items => {
            const count = new Set(items.map(item => item.productId)).size;
            this.cartService.updateCartCount(count); // ✅ Emit new count
          });
        }
        this.router.navigate(['/payment']); // Or any confirmation page
      },
      error: (err) => {
        console.error('❌ Failed to place order:', err);
      }
    }); 
  }
}
