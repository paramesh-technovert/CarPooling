import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/modals/UserDetails';
import { UserDetailsRequest } from 'src/app/modals/UserDetailsRequest';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { NameValidator } from 'src/app/validators/NameValidator';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  myProfile: FormGroup;
  userDetails: any;
  uploadDetails: boolean = false;
  imageUpload!: string;
  constructor(private serivce: UserdetailsService) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')!);
    this.imageUpload = this.userDetails.imageUrl;
    this.myProfile = new FormGroup({
      firstName: new FormControl(this.userDetails.firstName, [Validators.required, NameValidator(), Validators.pattern('[A-Za-z ]*'), Validators.maxLength(25)]),
      lastName: new FormControl(this.userDetails.lastName, [Validators.required, NameValidator()]),
      phoneNumber: new FormControl(this.userDetails.phoneNumber, [Validators.required, Validators.pattern('[0-9]{10}')])
    })
    Object.keys(this.myProfile.controls).forEach(key => {
      this.myProfile.get(key)!.disable();
    })
  }
  editDetails() {
    this.uploadDetails = !this.uploadDetails;
    Object.keys(this.myProfile.controls).forEach(key => {
      this.myProfile.get(key)!.enable();
    })
  }
  reload() {
    window.location.reload();
  }
  submit() {
    var values = this.myProfile.value;
    var user = new UserDetailsRequest(localStorage.getItem('userId')!, values.firstName.trim(), values.lastName.trim(), values.phoneNumber, this.imageUpload.split(',')[1])
    this.serivce.updateDetails(user).subscribe({
      next: (data) => { this.userDetails = data; localStorage.setItem('userDetails', JSON.stringify(this.userDetails)); window.location.reload(); },
      error: (err) => { console.log(err) }
    })
  }
  previewFile($event: any) {
    var file = $event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      this.imageUpload = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  ngOnInit(): void {
  }

}
