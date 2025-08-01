import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserProfile } from '../../model/profile.model';
import { OrderService } from '../../service/order-service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  user!: UserProfile;
  
  ngOnInit(): void {
    this.loadProfile();
  }

  constructor(private router:Router,
    private orderService:OrderService,
    private cdr:ChangeDetectorRef
  ){

  }

  loadProfile():void{
    const userId = parseInt(localStorage.getItem('userId') || '0');
    this.orderService.getProfile(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch profile:', err);
      }
    });
  }

  onLogOut(){
    localStorage.removeItem('logData')
    this.router.navigateByUrl('/login')
  }

  viewOrders(): void {
    this.router.navigate(['/userOrders']);
  }
}
