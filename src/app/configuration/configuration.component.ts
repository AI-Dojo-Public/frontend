import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent implements OnInit {
  activePage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes('scenarios')) {
        this.activePage = 'scenarios';
      } else if (url.includes('agents')) {
        this.activePage = 'agents';
      } else if (url.includes('general')) {
        this.activePage = 'general';
      }
    });
  }

  navigateTo(page: string): void {
    this.router.navigate([`configuration/${page}`]);
  }
}
