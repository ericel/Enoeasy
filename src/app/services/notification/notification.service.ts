import { Injectable} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Injectable()
export class NotificationService {
time = 300 ;
  constructor(
    
    private toastr: ToastsManager
  ) {

   }

 failedAttempt(text: string) {
  this.toastr.warning(text, 'Alert!');
  }

  successAttempt(text: string) {
    this.toastr.success(text, 'Alert!');
  }

  errorAttempt(text: string) {
    this.toastr.error(text, 'Alert!');
  }
}
