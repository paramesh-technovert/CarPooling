export class MatchedRidesRequest
    {
        Id:string;
        BoardingPoint:string;
        Destination:string;
        Date:Date;
        SeatsRequired:number;
        constructor(Id:string,BoardingPoint: string,Destination: string,date:Date,SeatsRequired: number){
            this.Id=Id;
            this.BoardingPoint=BoardingPoint;
            this.Destination=Destination;
            this.Date=date;
            this.SeatsRequired=SeatsRequired;

        }
    }