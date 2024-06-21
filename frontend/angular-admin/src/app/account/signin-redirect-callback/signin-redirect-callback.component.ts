import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcntService } from '../acnt.service';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`,
  standalone: true
})
export class SigninRedirectCallbackComponent implements OnInit {
  returnUrl: string = "/dashboard";
  constructor(private _router: Router, private acntService: AcntService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.acntService.finishLogin()
    .then(_ => {
      console.log('inside finish login');

      this._router.navigate(['/dashboard'], { replaceUrl: true });
    })
  }
}
