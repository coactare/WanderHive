import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AcntService } from '../../../account/acnt.service';

@Component({
  selector: 'app-view-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './view-dashboard.component.html',
  styleUrl: './view-dashboard.component.css'

})
export class ViewDashboardComponent {
  data = [
    { "name": "Football", "value": 12},
    { "name": "Shoes", "value": 20},
    { "name": "Basketball", "value": 100},
    { "name": "Cricket Ball", "value": 50},
    { "name": "Jackets", "value": 30},
    // { "name": "Italy", "value": 35800, "extra": { "code": "it" } }
  ];


  single = this.data.slice(); // Initialize single with a copy of data
  //view: [number, number] = [700, 400];
  view: [number, number] = [800, 300];

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Sales';
  showLabels: boolean = true;
  yAxisLabel = 'Products';
  scheme: string[] = [];


  showLegend: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  constructor(private acntService: AcntService) { }

  ngOnInit(): void {
    
    this.acntService.currentUser$.subscribe({
      next:(res) =>{
        
        this.isUserAuthenticated = res;
        console.log(this.isUserAuthenticated);
      },error:(err) =>{
        console.log(`An error occurred while setting isUserAuthenticated flag.`)
      }
    })
  }
  public isUserAuthenticated: boolean = false;

  onSelect(event: any): void {
    console.log('Item clicked', event);
  }

  onActivate(event: any): void {
    console.log('Activate', event);
  }

  onDeactivate(event: any): void {
    console.log('Deactivate', event);
  }
}

