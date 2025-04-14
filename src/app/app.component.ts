import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {LoadingIndicatorComponent} from "./loading-indicator/loading-indicator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatIconModule, CommonModule, LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AI-Dojo';
}
