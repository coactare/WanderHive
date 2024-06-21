import { Component, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  
})

export class SideBarComponent {

}
