import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Toast from 'bootstrap/js/dist/toast';

@Component({
  selector: 'mytomorrows-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnInit {
  @ViewChild('toastElement', { static: true }) toastEl!: ElementRef;
  @Input({ required: true }) status = '';
  @Input({ required: true }) message = '';

  ngOnInit(): void {
    const toast = new Toast(this.toastEl.nativeElement, { delay: 3000 });
    toast.show();
  }
}
