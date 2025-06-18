export class UserRegister{
    id:number;
    name: string;
    email:string;
    password:string;
    role:string;

    constructor(){
        this.id=0;
        this.name='',
        this.email='',
        this.password=''
        this.role=''
    }
}

export class UserLogin{
    email:string;
    password:string;

    constructor(){
        this.email='',
        this.password=''
    }
}