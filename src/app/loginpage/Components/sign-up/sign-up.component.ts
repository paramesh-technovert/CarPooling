import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, AbstractControl} from '@angular/forms'
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/modals/LoginRequest';
import { LoginService } from 'src/app/services/login.service';
import { matchPassword } from 'src/app/validators/passwordvalidator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  submitted:boolean=false;
  signupForm:FormGroup;
  errorMessage!:String;
  data!:any;
  constructor(private service:LoginService,private router:Router) { 
    this.signupForm=new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      confirmPassword:new FormControl('',[Validators.required])
    },
    [
      matchPassword('password','confirmPassword')
    ])
 
  }

  ngOnInit(): void {
     }
 
  onSubmit(){
    this.submitted=true;
    const values=this.signupForm.value;
    var signup:LoginRequest=new LoginRequest(values.email,values.password);
     this.service.addUser(signup).subscribe({next : (user)=>{ this.data=user;if(this.data!=null){alert("User Registered Successfully. Please Login");this.router.navigate(['SignIn']);}},
     error : (err)=> { this.errorMessage=err.error}});
  }
  
}
