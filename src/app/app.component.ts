import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JunctionComponent } from './components/junction/junction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JunctionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'home-assignment';
}
