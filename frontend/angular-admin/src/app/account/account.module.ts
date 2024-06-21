// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { AccountRoutingModule } from './account-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// @NgModule({
//   declarations: [
//     LoginComponent,
//     RegisterComponent
//   ],
//   imports: [
//     AccountRoutingModule,
//     BrowserAnimationsModule
//   ]
// })
// export class AccountModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountModule {}
