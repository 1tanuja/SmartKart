import { FileHandle } from "./file-handle.model";

export class CheckOutProduct{
  id: number;
  name: string;
  offerPrice: number;
  quantity: number;
  productimages: FileHandle[];

  constructor(){
    this.id=0;
    this.name='';
    this.offerPrice=0.0;
    this.quantity=0;
    this.productimages=[]
  }
}

export interface OrderProductDto{
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}


export interface PlaceOrderDto{
    userId: number;
  addressId?: number;
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  pinCode: string;
  newAddress: boolean;
  fromCart: boolean;
  totalPrice: number;
  orderStatus: string;
  products: OrderProductDto[];
}