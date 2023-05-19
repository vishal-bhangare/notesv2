import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { VerificationComponent } from './components/verification/verification.component';
import { verificationGuard } from './guards/verification.guard';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'reset-password/:token', component: ResetPasswordComponent},
  { path: 'signup', component: SignupComponent },
  {
    path: 'signup/verification/:id',
    canActivate:[verificationGuard],
    component: VerificationComponent,
  },
  { path:'verify-user/:token', component:VerifyComponent},
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
