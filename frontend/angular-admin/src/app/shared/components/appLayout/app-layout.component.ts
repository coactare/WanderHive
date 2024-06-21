import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../sideBar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { AcntService } from '../../../account/acnt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-app-layout',
  standalone: true,
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, CommonModule],
})
export class AppLayoutComponent {
  ngOnInit(): void {

    console.log(`current user:`);
    this.acntService.currentUser$.subscribe({
      next:(res) =>{
        this.isUserAuthenticated = res;
        console.log(this.isUserAuthenticated);
      },error:(err) =>{
        console.log(`An error occurred while setting isUserAuthenticated flag.`)
      }
    })
  }
  constructor(private acntService: AcntService) { }

  public isUserAuthenticated: boolean = false;
}
