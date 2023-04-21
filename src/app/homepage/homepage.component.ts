import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../modals/UserDetails';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
id:string;
toggle:boolean=false;
userDetails:UserDetails=new UserDetails();
  errorMessage!: string;
  constructor(private router:Router,private service:LoginService) {
    this.id=localStorage.getItem("userId")!;
    if(this.id==null|| this.id==undefined){
      this.router.navigate(['']);
    }
    if(localStorage.getItem("userDetails")!=undefined){
      this.userDetails=JSON.parse(localStorage.getItem("userDetails")!);
    }
    else{
      this.service.getUserDetails(this.id).subscribe({
        next:(data)=>{this.userDetails=data;localStorage.setItem("userDetails",JSON.stringify(this.userDetails))},
        error : (err)=> { this.errorMessage=err.error}
      }
      )
    }
   }
   myRides(){
    this.toggle=false;
    this.router.navigate(['../../homepage/myRides']);
    
   }
   logout(){
    this.toggle=false;
    localStorage.removeItem("userId");
    localStorage.removeItem("userDetails");
    this.router.navigate(['']);
   }
   myProfile(){
    this.toggle=false;
    this.router.navigate(['../../homepage/myProfile']);
   }
   redirect(){
    this.router.navigate(['../../homepage'])
   }
  ngOnInit(): void {
  }

}
