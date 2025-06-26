import { FileHandle } from "./file-handle.model";



export class Category{
    id: number;
    categoryName:string;
    products: Products[];
    

    constructor(){
        this.id=0;
        this.categoryName='';
        this.products=[]

    }
}


export class Products{
    id:number;
    name:string;
    description:string;
    price: number;
    category: Category;
    productimages: FileHandle[];

    constructor(){
        this.id=0;
        this.name='';
        this.description='';
        this.price=0.0;
        this.category=new Category();
        this.productimages = [];
    }


}