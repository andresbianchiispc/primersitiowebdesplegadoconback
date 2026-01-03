import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contacto } from './contacto/contacto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Contacto],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
