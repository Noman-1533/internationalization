import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'internationalization';
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    let currentRoute = this.route.snapshot;
    // console.log('form',currentRoute);
  }
}
