import { FileHandle } from "./file-handle.model";
import { Category } from "./product.model";

export class UserProduct{
    id:number;
    name:string;
    description:string;
    originalPrice: number;
    offerPrice:number;
    discountPercent:number;
    category: Category;
    productimages: FileHandle[];
    
        constructor(){
            this.id=0;
            this.name='';
            this.description='';
            this.originalPrice=0.0;
            this.offerPrice=0.0;
            this.discountPercent=0.0;
            this.category=new Category();
            this.productimages = [];
        }
}