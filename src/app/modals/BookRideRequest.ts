import { Guid } from "guid-typescript";
export class BookRideRequestDTO
{
    id!:string;
    rideId!:number; 
    dateTime!:Date;
    boardingStopId!:number;
    destinationStopId!:number;
    availableSeats!:number;
    bookedSeats!:number;
    constructor(Id:string,RideId:number,DateTime:Date,BoardingStopId:number,DestinationDtopId:number,AvailableSeats:number,BookedSeats:number){
        this.id=Id;
        this.rideId=RideId;
        this.dateTime=DateTime;
        this.boardingStopId=BoardingStopId;
        this.destinationStopId=DestinationDtopId;
        this.availableSeats=AvailableSeats;
        this.bookedSeats=parseInt(BookedSeats.toString())
    }
}