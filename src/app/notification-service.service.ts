import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private notification: MatSnackBar) { }

  displayNotification(message: string) {
    this.notification.open(message, ' ', {duration: 5000});
  }
}
