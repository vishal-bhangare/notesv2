import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {
    path:'dashboard',
    // canActivate:[AuthGuard],
    component:HomepageComponent
  },
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
