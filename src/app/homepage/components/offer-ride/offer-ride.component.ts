import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferRideRequest } from 'src/app/modals/OfferRideRequest';
import { stopsDTO } from 'src/app/modals/stopsDTO';
import { OfferRideService } from 'src/app/services/offer-ride.service';
import { DateValidator } from 'src/app/validators/datevalidator';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {

  next:boolean=false
  stopNumber:number;
  OfferRide:FormGroup;
  rideDetails:FormGroup;
  stopDetails:FormGroup;
  pickupStop:FormGroup;
  stops:stopsDTO[]=[];
  previousDate!:Date;
  submitted:boolean=false;
  previousStop: string="";
  constructor(private router:Router,private service:OfferRideService) { 
    this.stopNumber = 1;
    this.pickupStop=new FormGroup({
      stopName:new FormControl('',[Validators.required,this.StopNameCheck()]),
      pickupDate:new FormControl('',[Validators.required,this.StopDateCheck()])
    })
    this.rideDetails=new FormGroup({
      from:new FormControl('',[Validators.required,this.StopNameCheck()]),
      to:new FormControl('',[Validators.required,this.StopNameCheck()]),
      date:new FormControl('',[Validators.required,DateValidator()])
    })
    this.stopDetails=new FormGroup({
      seats:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$')])
    })
    this.OfferRide=new FormGroup({
      rideInfo:this.rideDetails,
      stopsInfo:this.stopDetails
    })
  }

  ngOnInit(): void {
  }
  addCard(){
    var values=this.rideDetails.value;
    this.previousDate=values.date;
    this.previousStop=values.from.trim().toLowerCase();
    const pushStop=new stopsDTO(values.from,values.date)
    this.stops.push(pushStop);
    this.next=true;
    Object.keys(this.rideDetails.controls).forEach(key => {
      this.rideDetails.get(key)!.disable();})
   }
   submit(){
    const values=this.pickupStop.value;
    if(values.stopName!='' && values.pickupDate!=''){
      this.stops.push(values);
    }
    const finalStop=new stopsDTO(this.rideDetails.value.to.trim().toLowerCase(),this.previousDate);
    this.stops.push(finalStop);
    const ridevalues=this.rideDetails.value;
    const stopvalues=this.stopDetails.value;
    const offerRide=new OfferRideRequest(localStorage.getItem('userId')!.toString(),ridevalues.from,ridevalues.to,ridevalues.date,stopvalues.price,stopvalues.seats,this.stops)
    var res=this.service.offerRide(offerRide).subscribe({
      next:(data)=>{alert("Successfully offered a ride");this.router.navigate(['homepage'])},
      error: (err)=> { alert("Something went wrong please try again later");console.log(err)} 
      
    });

   }
   addStop(){
    const values=this.pickupStop.value;
    const val=new stopsDTO(values.stopName,values.pickupDate);
    this.stops.push(val);
    this.stopNumber+=1;
    this.previousStop=values.stopName.toLowerCase();
    this.previousDate=values.pickupDate;
    this.pickupStop.reset({pickupDate:'',stopName:''});
   }
  redirect(){
    this.router.navigate(['../../homepage/bookRide']);
  }
  StopDateCheck(){
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
       const currentDate = new Date(this.previousDate);
       if (inputDate <= currentDate) {
         return { InvalidStopDate: true };
       }
   
       return null;
     }
  }
  StopNameCheck(){
    return (control: AbstractControl): { [key: string]: any } | null => {
       if (((control.value).trim()).toLowerCase() === (this.previousStop.trim()).toLowerCase()) {
         return { InvalidStopName: true };
       }
       if((control.value.trim())==0){
        return {whiteSpace:true}
       }
       return null;
     }
  }
}
