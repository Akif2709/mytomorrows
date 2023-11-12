import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { NavbarComponent } from '@mytomorrows/core';
import { slideInAnimation } from '@mytomorrows/shared-utils';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'mytomorrows-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
