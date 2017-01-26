import { Injectable} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';
@Injectable()
export class NotificationService {
time = 300 ;
  constructor(
    private _mdsnackbar:  MdSnackBar,
    private _MdSnackBarConfig: MdSnackBarConfig
  ) { }

 failedAttempt(text: string) {
    let config = new MdSnackBarConfig();
    config.duration = 3000;
    this._mdsnackbar.open(text, "X", config);
 }
}
