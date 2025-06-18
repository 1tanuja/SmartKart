import { Component, inject } from '@angular/core';
import {Router,RouterModule,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  router = inject(Router)
  
  onLogOut(){
    localStorage.removeItem('logData')
    this.router.navigateByUrl('/login')
  }
}
