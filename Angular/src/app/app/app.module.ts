import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthguardGuard } from '../guards/authguard.guard';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { UserEditComponent } from '../components/user-edit/user-edit.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { AllUsersComponent } from '../components/all-users/all-users.component';
import { ShowPasswordComponent } from '../components/show-password/show-password.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { ShowPasswordGuard } from '../guards/show-password.guard';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';
import { ViewUserComponent } from '../components/view-user/view-user.component';


const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }, {
    path: 'login',
    component: LoginFormComponent
  }, {
    path: 'register',
    component: RegisterFormComponent
  }, {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    children: [{
      path: 'show-password',
      canActivate: [ShowPasswordGuard],
      component: ShowPasswordComponent
    }]
  }, {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent,
    children: [{
      path: 'user-edit',
      component: UserEditComponent
    }, {
      path: 'all-users',
      component: AllUsersComponent
    }, {
      path: 'user-profile',
      component: UserProfileComponent
    }, {
      path: ':email',
      component: ViewUserComponent
    }]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    DashboardComponent,
    RegisterFormComponent,
    UserEditComponent,
    ForgotPasswordComponent,
    AllUsersComponent,
    ShowPasswordComponent,
    UserProfileComponent,
    FilterPipePipe,
    ViewUserComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule
  ],
  providers: [UserService, AuthguardGuard, ShowPasswordGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
