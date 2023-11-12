import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { slideInAnimation } from './utils/animations';


@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'mytomorrows-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
