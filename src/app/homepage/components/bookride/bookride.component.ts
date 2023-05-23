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
  display: boolean = false;
  bookRide: FormGroup;
  confirm: boolean = false;
  bookingDetails!: MatchedRidesResponse;
  request!: MatchedRidesRequest;
  bookRideRequest!: BookRideRequestDTO;
  data: MatchedRidesResponse[] = [];
  mintime!: string;
  min!: string;
  errorMessage: any;
  constructor(private service: BookRideService, private router: Router) {
    this.min = (new Date()).toISOString().split('T')[0];
    this.mintime = new Date().getHours + ":" + new Date().getMinutes();
    console.log(this.mintime);
    this.bookRide = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      seats: new FormControl('', [Validators.required])
    })
  }
  onSubmit() {
    const values = this.bookRide.value;
    values.date = new Date(values.date + "T" + values.time);
    this.request = new MatchedRidesRequest(localStorage.getItem('userId')!, values.from, values.to, values.date.toISOString(), values.seats);
    this.service.getMatchedRides(this.request).subscribe({
      next: (user) => { this.data = user; this.display = true; },
      error: (err) => { this.errorMessage = err.error }
    });
  }
  validateTime() {
    if (this.bookRide.value.date != "" && this.bookRide.value.time != "") {
      const values = this.bookRide.value.date + "T" + this.bookRide.value.time;
      if (new Date(values) < new Date()) {
        this.bookRide.setErrors({ InvalidTime: true });
      }
      else {
        this.bookRide.setErrors(null);
      }
    }
  }
  redirect() {
    this.router.navigate(['../../homepage/offerRide']);
  }
  bookaRide(ride: MatchedRidesResponse) {
    this.confirm = true;
    this.bookingDetails = ride;
  }
  book() {
    this.bookRideRequest = new BookRideRequestDTO(localStorage.getItem('userId')!, this.bookingDetails.rideId, this.bookingDetails.dateTime, this.bookingDetails.boardingStopId, this.bookingDetails.destinationStopId, this.bookingDetails.availableSeats, this.request.SeatsRequired);
    this.confirm = false;
    this.service.bookRide(this.bookRideRequest).subscribe({
      next: (user) => { console.log(user); alert("Successfully Booked a Ride"); this.router.navigate(['../../homepage']) },
      error: (err) => { this.errorMessage = err.error }
    })
  }
  ngOnInit(): void {
  }

}
