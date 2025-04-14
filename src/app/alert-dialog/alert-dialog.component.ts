import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import {MatIcon} from "@angular/material/icon";
import {LowerCasePipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatIcon,
    MatDialogActions,
    LowerCasePipe,
    MatButton,
    MatDialogClose,
    NgIf
  ],
  templateUrl: './alert-dialog.component.html'
})
export class AlertDialog {
  message: string = 'An unspecified error has occurred';
  icon: string = '';
  buttonText = 'Ok';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      message: string;
      icon: string;
      buttonText: string;
    },
    private dialogRef: MatDialogRef<AlertDialog>
  ) {
    if (data?.icon) this.icon = data.icon;
    if (data?.message) this.message = data.message;
    if (data?.buttonText) this.buttonText = data.buttonText;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
