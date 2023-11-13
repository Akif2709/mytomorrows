import { Injectable } from '@angular/core';
import Toast from 'bootstrap/js/dist/toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showNotification(status: string, content: string) {
    const div = document.createElement('div');
    div.innerHTML = this.getInnerHtml(status, content);
    document.body.appendChild(div);
    const notification = new Toast(div, {
      animation: true,
      delay: 2000,
    });
    notification.show();
  }

  private getInnerHtml(status: string, content: string) {
    return `
    <div
      class="toast align-items-center show text-white border-0 top-0 end-0 position-absolute bg-${status}"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      id="mytomorrow-notification"
    >
      <div class="d-flex">
        <div class="toast-body">
          ${content}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    `;
  }
}
