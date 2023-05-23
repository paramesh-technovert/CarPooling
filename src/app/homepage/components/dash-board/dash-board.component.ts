import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/modals/UserDetails';
import { LoginService } from 'src/app/services/login.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  userName: string = "";
  constructor(private service: UserdetailsService) {
    if (localStorage.getItem("userDetails") == undefined) {
      this.service.getUserDetails(localStorage.getItem('userId')!).subscribe({
        next: (data) => { this.userName = data.firstName },
        error: (err) => { console.log(err) }
      }
      )
    }
    else {
      this.userName = JSON.parse(localStorage.getItem('userDetails')!).firstName;
    }
  }

  ngOnInit(): void {
  }

}
