import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-image',
  standalone: true,
  imports: [
    MatDialogContent
  ],
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.scss'
})
export class DialogImageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}

}
