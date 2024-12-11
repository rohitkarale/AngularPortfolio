import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(public router: Router) {

  }

  onContact() {
    this.router.navigate(['/portfolio-website/contact']);
  }

}
