import { Component, OnInit } from '@angular/core';
import { BookRideService } from '../../../services/book-ride.service';
import { BookedRides } from '../../../modals/BookedRides';
import { OfferedRides } from 'src/app/modals/OfferedRides';

@Component({
  selector: 'app-myrides',
  templateUrl: './myrides.component.html',
  styleUrls: ['./myrides.component.css']
})
export class MyridesComponent implements OnInit {
  bookedRides:BookedRides[]=[];
  offeredRides:OfferedRides[]=[];
  errorMessage!:string;
  constructor(private service:BookRideService) { 
    this.service.getBookedRides(localStorage.getItem('userId')!).subscribe({
      next : (data)=>{this.bookedRides=data},
      error : (err)=> { this.errorMessage=err.error}
  })
  this.service.getOfferedRides(localStorage.getItem('userId')!).subscribe({
    next : (data)=>{this.offeredRides=data},
    error : (err)=> { this.errorMessage=err.error}
})
  }

  ngOnInit(): void {
  }

}
