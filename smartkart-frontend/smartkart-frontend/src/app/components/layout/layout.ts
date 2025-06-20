import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router,RouterModule,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  searchTerm:string = '';

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
