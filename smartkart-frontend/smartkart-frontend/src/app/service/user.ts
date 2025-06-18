import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../model/user.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(private http:HttpClient) { 
    
  }
  registerUser(obj: UserRegister): Observable<any>{
    return this.http.post('http://localhost:8080/api/user/register',obj).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => new Error('Registration failed'));
      })
    );   
  }
  
  loginUser(obj: any): Observable<any>{
    return this.http.post('http://localhost:8080/api/user/verify',obj).pipe(
      catchError((error) => {
        console.error('login Failed',error);
        return throwError(() => new Error('Login Failed'));
      })
    );
  }

}
