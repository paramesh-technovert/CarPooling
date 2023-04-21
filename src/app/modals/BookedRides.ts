import { Guid } from "guid-typescript";

export class BookedRides{
guid!:Guid
rideProviderName!:string
boardingStop!:string  
destination!:string 
date!:Date
price!:number
seatsBooked!:number
image!:string
}
