import { Guid } from "guid-typescript";
import { stopsDTO } from "./stopsDTO";

export class OfferRideRequest{
    rideOwnerId:string

    startingStop:string

    endingStop:string

    date:Date

    fair:number

    totalSeats:number
    stops:stopsDTO[]
    constructor(RideOwnerId:string,StartingStop:string,EndingStop:string,Date:Date,Fair:number,TotalSeats:number,Stops:stopsDTO[]){
        this.rideOwnerId=RideOwnerId;
        this.startingStop=StartingStop;
        this.endingStop=EndingStop;
        this.date=Date;
        this.fair=Fair;
        this.totalSeats=TotalSeats;
        this.stops=Stops;
    }
}