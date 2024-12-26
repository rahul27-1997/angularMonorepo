import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App1HomeComponent } from '../app1-home/app1-home.component';


@Component({
  imports: [CommonModule,App1HomeComponent],
  selector: 'app-shellapp-entry',
  template: `<app-app1-home></app-app1-home>`,
})
export class RemoteEntryComponent {}
