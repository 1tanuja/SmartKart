import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserProduct } from '../../model/userProduct.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserProductService } from '../../service/user-product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CartDto } from '../../model/cart.model';
import { CartService } from '../../service/cart-service';

@Component({
  selector: 'app-user-products',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-products.html',
  styleUrl: './user-products.css'
})
export class UserProducts implements OnInit{
  
  productId!: number;
  product!: UserProduct;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: UserProductService,
    private sanitizer: DomSanitizer,
    private cdr:ChangeDetectorRef,
    private cartService:CartService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductDetails();
    });
  }

  buyNow(product: any){
    this.router.navigate(['/buy-now'], {
      state: { from: 'single', products: [{ ...product, quantity: 1 }] }
    });
  }

  loadProductDetails(){
      this.productService.getProductById(this.productId).subscribe(
        (data) => {
           this.product=data;
           this.loadProductImages(this.product, 
            () => {
              this.loading = false;
              this.cdr.detectChanges();
            }
           );
        });
  }

  loadProductImages(product: UserProduct, onComplete?: () => void) {
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
          if (onComplete) {
            onComplete(); // Trigger once image is loaded
          }
        };
      }
    );
  }

  addProductToCart(){
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const productId=this.product.id;
    const cartItem: CartDto={
      userId:userId,
      productId:productId,
      quantity:1
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: ()=> {
        alert('Product Added to Cart!');
        // window.dispatchEvent(new CustomEvent('cart-updated'));
        this.cartService.getCartItem(userId).subscribe(items => {
          const count = new Set(items.map(item => item.productId)).size;
          this.cartService.updateCartCount(count); // 🔁 updates count in layout/navbar
        });

      },  
      error: (err) => alert('Failed to add to cart: ' + err.message)
    });
  }

}
