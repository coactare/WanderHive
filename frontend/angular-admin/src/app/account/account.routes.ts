import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SigninRedirectCallbackComponent } from "./signin-redirect-callback/signin-redirect-callback.component";

export const loginRoutes: Route[] = [
  { path: '', component: LoginComponent },
]

export const registerRoutes: Route[] = [
  { path: '', component: RegisterComponent }
]

export const signInCallbackRoutes: Route[] = [
  { path: '', component: SigninRedirectCallbackComponent }
]

export const signOutCallbackRoutes: Route[] = [
  { path: '', component: SigninRedirectCallbackComponent }
]