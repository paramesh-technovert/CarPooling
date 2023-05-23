import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './loginpage/Components/sign-in/sign-in.component';
import { SignUpComponent } from './loginpage/Components/sign-up/sign-up.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashBoardComponent } from './homepage/components/dash-board/dash-board.component';
import { OfferRideComponent } from './homepage/components/offer-ride/offer-ride.component';
import { BookrideComponent } from './homepage/components/bookride/bookride.component';
import { MyridesComponent } from './homepage/components/myrides/myrides.component';
import { MyProfileComponent } from './homepage/components/my-profile/my-profile.component';
const routes: Routes = [
  {
    path: '', component: LoginpageComponent, children: [{ path: "SignIn", component: SignInComponent },
    { path: "SignUp", component: SignUpComponent }, { path: '', redirectTo: 'SignIn', pathMatch: 'full' }]
  },
  { path: "homepage", component: HomepageComponent, children: [{ path: "dashboard", component: DashBoardComponent }, { path: "offerRide", component: OfferRideComponent }, { path: "bookRide", component: BookrideComponent }, { path: "myRides", component: MyridesComponent }, { path: "myProfile", component: MyProfileComponent }, { path: '', redirectTo: 'dashboard', pathMatch: 'full' }] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
