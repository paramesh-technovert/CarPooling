import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  next: boolean = false;
  stopNumber: number;
  OfferRide: FormGroup;
  rideDetails: FormGroup;
  stopDetails: FormGroup;
  pickupStop: FormGroup;
  stops: stopsDTO[] = [];
  previousDate!: string;
  min!: string;
  previousStop: string = "";
  constructor(private router: Router, private service: OfferRideService) {
    this.stopNumber = 1;
    this.min = (new Date()).toISOString().split('T')[0];
    this.pickupStop = new FormGroup({
      stopName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), this.StopNameCheck()]),
      pickupDate: new FormControl('', [Validators.required]),
      pickupTime: new FormControl('', [Validators.required])
    }, { validators: this.StopDateCheck });
    this.rideDetails = new FormGroup({
      from: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z ]*$'), this.StopNameCheck()]),
      to: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z ]*$'), this.StopNameCheck()]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required])
    }, { validators: this.dateTimeValidator });
    this.stopDetails = new FormGroup({
      seats: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    })
    this.OfferRide = new FormGroup({
      rideInfo: this.rideDetails,
      stopsInfo: this.stopDetails
    })
  }

  ngOnInit(): void {
  }
  dateTimeValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const date = group.get('date');
    const time = group.get('time');
    if (date && time && date.value && time.value) {
      const values = date.value + "T" + time.value;
      if (new Date(values) <= new Date()) {
        this.previousDate = values;
        return { InvalidTime: true };
      }
    }
    return null;
  }
  addCard() {
    var values = this.rideDetails.value;
    this.previousDate = values.date + "T" + values.time;
    this.previousStop = values.from.trim().toLowerCase();
    const pushStop = new stopsDTO(values.from, new Date(this.previousDate));
    this.stops.push(pushStop);
    this.next = true;
    Object.keys(this.rideDetails.controls).forEach(key => {
      this.rideDetails.get(key)!.disable();
    })
  }
  submit() {
    const values = this.pickupStop.value;
    if (values.stopName != '' && values.pickupDate != '') {
      if (this.pickupStop.valid) {
        this.stops.push(new stopsDTO(values.stopName, new Date(values.pickupDate + "T" + values.pickupTime)));
        this.previousStop = values.stopName;
      }
    }
    const finalStop = new stopsDTO(this.rideDetails.value.to.trim().toLowerCase(), new Date(this.previousDate));
    if (finalStop.stopName != this.previousStop)
      this.stops.push(finalStop);
    const ridevalues = this.rideDetails.value;
    const stopvalues = this.stopDetails.value;
    const offerRide = new OfferRideRequest(localStorage.getItem('userId')!.toString(), ridevalues.from, ridevalues.to, ridevalues.date, stopvalues.price, stopvalues.seats, this.stops)
    var res = this.service.offerRide(offerRide).subscribe({
      next: (data) => { alert("Successfully offered a ride"); this.router.navigate(['homepage']) },
      error: (err) => { alert("Something went wrong please try again later"); this.router.navigate(['homepage']); console.log(err) }

    });

  }
  addStop() {
    const values = this.pickupStop.value;
    values.pickupDate = values.pickupDate + "T" + values.pickupTime;
    const val = new stopsDTO(values.stopName, new Date(values.pickupDate));
    this.stops.push(val);
    this.stopNumber += 1;
    this.previousStop = values.stopName.toLowerCase();
    this.previousDate = values.pickupDate;
    this.pickupStop.reset({ pickupDate: '', pickupTime: '', stopName: '' });
    console.log(this.stops);
  }
  redirect() {
    this.router.navigate(['../../homepage/bookRide']);
  }
  StopDateCheck: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const date = control.get('pickupDate');
    const time = control.get('pickupTime');
    if (date?.value && time?.value) {
      const values = date.value + "T" + time.value;
      if (new Date(values) <= new Date(this.previousDate)) {
        return { InvalidpickupTime: true };
      }
    }
    return null;
  }

  StopNameCheck() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (((control.value).trim()).toLowerCase() === (this.previousStop.trim()).toLowerCase()) {
        return { InvalidStopName: true };
      }
      if ((control.value.trim()) == 0) {
        return { whiteSpace: true }
      }
      return null;
    }
  }
}
