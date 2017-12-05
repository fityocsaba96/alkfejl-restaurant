import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private pageTitle: string;

  constructor() {}

  onActivate(component): void {
    this.pageTitle = component.pageTitle;
  }
}
