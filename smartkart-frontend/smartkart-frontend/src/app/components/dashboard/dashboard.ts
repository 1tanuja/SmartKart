import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../model/product.model';
import { ProductService } from '../../service/product-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserProductService } from '../../service/user-product-service';
import { UserProduct } from '../../model/userProduct.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  @ViewChild('productSection') productSection!: ElementRef;
  private shouldScrollToProducts: boolean = false;

  categories: Category[]=[];

  userProducts: UserProduct[]=[];

  constructor(private productServices: ProductService,
    private userProductService:UserProductService,
    private sanitizer:DomSanitizer,
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      const searchQuery = params['search'];
      this.shouldScrollToProducts = true;
      if(searchQuery){
        this.shouldScrollToProducts=true;
        this.searchProductsByName(searchQuery);
      }else if (categoryId) {
        this.shouldScrollToProducts=true;
        this.loadProductsByCategory(categoryId);
      } else {
        this.loadProducts();
      }
    });
  }
  

  scrollToProductSection(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.productSection?.nativeElement) {
        const yOffset = -80;
        const elementPosition = this.productSection.nativeElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition + yOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  }
  

  loadCategories(): void{
    this.productServices.getAllCategories().subscribe({
      next: (data: Category[]) =>{
        this.categories =data;
      },
      error: (error) =>{
        console.log("Error Fetching Categories",error);
      }

    });
  }

  loadProducts():void  {
    this.userProductService.getAllProducts().subscribe(
      (data) => {
        this.userProducts = data;
  
        const total = this.userProducts.length;
        if (total === 0 && this.shouldScrollToProducts) {
          this.scrollToProductSection();
          this.shouldScrollToProducts = false;
        }
  
        let loaded = 0;
        this.userProducts.forEach(product => {
          this.loadProductImages(product, () => {
            loaded++;
            if (loaded === total && this.shouldScrollToProducts) {
              this.scrollToProductSection();
              this.shouldScrollToProducts = false;
            }
          });
        });
      }
    );
  }

  loadProductImages(product: UserProduct, onComplete?: () => void) {
    this.userProductService.loadProductImages(product.id).subscribe(
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


    loadProductsByCategory(categoryId: any) {
      this.userProductService.getProductsByCategory(categoryId).subscribe(
        (data) => {
          this.userProducts = data;
    
          const total = this.userProducts.length;
          if (total === 0 && this.shouldScrollToProducts) {
            this.scrollToProductSection();
            this.shouldScrollToProducts = false;
          }
    
          let loaded = 0;
          this.userProducts.forEach(product => {
            this.loadProductImages(product, () => {
              loaded++;
              if (loaded === total && this.shouldScrollToProducts) {
                this.scrollToProductSection();
                this.shouldScrollToProducts = false;
              }
            });
          });
        }
      );
    }

    searchProductsByName(searchQuery: any) {
      this.userProductService.seachProducts(searchQuery).subscribe(
        (data) => {
          this.userProducts = data;
    
          const total = this.userProducts.length;
          if (total === 0 && this.shouldScrollToProducts) {
            this.scrollToProductSection();
            this.shouldScrollToProducts = false;
          }
    
          let loaded = 0;
          this.userProducts.forEach(product => {
            this.loadProductImages(product, () => {
              loaded++;
              if (loaded === total && this.shouldScrollToProducts) {
                this.scrollToProductSection();
                this.shouldScrollToProducts = false;
              }
            });
          });
        }
      );
    }
    

}
