import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignInComponent } from './loginpage/Components/sign-in/sign-in.component';
import { SignUpComponent } from './loginpage/Components/sign-up/sign-up.component';
import { DashBoardComponent } from './homepage/components/dash-board/dash-board.component';
import { OfferRideComponent } from './homepage/components/offer-ride/offer-ride.component';
import { BookrideComponent } from './homepage/components/bookride/bookride.component';
import { MyridesComponent } from './homepage/components/myrides/myrides.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyProfileComponent } from './homepage/components/my-profile/my-profile.component';
import { JwtInterceptor } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashBoardComponent,
    OfferRideComponent,
    BookrideComponent,
    MyridesComponent,
    LoginpageComponent,
    HomepageComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
