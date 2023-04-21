import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookRideRequestDTO } from 'src/app/modals/BookRideRequest';
import { MatchedRidesRequest } from 'src/app/modals/MatchedRideRequest';
import { MatchedRidesResponse } from 'src/app/modals/MatchedRideResponse';
import { BookRideService } from 'src/app/services/book-ride.service';
import { DateValidator } from 'src/app/validators/datevalidator';

@Component({
  selector: 'app-bookride',
  templateUrl: './bookride.component.html',
  styleUrls: ['./bookride.component.css']
})
export class BookrideComponent implements OnInit {
  display:boolean=false;
  bookRide:FormGroup;
  confirm:boolean=false;
  bookingDetails!:MatchedRidesResponse;
  request!:MatchedRidesRequest;
  bookRideRequest!:BookRideRequestDTO;
  data: MatchedRidesResponse[]=[];
  errorMessage: any;
  constructor(private service:BookRideService,private router:Router) { 
    this.bookRide=new FormGroup({
      from:new FormControl('',[Validators.required]),
      to:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required,DateValidator()]),
      seats:new FormControl('',[Validators.required])
    })
  }
  onSubmit(){
    const values=this.bookRide.value;
    this.request=new MatchedRidesRequest(localStorage.getItem('userId')!,values.from,values.to,values.date,values.seats);
    this.service.getMatchedRides(this.request).subscribe({
      next : (user)=>{ this.data=user;this.display=true;},
      error : (err)=> { this.errorMessage=err.error}  
    });
    
    
  }
  redirect(){
    this.router.navigate(['../../homepage/offerRide']);
  }
  bookaRide(ride:MatchedRidesResponse){
    this.confirm=true;
    this.bookingDetails=ride;
  }
  book(){
    this.bookRideRequest=new BookRideRequestDTO(localStorage.getItem('userId')!,this.bookingDetails.rideId,this.bookingDetails.dateTime,this.bookingDetails.boardingStopId,this.bookingDetails.destinationStopId,this.bookingDetails.availableSeats,this.request.SeatsRequired);
    this.confirm=false;
    this.service.bookRide(this.bookRideRequest).subscribe({
      next : (user)=>{ console.log(user);alert("Successfully Booked a Ride");this.router.navigate(['../../homepage'])},
      error : (err)=> { this.errorMessage=err.error}  
    })
  }
  ngOnInit(): void {
  }

}
