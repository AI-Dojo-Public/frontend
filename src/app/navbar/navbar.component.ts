import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private destroy$ = new Subject<void>();
  constructor(private router: Router) {}

  isChoosingService = false;
  highlightKibana = false;
  highlightCryton = false;
  highlightAgents = false;
  

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isChoosingService = true;
  }

  closeDropdown() {
    this.isChoosingService = false;
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$) 
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.highlightKibana = event.url === '/kibana';
        this.highlightCryton = event.url === '/cryton';
        this.highlightAgents = event.url === '/textual-agents';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

}
