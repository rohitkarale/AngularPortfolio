import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public router: Router) {

  }

  onHome() {
    this.router.navigate(['/portfolio-website/home']);
  }

  onAbout() {
    this.router.navigate(['/portfolio-website/about']);
  }

  onSkills() {
    this.router.navigate(['/portfolio-website/skills']);
  }

  onProject() {
    this.router.navigate(['/portfolio-website/projects']);
  }

  onContact() {
    this.router.navigate(['/portfolio-website/contact']);
  }
}
