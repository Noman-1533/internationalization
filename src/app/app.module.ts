import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaqComponent } from './faq/faq.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { HeaderBoxComponent } from './header-box/header-box.component';
import { CustomTranslateHttpLoader } from './custom-translate-http-loader';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SpinnerComponent } from './spinner/spinner.component';



export function HttpLoaderFactory(http: HttpClient,
  // translateService: CustomTranslateService

) {
  
  // new TranslateHttpLoader(http, 'https://api.github.com/repos/Noman-1533/i18n/')
  return new CustomTranslateHttpLoader(http, 'https://api.github.com/repos/Noman-1533/i18n/');
}


// AoT requires an exported function for factories
// for getting files with keys array 

// export function HttpLoaderFactory(http: HttpClient) {
  // let keys = [
  //   '/faq.json',
  //   '/headerBox.json'
  // ]
  // let data:any[]=[];
  // for (let key of keys) {
  //   let d = new TranslateHttpLoader(http, 'https://raw.githubusercontent.com/Riajul-Alam-BS23/i18n/main/', key);
  //   data.push(d);
  // }
  
  // console.log(data);
  // console.log(data);
  // // const data = new TranslateHttpLoader(http, 'https://raw.githubusercontent.com/Riajul-Alam-BS23/i18n/main/', '/faq.json');
  // // console.log( (data));
  // return data;

  
//   let data;
//    data= new CustomTranslateHttpLoader(http, 'https://raw.githubusercontent.com/Riajul-Alam-BS23/i18n/main/', [
//      '/headerBox.json',
//     '/faq.json'
//    ]);
//   console.log(data)
//   return data;
// }
@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    LanguageSelectorComponent,
    HeaderBoxComponent,
    HeaderComponent,
    ContactComponent,
    SpinnerComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
