import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserProduct } from '../../model/userProduct.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CheckOutProduct } from '../../model/checkoutProduct.model';

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
    private cdr:ChangeDetectorRef
  ){

  }

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
    // Replace this with actual API/service call
  
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
    
    this.router.navigate(['/payment']);
  }
}
