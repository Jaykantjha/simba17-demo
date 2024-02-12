import { Location, NgFor, NgIf } from '@angular/common';
import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../utility-service.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [NgFor, NgIf],
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() title: string = '';
  @Input() maxActive = 0;

  constructor(
    private location: Location,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  goBack() {
    const notAllowedUrl = ['getstarted', 'dashboard'];
    if(this.router.url.split('/').some((val) => notAllowedUrl.includes(val))) {
      this.utilityService.handleBackEvent();
      return;
    }
    this.location.back();
  }
}
