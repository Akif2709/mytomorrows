import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { NavbarComponent } from '@mytomorrows/core';
import { NotificationService } from '@mytomorrows/shared-services';
import { ToastComponent } from '@mytomorrows/shared-ui';
import { slideInAnimation } from '@mytomorrows/shared-utils';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, ToastComponent],
  selector: 'mytomorrows-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation],
})
export class AppComponent {
  readonly notifications$ = this.notificationService.notifications$;

  constructor(
    private contexts: ChildrenOutletContexts,
    private notificationService: NotificationService
  ) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
