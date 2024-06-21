import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { BackendErrorsInterface } from '../../types/backendErrors.interface'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {

      if (name === 'error') {
        if (Array.isArray(this.backendErrors[name])) {
          const messages = this.backendErrors[name].join(' ');
          return `${messages}`;
        } else {
          const messages = this.backendErrors[name];
          return `${messages}`;
        }
      }
      return undefined;

    }).filter(Boolean) as string[];

  }
}
