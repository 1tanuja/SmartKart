import { FileHandle } from "./file-handle.model";


export class CartDto{
    userId:number;
    productId:number;
    quantity:number;

    constructor(){
        this.userId=0;
        this.productId=0;
        this.quantity=1;
    }
}


export class CartResponse{
    cartId:number;
    productId:number;
    productName:string;
    originalPrice:number;
    offerPrice:number;
    discountPercent:number;
    quantity:number;
    productimages: FileHandle[];

    constructor(){
        this.cartId=0;
        this.productId=0;
        this.productName='';
        this.originalPrice=0;
        this.offerPrice=0;
        this.discountPercent=0;
        this.quantity=0;
        this.productimages=[];
    }
}