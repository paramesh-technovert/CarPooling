import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private router:Router) { 
    if(localStorage.getItem('userId')!=null || localStorage.getItem('userId')!=undefined){
      this.router.navigate(['homepage']);
    }
  }

  ngOnInit(): void {
  }

}
