export interface RecentOrderDto {
    orderId: number;
    totalPrice: number;
    orderDate: string;
    orderStatus: string;
    productNames: string[];
  }
  
  export interface UserProfile {
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    pinCode: string;
    recentOrders?: RecentOrderDto;
  }