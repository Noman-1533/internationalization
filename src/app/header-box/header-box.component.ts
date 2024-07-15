import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-box',
  templateUrl: './header-box.component.html',
  styleUrl: './header-box.component.css'
})
export class HeaderBoxComponent {
 date: Date = new Date();
  amount: number = 100;
  // translations: any = {};
  language: string = 'en'
  @ViewChild('header', { static: true }) header: ElementRef;
onChangeLanguage() {
    // const currentLang = this.header.nativeElement.innerText==='This is header of upper box'?'bn':'en';
    // if (currentLang === 'bn') {
    //   window.location.href = 'http://localhost:55273/';
    // } else {
    //   window.location.href = 'http://localhost:4200/';
    // }
    // this.translationService.loadTranslations(currentLang);
  }
}
