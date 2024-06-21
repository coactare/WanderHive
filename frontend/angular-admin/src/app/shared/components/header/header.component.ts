import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AcntService } from '../../../account/acnt.service';

@Component({
  selector: 'mc-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  imports: [RouterLink, CommonModule],
})
export class HeaderComponent {


  constructor(private acntService: AcntService) { }

  public isUserAuthenticated: boolean = false;

  public logout = () => {
    this.acntService.signout();
  }
}
