import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../modals/UserDetails';
import { LoginService } from '../services/login.service';
import { UserdetailsService } from '../services/userdetails.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  id: string;
  toggle: boolean = false;
  // clicked:boolean=false;
  userDetails: UserDetails = new UserDetails();
  errorMessage!: string;
  constructor(private router: Router, private service: LoginService, private userService: UserdetailsService) {
    this.id = localStorage.getItem("userId")!;
    if (this.id == null || this.id == undefined) {
      this.router.navigate(['']);
    }
    if (localStorage.getItem("userDetails") != undefined) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetails")!);
    }
    else {
      this.userService.getUserDetails(this.id).subscribe({
        next: (data) => { this.userDetails = data; localStorage.setItem("userDetails", JSON.stringify(this.userDetails)) },
        error: (err) => { this.errorMessage = err.error }
      }
      )
    }
  }
  //  @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   if(this.toggle==true){
  //     this.toggle=false;
  //   }
  // }
  myRides() {
    this.toggle = false;
    this.router.navigate(['../../homepage/myRides']);

  }
  logout() {
    this.toggle = false;
    localStorage.removeItem("userId");
    localStorage.removeItem("userDetails");
    this.router.navigate(['']);
  }
  myProfile() {
    this.toggle = false;
    this.router.navigate(['../../homepage/myProfile']);
  }
  redirect() {
    this.router.navigate(['../../homepage'])
  }
  ngOnInit(): void {
  }

}
