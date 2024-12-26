import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App2HomeComponent } from '../app2-home/app2-home.component';

@Component({
  imports: [CommonModule,App2HomeComponent],
  selector: 'app-shellapp2-entry',
  template: `<app-app2-home></app-app2-home>`,
})
export class RemoteEntryComponent {}
