import { Guid } from "guid-typescript";

export class OfferedRides{
    customerId!:Guid
    customerName!:string
    boardingStop!:string
    destination!:string
    date!:Date
    price!:number
    seatsBooked!:number
    image!:string
}