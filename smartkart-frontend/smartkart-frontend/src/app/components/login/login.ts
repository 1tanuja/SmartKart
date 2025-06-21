
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { User } from '../../service/user';
import { error } from 'console';
import { FormsModule, NgForm} from '@angular/forms';
import { UserLogin, UserRegister } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login{
    @ViewChild('loginForm') loginForm!: NgForm;
    @ViewChild('registerForm') registerForm!: NgForm;


   registerData:UserRegister =new UserRegister();
   loginData:UserLogin =new UserLogin();
   router = inject(Router);
   constructor(private userServices:User) {}

   onRegister(){
    console.log("Register clicked");
    this.userServices.registerUser(this.registerData).subscribe({
      next: res =>{
        console.log('Registration Successful',res);
        alert('Registered Successfully!')
        this.registerForm.resetForm();
      },
      error: err=>{
        console.log('Registration Failed',err);
        alert('Registration Failed');
        this.registerForm.resetForm();
      }
    });
   }


   onLogin(){
    console.log("Login Clicked..");
    this.userServices.loginUser(this.loginData).subscribe((res:any) =>{
      localStorage.setItem('logData',res.token);
      localStorage.setItem('role',res.role)
      console.log(res);
      if(res.role == "USER"){
        alert("User Found, Login Successfully");
        this.router.navigate(['/dashboard'])
      }else{
        alert("Admin Login Successfull!!");
        this.router.navigate(['admin/admindashboard'])
      }
      
    },error=> {
      console.log(error);
      alert(error.error || "Invalid Credentials");
      this.loginData = { email: '', password: '' };
      if (this.loginForm) {
        this.loginForm.resetForm();  // this will reset the form view
      }
    }
    );
   }


}
