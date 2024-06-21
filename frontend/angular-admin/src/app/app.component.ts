import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayoutComponent } from './shared/components/appLayout/app-layout.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './account/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [RouterOutlet, AppLayoutComponent, LoginComponent],
})

export class AppComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {}
  
}
