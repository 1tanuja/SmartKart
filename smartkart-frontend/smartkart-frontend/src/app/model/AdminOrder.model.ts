// models/admin-order-response.model.ts

export interface AdminOrderResponse {
    orderId: number;
    orderDate: string;
    totalPrice: number;
    orderStatus: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
    address: {
      fullName: string;
      phoneNumber: string;
      fullAddress: string;
      pinCode: string;
    };
    orderItems: {
      productId: number;
      productName: string;
      quantity: number;
      price: number;
      productImage: string;
    }[];
  }

  export interface DashboardSummary {
    revenue: number;
    orders: number;
    customers: number;
    products: number;
  }

  export interface RecentOrder{
    orderId: number,
    amount: number,
    customerName: string,
    status: string
  } 
  