import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomepageComponent } from 'src/app/homepage/homepage.component';
import { LoginRequest } from 'src/app/modals/LoginRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  submitted: boolean = false;
  errorMessage!: string;
  data: any;
  constructor(private service: LoginService, private router: Router) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)])
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.errorMessage = "";
    const values = this.signInForm.value;
    var signup: LoginRequest = new LoginRequest(values.email, values.password);
    this.service.loginUser(signup).subscribe({
      next: (user) => { this.data = user; if (this.data != null) { localStorage.setItem("userId", this.data.userId); localStorage.setItem("JWT", this.data.jwt); this.router.navigate(['homepage']); } },
      error: (err) => { this.errorMessage = err.error }
    });
  }
}
