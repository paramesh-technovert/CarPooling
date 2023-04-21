export class UserDetailsRequest{
    id!:string

    firstName!:string

    lastName!:string

    phoneNumber!:number

    imageUrl!:string
    constructor(id:string ,firstName:string,lastName:string,phoneNumber:number,imageUrl:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.phoneNumber=phoneNumber;
        this.imageUrl=imageUrl;
    }
}