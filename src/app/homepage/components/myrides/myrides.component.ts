import { Component, OnInit } from '@angular/core';
import { BookRideService } from '../../../services/book-ride.service';
import { BookedRides } from '../../../modals/BookedRides';
import { OfferedRides } from 'src/app/modals/OfferedRides';
import { OfferRideService } from 'src/app/services/offer-ride.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myrides',
  templateUrl: './myrides.component.html',
  styleUrls: ['./myrides.component.css']
})
export class MyridesComponent implements OnInit {
  bookedRides: BookedRides[] = [];
  offeredRides: OfferedRides[] = [];
  errorMessage!: string;

  constructor(private service: BookRideService, private offerRideService: OfferRideService, private router: Router) {
    this.service.getBookedRides(localStorage.getItem('userId')!).subscribe({
      next: (data) => { this.bookedRides = data },
      error: (err) => { this.errorMessage = err.error }
    })
    this.offerRideService.getOfferedRides(localStorage.getItem('userId')!).subscribe({
      next: (data) => { this.offeredRides = data },
      error: (err) => { this.errorMessage = err.error }
    })
  }
  ngOnInit(): void {
  }

}
