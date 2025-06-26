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