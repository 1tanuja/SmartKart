import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Category } from '../../model/product.model';
import { ProductService } from '../../service/product-service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './adminlayout.html',
  styleUrl: './adminlayout.css'
})
export class Adminlayout implements OnInit{
  categories: Category[] = [];
  router = inject(Router)
  constructor(private productService: ProductService){
  }

  ngOnInit(): void {
    this.loadCategories();
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

  onLogOut(){
    localStorage.removeItem('logData');
    this.router.navigateByUrl('/login');
  }
}
