import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, Products } from '../../model/product.model';
import { ProductService } from '../../service/product-service';
import { CommonModule } from '@angular/common';
import { FileHandle } from '../../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit{

  showAddForm: boolean = false;
  isEditMode: boolean = false;

  toggleAddForm(productToEdit?: Products) {
    this.showAddForm = !this.showAddForm;

    if(productToEdit){
      this.isEditMode=true
      this.product = {
        ...productToEdit,
        category: productToEdit.category ?? { id: 0, categoryName: '' },
        productimages: [...(productToEdit.productimages || [])]
      };
    } else {
      this.isEditMode = false;
      this.product = new Products();
    }
  }

  categories: Category[] =[];
  selectedCategoryId: number | null = null;

  product:Products=new Products();
  
  products:Products[] =[];
  

  constructor(private productService: ProductService,private sanitizer:DomSanitizer,private route:ActivatedRoute){
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      if (categoryId) {
        this.loadProductsByCategory(categoryId);
      } else {
        this.loadProducts();
      }
    });
    // this.loadProducts();
  }

  loadCategories(): void{
    this.productService.getAllCategories().subscribe({
      next: (data: Category[]) =>{
        this.categories =data;
      },
      error: (error) =>{
        console.log("Error Fetching Categories",error);
      }

    });
  }


  onSubmit(){
    const productFormData=this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe({
      next: data =>{
        console.log("product added", data);
        alert("Product Saved in database");
        this.resetForm();
      },
      error:error=>{
        console.log("error",error);
      }
    });
  }

  updateProduct(){
    const productFormData=this.prepareFormData(this.product);
    this.productService.updateProduct(this.product.id,productFormData).subscribe({
      next: (data) => {
        console.log("Product updated", data);
        alert("Product Updated Successfully");
        this.loadProducts();
        this.resetForm();
      },
      error: (error) => {
        console.error("Error updating product", error);
      }
    });
  }

  resetForm(): void {
    this.product = new Products();
    this.showAddForm = false;
    this.isEditMode = false;
  }

  prepareFormData(product:Products):FormData{
    const formData=new FormData();
    formData.append('product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );
    for(var i=0;i<product.productimages.length; i++){
      formData.append(
        'image',
        product.productimages[i].file,
        product.productimages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event:any){
    if(event.target.files){
      const file=event.target.files[0];
      const FileHandle: FileHandle={
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productimages.push(
        FileHandle
      );
    }
  }

  loadProducts():void{
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products=data;
        this.products.forEach( product => 
        {
          this.loadProductImages(product);
        }
        );
      }
    );
  }

  loadProductsByCategory(categoryId: any){
    this.productService.getProductsByCategory(categoryId).subscribe(
      (data) => {
        this.products=data;
        this.products.forEach( product => 
          {
            this.loadProductImages(product);
          }
          );
      }
    )
  }

  loadProductImages(product:Products){
    this.productService.loadProductImages(product.id).subscribe(
      (imageBlob) => {
        const reader=new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload= ()=>{
          product.productimages=[
            {
              file: new File([imageBlob], product.name, { type: imageBlob.type }),
              url: this.sanitizer.bypassSecurityTrustUrl(reader.result as string)
            }
          ]
        }
      }
    );
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
          console.log('Product deleted!!');
          alert("Product Deleted Successfully");
        }
      });
    }
  }

}
