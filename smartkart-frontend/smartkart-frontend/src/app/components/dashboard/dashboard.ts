import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/product.model';
import { ProductService } from '../../service/product-service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  categories: Category[]=[];

  constructor(private productServices: ProductService){

  }

  ngOnInit(): void {
    this.loadCategories();
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

}
