import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SvgComponent } from '../../svg/svg.component';

@Component({
  selector: 'app-layout-1',
  standalone: true,
  imports: [RouterModule, HeaderComponent, NavbarComponent, SvgComponent],
  templateUrl: './layout-1.component.html',
  styleUrl: './layout-1.component.scss'
})
export class Layout1Component {

}
