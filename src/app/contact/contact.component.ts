import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  name: string = '';
  email: string = '';
  message: string = '';
  constructor(public translate:TranslateService){}
  ngOnInit(): void {
    // console.log(this.translate.currentLang);
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Message:', this.message);
    // Optionally, you can reset the form after submission
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
