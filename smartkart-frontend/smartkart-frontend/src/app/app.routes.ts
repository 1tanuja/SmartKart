import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Adminlayout } from './components/adminlayout/adminlayout';
import { Admindashboard } from './components/admindashboard/admindashboard';
import { Product } from './components/product/product';
import { UserProducts } from './components/user-products/user-products';
import { Cart } from './components/cart/cart';
import { BuyNow } from './components/buy-now/buy-now';
import { Payment } from './components/payment/payment';

export const routes: Routes = [
   {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
   },

   {
        path:'login',
        component: Login
   },

   {
        path:'',
        component:Layout,
        children:[
            {
                path:'dashboard',
                component:Dashboard
            },
            {
                path:'product',
                component:UserProducts
            },
            {
                path:'product/:id',
                component:UserProducts
            },
            {
                path:'cart',
                component:Cart
            },
            {
                path:'buy-now',
                component:BuyNow
            },
            {
                path:'payment',
                component:Payment
            }
        ]

   },
    
   {
     path:'admin',
     component:Adminlayout,
     children:[
         {
             path:'admindashboard',
             component:Admindashboard
         },
         {
            path:'products',
            component:Product
        }
         
     ]

  }

];
