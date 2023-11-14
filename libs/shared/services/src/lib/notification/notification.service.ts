import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Notification {
  message: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications$ = new BehaviorSubject<Notification[]>([]);

  showNotification(status: string, message: string) {
    const previousValue = this.notifications$.value;
    this.notifications$.next([...previousValue, { status, message }]);
  }
}
